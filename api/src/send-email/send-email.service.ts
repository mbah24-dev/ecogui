import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SendEmailDto } from 'src/dto/send-email.dto';
import { JwtService } from '@nestjs/jwt';
import nodemailer from 'nodemailer';

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

		await this.send_email(email, resetLink);

		return ({ message: 'Un email de réinitialisation a été envoyé.' });
	}

	private async send_email(to: string, resetLink: string) {
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
			  user: process.env.EMAIL_USER, // ton email
			  pass: process.env.EMAIL_PASS, // ton mot de passe
			},
		  });
	  
		  await transporter.sendMail({
			from: 'noreply@bconnect.com',
			to,
			subject: 'Réinitialisation de votre mot de passe',
			html: `<p>Cliquez sur le lien ci-dessous pour réinitialiser votre mot de passe :</p>
				   <a href="${resetLink}">${resetLink}</a>`,
		  });
	}
}

