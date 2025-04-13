/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   send-email.service.ts                              :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/26 03:44:40 by mbah              #+#    #+#             */
/*   Updated: 2025/03/29 02:50:42 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SendEmailDto } from 'src/dto/send-email/send-email.dto';
import { JwtService } from '@nestjs/jwt';
import * as nodemailer from 'nodemailer';
import { resetPasswordTemplate } from './template/reset-password';

@Injectable()
export class SendEmailService {
	constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService) {}

	async requestPasswordReset(body: SendEmailDto) {
		const { email }: SendEmailDto = body;
		const user_found = await this.prisma.user.findUnique({
			where: { email }
		});
		if (!user_found)
			throw new HttpException('Aucun utilisateur trouver', HttpStatus.NOT_FOUND);

		const token = this.jwtService.sign(
			{
				userId: user_found.id
			},
			{
				secret: process.env.JWT_SECRET || 'default_key',
				expiresIn: '15m'
			}
		);

		await this.prisma.user.update({
			where: { email },
			data: { resetToken: token}
		});
		const resetLink = `http://localhost:4200/reset-password?token=${token}`;

		await this.send_email_to_reset_password(email, resetLink, user_found.name, 'Réinitialisation de votre mot de passe');

		return ({ message: 'Un email de réinitialisation a été envoyé.' });
	}

	private async send_email_to_reset_password(to: string, resetLink: string, name: string, subject: string) {
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
			  user: process.env.EMAIL_USER, // ton email
			  pass: process.env.EMAIL_PASS, // ton mot de passe
			},
		  });
	  
		  await transporter.sendMail({
			from: 'noreply@ecogui.com',
			to,
			subject,
			html: resetPasswordTemplate(resetLink, name),
		  });
	}

	async send_email(
		flatIt: number,
		to: string,
		subject: string,
		templateFunction: Function, // Fonction qui génère le template HTML
		...templateParams: any[]   // Paramètres sous forme de rest operator
	) {
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			},
		});
		if (!Array.isArray(templateParams)) {
			console.error("❌ ERREUR: Les paramètres du template ne sont pas un tableau !");
			return;
		}
	
		// Génération du contenu HTML
		let htmlContent;
		try {
			if (flatIt === 1) {
				const flattenedParams = templateParams.flat(); // Aplatit les éventuels tableaux imbriqués
				htmlContent = templateFunction(...flattenedParams);
			} else
				htmlContent = templateFunction(...templateParams);

		} catch (error) {
			console.error("❌ ERREUR: Échec de la génération du template:", error);
			return;
		}
	
		// Envoi de l'email
		try {
			await transporter.sendMail({
				from: 'noreply@ecogui.com',
				to,
				subject,
				html: htmlContent,
			});
			console.log("✅ Email envoyé avec succès !");
		} catch (error) {
			console.error("❌ ERREUR: Échec de l'envoi de l'email:", error);
		}
	}

	/*async send_email(
		to: string,
		subject: string,
		templateFunction: Function,
		...templateParams: any[]
	  ) {
		const transporter = nodemailer.createTransport({
		  service: 'gmail',
		  auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS,
		  },
		});
	  
		// Génération du contenu HTML
		let htmlContent;
		try {
		  htmlContent = templateFunction(...templateParams);
		} catch (error) {
		  console.error("❌ ERREUR: Échec de la génération du template:", error);
		  return;
		}
	  
		// Envoi de l'email
		try {
		  await transporter.sendMail({
			from: 'noreply@ecogui.com',
			to,
			subject,
			html: htmlContent,
		  });
		  console.log("✅ Email envoyé avec succès !");
		} catch (error) {
		  console.error("❌ ERREUR: Échec de l'envoi de l'email:", error);
		}
	  }*/
	
	  
}

