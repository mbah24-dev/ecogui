/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   buyer-order-updated.ts                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/29 00:36:48 by mbah              #+#    #+#             */
/*   Updated: 2025/03/29 16:19:00 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

export const buyerOrderUpdateTemplate = (
	buyerName: string,
	orderId: string,
	orderDate: string,
	confirmedProducts: { name: string; quantity: number; price: number }[],
	rejectedProducts: { name: string; quantity: number; price: number }[],
	refundAmount: number
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
  
	const confirmedRows = confirmedProducts
	  .map(
		(p) => `
	  <tr>
		<td style="border: 1px solid #ddd; padding: 8px;">${p.name}</td>
		<td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${p.quantity}</td>
		<td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${p.price.toFixed(2)} €</td>
	  </tr>`
	  )
	  .join("");
  
	const rejectedRows = rejectedProducts.length
	  ? rejectedProducts
		  .map(
			(p) => `
		<tr>
		  <td style="border: 1px solid #ddd; padding: 8px;">${p.name}</td>
		  <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${p.quantity}</td>
		  <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${p.price.toFixed(2)} €</td>
		</tr>`
		  )
		  .join("")
	  : "";
  
	return `
	  <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
		<div style="max-width: 600px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
		  <h2 style="color: #2c3e50; text-align: center;">🐺 WolfCenter - Mise à jour de votre commande</h2>
		  
		  <p>Bonjour <strong>${buyerName}</strong>,</p>
		  
		  <p>Nous avons une mise à jour concernant votre commande <strong>#${shortOrderId}</strong> passée le <strong>${formatDate(
			orderDate
		  )}</strong>. Voici les derniers détails :</p>
		  
		  <h3 style="color: #27ae60;">✅ Produits confirmés :</h3>
		  <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
			<thead>
			  <tr style="background-color: #27ae60; color: white;">
				<th style="border: 1px solid #ddd; padding: 8px;">Produit</th>
				<th style="border: 1px solid #ddd; padding: 8px;">Quantité</th>
				<th style="border: 1px solid #ddd; padding: 8px;">Prix</th>
			  </tr>
			</thead>
			<tbody>
			  ${confirmedRows}
			</tbody>
		  </table>
  
		  ${
			rejectedRows
			  ? `
		  <h3 style="color: #e74c3c;">❌ Produits refusés :</h3>
		  <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
			<thead>
			  <tr style="background-color: #e74c3c; color: white;">
				<th style="border: 1px solid #ddd; padding: 8px;">Produit</th>
				<th style="border: 1px solid #ddd; padding: 8px;">Quantité</th>
				<th style="border: 1px solid #ddd; padding: 8px;">Prix</th>
			  </tr>
			</thead>
			<tbody>
			  ${rejectedRows}
			</tbody>
		  </table>
  
		  <h3 style="text-align: right; margin-top: 10px;">💰 Montant du remboursement : ${refundAmount.toFixed(
			2
		  )} €</h3>
		  <p style="margin-top: 20px;">⏳ Le remboursement des produits refusés est en cours de traitement.</p>
		  `
			  : `
		  <p style="margin-top: 20px; color: #2c3e50; font-weight: bold;">🎉 Bonne nouvelle ! Tous vos produits ont été confirmés. Préparez-vous à les recevoir sous peu !</p>
		  `
		  }
  
		  <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
		  
		  <p>Merci pour votre confiance en <strong>WolfCenter</strong>, votre expert en solutions digitales. 🚀</p>
		  
		  <p style="color: #7f8c8d; font-size: 12px; text-align: center;">
			Cet email vous a été envoyé par <strong>WolfCenter</strong>, fondé par <strong>BAH Mamadou</strong> en France. <br>
			Ceci est un email automatique, merci de ne pas y répondre.
		  </p>
		</div>
	  </div>
	`;
  };