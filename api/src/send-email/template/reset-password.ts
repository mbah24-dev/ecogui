/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   reset-password.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/24 01:47:14 by mbah              #+#    #+#             */
/*   Updated: 2025/04/25 01:32:17 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

export const resetPasswordTemplate = (resetLink: string, name: string): string => {
	return `
	<div style="font-family: 'Segoe UI', Roboto, sans-serif; background-color: #f5f7fa; padding: 40px 20px;">
	  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); overflow: hidden;">
		<div style="background-color: #046b2f; padding: 20px 30px;">
		  <h1 style="color: #ffffff; margin: 0; font-size: 22px; text-align: center;">🔐 Sécurisation de votre compte Ecogui</h1>
		</div>
  
		<div style="padding: 30px;">
		  <p style="font-size: 16px; color: #333333;">Bonjour <strong>${name}</strong>,</p>
  
		  <p style="font-size: 15px; color: #444;">
			Nous avons reçu une demande de réinitialisation de mot de passe pour votre compte <strong>Ecogui</strong>. Cette procédure permet de garantir la sécurité de vos informations personnelles et de vos accès à nos services.
		  </p>
  
		  <p style="font-size: 15px; color: #444;">
			Si vous êtes bien à l'origine de cette démarche, vous pouvez réinitialiser votre mot de passe en cliquant sur le bouton ci-dessous :
		  </p>
  
		  <div style="text-align: center; margin: 30px 0;">
			<a href="${resetLink}" style="background-color: #046b2f; color: #ffffff; padding: 14px 24px; text-decoration: none; font-weight: 600; border-radius: 6px; display: inline-block;">
			  🔄 Réinitialiser mon mot de passe
			</a>
		  </div>
  
		  <p style="font-size: 14px; color: #555;">
			Si le bouton ne fonctionne pas, vous pouvez également copier et coller le lien suivant dans votre navigateur :
		  </p>
  
		  <p style="word-break: break-all; background-color: #f0f0f0; padding: 12px; border-radius: 6px; font-size: 13px; color: #333;">${resetLink}</p>
  
		  <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
  
		  <p style="font-size: 14px; color: #c0392b; font-weight: bold;">
			⚠️ Si vous n’êtes pas à l’origine de cette demande, nous vous invitons à ignorer cet e-mail. Aucune modification ne sera effectuée sur votre compte sans votre action.
		  </p>
  
		  <p style="font-size: 14px; color: #444;">
			La sécurité de nos utilisateurs est une priorité absolue chez Ecogui. Pour toute assistance ou signalement, notre équipe reste disponible :
			<br>
			📧 <a href="mailto:support@ecogui.com" style="color: #046b2f;">support@ecogui.com</a>
		  </p>
  
		  <p style="font-size: 12px; color: #aaa; text-align: center; margin-top: 40px;">
			Cet email vous a été envoyé automatiquement. Merci de ne pas y répondre.
		  </p>
		</div>
	  </div>
	</div>
	`;
  };
  
  