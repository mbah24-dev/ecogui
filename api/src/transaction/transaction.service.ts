import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OrderItemStatus, OrderStatus, ProductStatus } from '@prisma/client';
import { CartService } from 'src/cart/cart.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cart } from 'src/types/cart.types';
import { TransactionUtils } from './transaction-utils.service';
import { SendEmailService } from 'src/send-email/send-email.service';
import { sellerOrderNotificationTemplate } from 'src/send-email/template/seller-order-notification';
import { buyerOrderConfirmationTemplate } from 'src/send-email/template/buyer-order-confirmation';

@Injectable()
export class TransactionService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly cartService: CartService,
		private readonly transactionUtils: TransactionUtils,
		private readonly sendEmailService: SendEmailService) {}

	async create_order_and_get_details(userId: string) {
		const cart = await this.prismaService.cart.findUnique({
			where: { userId },
			select: { id: true, total: true, items: { include: { product: true } } }
		});
		
		if (!cart || !cart.items.length) throw new HttpException('Panier vide.', HttpStatus.BAD_REQUEST);
		
		// Création de la commande dans la base de données
		const order = await this.prismaService.$transaction(async (prisma) => {
			const createdOrder = await prisma.order.create({
			data: { buyerId: userId, totalPrice: cart.total }
			});
		
			// Ajout des items du panier dans les items de la commande
			await this.transactionUtils.add_cart_items_to_order_items(cart, prisma, createdOrder);
			return (createdOrder);
		});
		
		// Vide le panier de l'utilisateur après la commande
		//await this.cartService.clear_the_cart(userId);
		
		// Récupére les vendeurs des produits présents dans la commande
		const sellers = new Set<string>(); // Utilisation d'un Set pour éviter les doublons
		cart.items.forEach(item => {
			if (item.product.sellerId) {
			sellers.add(item.product.sellerId); // Ajoute l'ID du vendeur
			}
		});
		
		// Récupére les informations sur les produits dans la commande
		const orderDetails = {
			orderId: order.id,
			orderDate: new Date().toLocaleDateString(),
			products: cart.items.map(item => ({
				name: item.product?.name || "Produit inconnu",
				quantity: item.quantity,
				price: item.product?.price || 0,
				sellerId: item.product?.sellerId
			})),
			totalPrice: cart.total
		};		
		  
		// Retourne les informations de la commande et les vendeurs associés
		return { orderDetails, sellers };
	}

	async notify_sellers_about_new_order(orderDetails: any, sellers: Set<string>) {
		for (const sellerId of sellers) {
			const seller = await this.prismaService.user.findUnique({
				where: { id: sellerId },
				select: { email: true, name: true }
			});
	
			if (seller) {
				// j'applique un filtre unique sur les produits de ce vendeur
				const sellerProducts = orderDetails.products.filter(product => 
					product.sellerId === sellerId
				);
	
				// Calculons le total uniquement pour ses produits
				const sellerTotal = sellerProducts.reduce((sum, product) => sum + (product.price * product.quantity), 0);
	
				// Vérifion si le vendeur a bien des produits
				if (sellerProducts.length > 0) {
					await this.sendEmailService.send_email(
						seller.email,               
						"Nouvelle commande",      
						sellerOrderNotificationTemplate,
						[
							seller.name,            
							orderDetails.orderId,     
							orderDetails.orderDate,   
							sellerProducts,    
							sellerTotal  
						]
					);
				}
			}
		}
	}
	
	
	  
	async create_order(userId: string) {
		// Crée la commande et retourne les informations de la commande et des vendeurs
		const { orderDetails, sellers } = await this.create_order_and_get_details(userId);
		// Envoie des notifications par email à chaque vendeur
		await this.notify_sellers_about_new_order(orderDetails, sellers);

		// notifions l'acheteur
		const user = await this.prismaService.user.findUnique({
		  where: { id: userId },
		  select: { email: true, name: true }
		});
	  
		if (user) {
		  // Envoi de l'email à l'utilisateur
		  await this.sendEmailService.send_email(
			user.email,                
			"Confirmation de commande",
			buyerOrderConfirmationTemplate, 
			[
			  user.name,           
			  orderDetails.orderId,   
			  orderDetails.orderDate,
			  orderDetails.products,  
			  orderDetails.totalPrice 
			]
		  );		  
		  
		}
		// Retourne l'ID de la commande
		return { orderId: orderDetails.orderId };
	}
	  
	  

	async cancel_the_order(orderId: string, userId: string) {
		const order = await this.prismaService.order.findUnique({
			where: { id: orderId },
			include: { items: true }
		});
		if (!order || order.buyerId !== userId) throw new HttpException('Commande non trouvée.', HttpStatus.BAD_REQUEST);

		return this.prismaService.$transaction(async (prisma) => {
			await Promise.all(order.items.map(item => 
				this.transactionUtils.update_product_stock(item.productId, prisma, item.quantity, '+')
			));

			return (prisma.order.update({
				where: { id: orderId },
				data: { status: OrderStatus.CANCELED, items: { create: [] } }
			}));
		});
	}

	async get_orders() {
		const orders = await this.prismaService.order.findMany({
			include: {
				items: {
					include: {
						product: true,
						seller: true,
					}
				},
				buyer: true
			}
		});
	
		if (!orders.length) {
			throw new HttpException('Aucune commande trouvée', HttpStatus.NOT_FOUND);
		}
	
		return (orders);
	}
	

	async get_user_orders(userId: string) {
		const orders = await this.prismaService.order.findMany({
			where: { buyerId: userId },
			include: { items: { include: { product: true } } }
		});
		if (!orders.length) throw new HttpException('Aucune commande trouvée.', HttpStatus.BAD_REQUEST);
		return (orders);
	}

	async get_user_orders_by_status(userId: string, status: OrderStatus) {
		if (!Object.values(OrderStatus).includes(status))
			throw new HttpException('Filtre incorrect.', HttpStatus.BAD_REQUEST);

		const orders = await this.prismaService.order.findMany({
			where: { buyerId: userId, status },
			include: { items: { include: { product: true } } }
		});
		if (!orders.length) throw new HttpException('Aucune commande trouvée.', HttpStatus.BAD_REQUEST);
		return (orders);
	}

	// Filtre les commandes contenant les produits du vendeur
	async retrieve_seller_products_from_orders(sellerId: string) {
		const orders = await this.prismaService.order.findMany({
			where: {
				items: { some: { sellerId } }
			},
			include: {
				items: {
					where: { sellerId },
					include: { product: true }
				}
			}
		});
	
		if (!orders.length) 
			throw new HttpException('Aucune commande trouvée', HttpStatus.NOT_FOUND);
	
		return (orders);
	}

	async get_user_order_by_id(userId: string, orderId: string) {
		const order = await this.prismaService.order.findUnique({
			where: { id: orderId, buyerId: userId },
			include: {
				items: {
					include: {
						product: true,
						seller: true,
					}
				},
				buyer: true
			}
		});
	
		if (!order)
			throw new HttpException('Aucune commande trouvée', HttpStatus.NOT_FOUND);
	
		return (order);
	}
	
	async approve_or_reject_order_items(sellerId: string, productId: string, decision: OrderItemStatus, orderId: string) {
		if (![OrderItemStatus.CONFIRMED, OrderItemStatus.PENDING, OrderItemStatus.REFUSED].includes(decision))
			throw new HttpException('Décision invalide.', HttpStatus.BAD_REQUEST);

		return this.prismaService.orderItem.updateMany({
			where: { sellerId, productId, orderId },
			data: { status: decision }
		});
	}
}
