/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   buyer-order-confirmation.ts                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/27 18:43:30 by mbah              #+#    #+#             */
/*   Updated: 2025/03/29 16:19:19 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

export const buyerOrderConfirmationTemplate = (
	buyerName: string,
	orderId: string,
	orderDate: string,
	products: { name: string; quantity: number; price: number }[],
	totalPrice: number
  ): string => {
	const formatDate = (isoDate: string) => {
		const date = new Date(isoDate);
		if (isNaN(date.getTime())) {
		  throw new Error('Date invalide : ' + isoDate);
		}
		const day = date.getDate().toString().padStart(2, '0');
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const year = date.getFullYear();
		return `Date : ${day}/${month}/${year}`;
	};
	  
	// Récupére uniquement les 6 premiers caractères du numéro de commande
	const shortOrderId = orderId.slice(0, 6);
  
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
		
		<h2 style="color: #2c3e50; text-align: center;">🎉 Votre commande est bien enregistrée !</h2>
  
		<p>Bonjour <strong>${buyerName}</strong>,</p>
		
		<p>🛍️ Super nouvelle ! Votre commande a été prise en compte et nos vendeurs sont en train de la valider.</p>
  
		<h3 style="color: #3498db;">🛒 Récapitulatif de votre commande :</h3>
		<p><strong>Numéro de commande :</strong> #${shortOrderId}</p>
		<p><strong>Date :</strong> ${formatDate(orderDate)}</p>
  
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
  
		<p style="margin-top: 20px;">⏳ Vous recevrez un second email dès que tous les vendeurs auront confirmé votre commande.</p>
  
		<hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
  
		<p>Merci de votre confiance et à très bientôt sur notre plateforme ! 🚀</p>
  
		<p style="color: #7f8c8d; font-size: 12px; text-align: center;">
		  Cet email vous a été envoyé par <strong>WolfCenter</strong>, fondé par <strong>BAH Mamadou</strong> en France.<br>
		  Ceci est un email automatique, merci de ne pas y répondre.
		</p>
	  </div>
	</div>
	`;
  };