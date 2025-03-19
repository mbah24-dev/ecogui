/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.ts                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/15 22:20:39 by mbah              #+#    #+#             */
/*   Updated: 2025/03/19 13:25:43 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🔥 S'ASSURER QUE LA SESSION EST BIEN CONFIGURÉE
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }

  app.use(
    session({
      secret: process.env.JWT_SECRET!,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false, // ⚠️ Mettre `true` en prod (HTTPS obligatoire)
        httpOnly: true,
        maxAge: 1000 * 60 * 5, // 1 heure
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
  app.enableCors({
    origin: 'http://localhost:4200', // L'adresse de votre application Angular
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();


