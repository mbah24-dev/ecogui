/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.ts                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/15 22:20:39 by mbah              #+#    #+#             */
/*   Updated: 2025/04/12 17:53:48 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:4200', // Permet uniquement l'origine de mon frontend Angular
    methods: 'GET,POST,PUT,DELETE',
    credentials: true, // Permet l'envoi de cookies/credentials avec la requête
  });
  
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }

  app.use(
    session({
      secret: process.env.JWT_SECRET!,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === 'production', // ⚠️ Mettre `true` en prod (HTTPS obligatoire)
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
      },
    }),
  );

  // ✅ Middleware global après la session
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

    // Configuration de Swagger
	const config = new DocumentBuilder()
    .setTitle('Ecogui API')
    .setDescription('La documentation de mon api Ecogui')
    .setVersion('1.0')
    .addTag('transaction')  // Ajout des tags pour la classification des routes
    .addBearerAuth() 
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);  // 'api-docs' est l'URL de la documentation
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
