/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   seller-order-notification.ts                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/27 18:43:04 by mbah              #+#    #+#             */
/*   Updated: 2025/03/27 18:46:33 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

export const sellerOrderNotificationTemplate = (
	sellerName: string,
	orderId: string,
	orderDate: string,
	products: { name: string; quantity: number; price: number }[],
	totalPrice: number
  ): string => {
	const productRows = products
	  .map(
		(p) => `
	  <tr>
		<td style="border: 1px solid #ddd; padding: 8px;">${p.name}</td>
		<td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${p.quantity}</td>
		<td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${p.price.toFixed(2)} €</td>
	  </tr>`
	  )
	  .join("");
  
	return `
	<div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
	  <div style="max-width: 600px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
		<h2 style="color: #2c3e50; text-align: center;">📦 Nouvelle Commande Reçue</h2>
		<p>Bonjour ${sellerName},</p>
		<p>Une nouvelle commande a été passée sur votre boutique. Veuillez la confirmer ou la refuser depuis l’application.</p>
  
		<h3 style="color: #3498db;">🛒 Détails de la commande :</h3>
		<p><strong>Numéro de commande :</strong> ${orderId}</p>
		<p><strong>Date :</strong> ${orderDate}</p>
  
		<table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
		  <thead>
			<tr style="background-color: #3498db; color: white;">
			  <th style="border: 1px solid #ddd; padding: 8px;">Produit</th>
			  <th style="border: 1px solid #ddd; padding: 8px;">Quantité</th>
			  <th style="border: 1px solid #ddd; padding: 8px;">Prix</th>
			</tr>
		  </thead>
		  <tbody>
			${productRows}
		  </tbody>
		</table>
  
		<h3 style="text-align: right; margin-top: 10px;">💰 Total : ${totalPrice.toFixed(2)} €</h3>
  
		<div style="text-align: center; margin-top: 20px;">
		  <a href="https://app.com/orders/${orderId}" style="background-color: #27ae60; color: white; text-decoration: none; padding: 12px 20px; border-radius: 5px; display: inline-block; font-weight: bold;">
			✅ Confirmer la commande
		  </a>
		</div>
  
		<hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
  
		<p>Merci de traiter cette commande rapidement.</p>
		<p style="color: #7f8c8d; font-size: 12px; text-align: center;">Ceci est un email automatique, merci de ne pas y répondre.</p>
	  </div>
	</div>
	`;
  };
  