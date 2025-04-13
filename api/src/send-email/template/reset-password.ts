/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   reset-password.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/24 01:47:14 by mbah              #+#    #+#             */
/*   Updated: 2025/03/29 16:21:28 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

export const resetPasswordTemplate = (resetLink: string, name: string): string => {
	return `
	<div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
	  <div style="max-width: 600px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
		<h2 style="color: #2c3e50; text-align: center;">🔐 Demande de réinitialisation de mot de passe</h2>
		<p>Bonjour Mr/Mme ${name},</p>
		<p>Nous avons reçu une demande de réinitialisation de mot de passe pour votre compte <strong>Wolfcenter Shop</strong>.</p>
		<p>Si vous êtes à l’origine de cette demande, cliquez sur le bouton ci-dessous pour définir un nouveau mot de passe :</p>
		
		<div style="text-align: center; margin: 20px 0;">
		  <a href="${resetLink}" style="background-color: #3498db; color: white; text-decoration: none; padding: 12px 20px; border-radius: 5px; display: inline-block; font-weight: bold;">
			🔄 Réinitialiser mon mot de passe
		  </a>
		</div>
  
		<p>Ou copiez et collez ce lien dans votre navigateur :</p>
		<p style="background: #f4f4f4; padding: 10px; border-radius: 5px; word-break: break-all;">${resetLink}</p>
  
		<hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
		
		<p style="color: red; font-weight: bold;">⚠️ Si vous n’êtes pas à l’origine de cette demande, ignorez simplement cet email. Votre compte reste sécurisé.</p>
		
		<p>Besoin d'aide ? Contactez notre support à <a href="mailto:support@ecogui.com">support@ecogui.com</a>.</p>
		
		<p style="color: #7f8c8d; font-size: 12px; text-align: center;">Ceci est un email automatique, merci de ne pas y répondre.</p>
	  </div>
	</div>
	`;
  };
  