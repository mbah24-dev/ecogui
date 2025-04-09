import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AddressService } from 'src/address/address.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TransactionService } from 'src/transaction/transaction.service';
import * as fs from 'fs';
import * as path from 'path';
import * as Handlebars from 'handlebars';
import * as puppeteer from 'puppeteer';
import { InvoiceStatus, Role } from '@prisma/client';

@Injectable()
export class InvoiceService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly addressService: AddressService
	) {}

	async get_order_data(orderId: string) {
		const order = await this.prismaService.order.findUnique({
			where: { id: orderId },
			include: { buyer: { include: { addresses: true } }, items: true }
		});

		if (!order) throw new HttpException('Aucune commande trouvée', HttpStatus.BAD_REQUEST);

		const productIds = order.items.map(item => item.productId);
		const products = await this.prismaService.product.findMany({
			where: { id: { in: productIds } },
		});

		const buyer_address = await this.addressService.get_current_user_address(order.buyerId);
		const buyer = 	await this.prismaService.user.findUnique({
			where: { id: order.buyerId }
		})
		if (!buyer) throw new HttpException('Aucun Acheteur trouvée', HttpStatus.BAD_REQUEST);

		const sellers = new Set(order.items.map(item => item.sellerId).filter(Boolean));
		const tvaCost = ((order.totalPrice * Number(process.env.TVA)) / (100));

		const orderDetails = {
			name: buyer.name,
			email: buyer.email,
			tel: buyer.phoneNumber,
			orderId: order.id.slice(0, 6),
			orderDate: new Date(order.createdAt).toISOString().split('T')[0], // Format YYYY-MM-DD
			products: order.items.map((item) => {
				const product = products.find(product => product.id === item.productId);
				if (!product) return {};
				return {
					name: product.name || "Produit inconnu",
					quantity: item.quantity,
					price: product.price || 0,
					sellerId: product.sellerId,
					total: item.quantity * product.price,
				};
			}),
			address: {
				city: buyer_address.city,
				commune: buyer_address.commune,
				country: buyer_address.country,
				description: buyer_address.description
			},
			tax: tvaCost,
			totalToPaid: tvaCost + order.totalPrice,
			totalPrice: order.totalPrice
		};

		return ({ orderDetails, sellers });
	}

	async get_seller_order_data(orderDetails: any, sellers: Set<string>) {
		const sellerIds = Array.from(sellers);
		const sellerDataList = await this.prismaService.user.findMany({
			where: { id: { in: sellerIds } },
			include: { addresses: true }
		});

		const sellerDataArray = sellerDataList.map(seller => {
			const sellerProducts = orderDetails.products.filter(product => product.sellerId === seller.id);

			const sellerTotal = sellerProducts.reduce(
				(sum, product) => sum + (product.price * product.quantity),
				0
			);

			const serviceFee = ((sellerTotal * Number(process.env.FEES)) / (100));

			return {
				id: seller.id,
				name: seller.name,
				email: seller.email,
				tel: seller.phoneNumber,
				orderId: orderDetails.orderId.slice(0, 6),     
				orderDate: orderDetails.orderDate,
				sellerProducts,
				serviceFee,
				totalSales: sellerTotal,
				netAmount: (sellerTotal - serviceFee),
				seller_address: seller.addresses[0] || null
			};
		});

		return (sellerDataArray);
	}

	async generateInvoice(orderId: string) {
		const existingInvoices = await this.prismaService.invoice.findMany({
			where: { orderId }
		});
	
		if (existingInvoices.length > 0) {
			throw new HttpException('Une facture pour cette commande existe déjà', HttpStatus.CONFLICT);
		}

        const { orderDetails, sellers } = await this.get_order_data(orderId);

        await this.createPdf('buyer-invoice', orderDetails, `buyer_${orderId}.pdf`);

		await this.prismaService.invoice.create({
			data: {
				pdfUrl: `buyer_${orderId}.pdf`,
				totalAmount: orderDetails.totalToPaid,
				orderId
			}
		});

        const sellerData = await this.get_seller_order_data(orderDetails, sellers);
        for (const seller of sellerData) {
            await this.createPdf('seller-invoice', seller, `seller_${seller.orderId}_${seller.id}_${seller.name}.pdf`);
			await this.prismaService.invoice.create({
				data: {
					pdfUrl: `seller_${seller.orderId}_${seller.id}_${seller.name}.pdf`,
					totalAmount: seller.netAmount,
					orderId
				}
			});
        }

        return { message: 'Factures générées avec succès' };
    }

    async createPdf(templateName: string, data: any, outputFileName: string) {
        const templatePath = path.join(__dirname, `../../../src/templates/${templateName}.html`);
        const outputPath = path.join(__dirname, `../../../src/invoice_archive/${outputFileName}`);

        const templateHtml = fs.readFileSync(templatePath, 'utf8');

        const template = Handlebars.compile(templateHtml);
        const htmlContent = template(data);

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

        await page.pdf({
            path: outputPath,
            format: 'A4',
            printBackground: true
        });

        await browser.close();
    }

	async get_user_invoices(userId: string) {
		const user = await this.prismaService.user.findUnique({
			where: { id: userId }
		});
	
		if (!user) throw new HttpException('Aucun utilisateur trouvé', HttpStatus.NOT_FOUND);
	
		if (user.role === Role.BUYER) {
			const orders = await this.prismaService.order.findMany({
				where: { buyerId: userId },
				include: { invoices: true }
			});
	
			if (!orders || orders.length === 0)
				throw new HttpException('Aucune commande trouvée', HttpStatus.NOT_FOUND);

			return (orders.flatMap(order => order.invoices.filter(inv => inv.pdfUrl?.startsWith(`buyer_`))));
		}
	
		if (user.role === Role.SELLER) {
			// Récupérer uniquement les factures du seller en se basant sur l'ID du vendeur dans le `pdfUrl`
			const invoices = await this.prismaService.invoice.findMany({
				where: {
					pdfUrl: { contains: `_${userId}_` },
				}
			});
	
			if (!invoices || invoices.length === 0)
				throw new HttpException('Aucune facture trouvée pour ce vendeur', HttpStatus.NOT_FOUND);
	
			return (invoices);
		}
	
		throw new HttpException('Rôle non valide', HttpStatus.BAD_REQUEST);
	}
	
	async get_all_invoices() {
		const invoices = await this.prismaService.invoice.findMany({
			include: {
				order: {
					include: { buyer: true }
				}
			}
		});
	
		if (!invoices.length) throw new HttpException('Aucune facture trouvée', HttpStatus.NOT_FOUND);
	
		return invoices.map(invoice => ({
			id: invoice.id,
			totalAmount: invoice.totalAmount,
			pdfUrl: invoice.pdfUrl,
			status: invoice.status,
			createdAt: invoice.createdAt,
			order: {
				id: invoice.order.id,
				buyerName: invoice.order.buyer.name,
				buyerEmail: invoice.order.buyer.email
			}
		}));
	}

	async get_invoice_by_id(invoiceId: string) {
		const invoice = await this.prismaService.invoice.findUnique({
			where: { id: invoiceId },
			include: { order: { include: { buyer: true } } }
		});
	
		if (!invoice) throw new HttpException('Aucune facture trouvée', HttpStatus.NOT_FOUND);
	
		return {
			id: invoice.id,
			totalAmount: invoice.totalAmount,
			pdfUrl: invoice.pdfUrl,
			status: invoice.status,
			createdAt: invoice.createdAt,
			order: {
				id: invoice.order.id,
				buyerName: invoice.order.buyer.name,
				buyerEmail: invoice.order.buyer.email
			}
		};
	}

	async get_invoice_by_order_user(orderId: string, userId: string) {
		const user = await this.prismaService.user.findUnique({
			where: { id: userId }
		});
	
		if (!user) throw new HttpException('Utilisateur introuvable', HttpStatus.NOT_FOUND);
	
		const order = await this.prismaService.order.findUnique({
			where: { id: orderId },
			include: { invoices: true }
		});
	
		if (!order) throw new HttpException('Commande introuvable', HttpStatus.NOT_FOUND);
	
		const invoice = order.invoices.find(inv => (inv.pdfUrl) ?
			user.role === Role.BUYER ? inv.pdfUrl.startsWith(`buyer_`) : inv.pdfUrl.includes(`_${userId}_`) : {}
		);
	
		if (!invoice) throw new HttpException('Aucune facture trouvée', HttpStatus.NOT_FOUND);
	
		return (invoice);
	}
	

	async markInvoiceAsPaid(invoiceId: string) {
		return this.prismaService.invoice.update({
			where: { id: invoiceId },
			data: { status: 'PAID' }
		});
	}
	
	async deleteInvoice(invoiceId: string) {
		return this.prismaService.invoice.delete({
			where: { id: invoiceId }
		});
	}

	async get_invoices_by_status(userId: string, statusFilter: InvoiceStatus) {
		const user = await this.prismaService.user.findUnique({
			where: { id: userId }
		});
	
		if (!user) throw new HttpException('Utilisateur introuvable', HttpStatus.NOT_FOUND);
	
		let invoices;
	
		if (user.role === Role.BUYER) {
			invoices = await this.prismaService.invoice.findMany({
				where: {
					order: { buyerId: userId },
					status: statusFilter
				}
			});
		} else if (user.role === Role.SELLER) {
			invoices = await this.prismaService.invoice.findMany({
				where: {
					pdfUrl: { contains: `_${userId}_` },
					status: statusFilter
				}
			});
		} else {
			throw new HttpException('Rôle non valide', HttpStatus.BAD_REQUEST);
		}
	
		if (!invoices.length) throw new HttpException('Aucune facture trouvée', HttpStatus.NOT_FOUND);
	
		return invoices;
	}

	/**  
	 * A corriger demain: un buyer arrive a download les facture d'un seul a partir de l'id de la facture, 
	 * il devrait pas avoir l'accèe
	*/
	async getInvoiceFilePath(userId: string, userRole: string, invoiceId: string) {
		const invoice = await this.prismaService.invoice.findUnique({
			where: { id: invoiceId },
			include: { order: { include: { buyer: true, items: true } } },
		});
	
		if (!invoice) {
			throw new HttpException('Facture introuvable', HttpStatus.NOT_FOUND);
		}
	
		const order = invoice.order;
		if (!order) {
			throw new HttpException('Commande introuvable', HttpStatus.NOT_FOUND);
		}
	
		// Vérification des droits d'accès
		if (userRole !== Role.ADMIN) {
			if (userRole === Role.BUYER) {
				console.log('buyer');
				if (order.buyerId !== userId) {
					throw new HttpException('Accès refusé à cette facture', HttpStatus.FORBIDDEN);
				}
			} else if (userRole === Role.SELLER) {
				console.log('seller');
				const isSellerInOrder = order.items.some(item => item.sellerId === userId);
				if (!isSellerInOrder) {
					throw new HttpException('Accès refusé à cette facture', HttpStatus.FORBIDDEN);
				}
			} else {
				throw new HttpException('Accès refusé', HttpStatus.FORBIDDEN);
			}
		}
	
		if (!invoice.pdfUrl) {
			throw new HttpException('La facture ne contient pas de fichier PDF', HttpStatus.BAD_REQUEST);
		}
	
		const filePath = path.join(__dirname, `../../../src/invoice_archive/${invoice.pdfUrl}`);
	
		if (!fs.existsSync(filePath)) {
			throw new HttpException('Fichier introuvable', HttpStatus.NOT_FOUND);
		}
	
		return (filePath);
	}
}
