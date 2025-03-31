import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AddressService } from 'src/address/address.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TransactionService } from 'src/transaction/transaction.service';
import * as fs from 'fs';
import * as path from 'path';
import * as Handlebars from 'handlebars';
import * as puppeteer from 'puppeteer';

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
        const { orderDetails, sellers } = await this.get_order_data(orderId);

        // Génére la facture pour le buyer
        await this.createPdf('buyer-invoice', orderDetails, `buyer_${orderId}.pdf`);

		await this.prismaService.invoice.create({
			data: {
				pdfUrl: `buyer_${orderId}.pdf`,
				totalAmount: orderDetails.totalToPaid,
				orderId
			}
		});

        // Génére les factures pour chaque seller
        const sellerData = await this.get_seller_order_data(orderDetails, sellers);
        for (const seller of sellerData) {
            await this.createPdf('seller-invoice', seller, `seller_${seller.orderId}_${seller.name}.pdf`);
			await this.prismaService.invoice.create({
				data: {
					pdfUrl: `seller_${seller.orderId}_${seller.name}.pdf`,
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

        // Charge le fichier HTML du template
        const templateHtml = fs.readFileSync(templatePath, 'utf8');

        // Compile le template Handlebars
        const template = Handlebars.compile(templateHtml);
        const htmlContent = template(data);

        // Génére le PDF avec Puppeteer
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
}
