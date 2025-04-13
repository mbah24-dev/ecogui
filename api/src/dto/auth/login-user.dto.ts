import { Role } from '@prisma/client';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Importer ApiProperty pour Swagger

export class LoginDto {
  
  @ApiProperty({
    description: 'L\'email de l\'utilisateur pour la connexion',
    type: String, // Type de la propriété
    example: 'example@domain.com', // Exemple de valeur
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Le mot de passe de l\'utilisateur pour la connexion',
    type: String, // Type de la propriété
    example: 'password123', // Exemple de valeur
  })
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'Le rôle de l\'utilisateur (non obligatoire lors de la connexion)',
    enum: Role, // Enum pour le rôle de l'utilisateur
    example: Role.ADMIN, // Exemple de valeur
    required: false, // Cette propriété est optionnelle
  })
  role: Role;
}
