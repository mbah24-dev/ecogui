import { Role } from '@prisma/client';
import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';  // Importer ApiProperty pour Swagger

export class CreateUserDto {

  @ApiProperty({
    description: 'L\'email de l\'utilisateur, doit être un email valide',
    type: String,
    example: 'user@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
  
  @ApiProperty({
    description: 'Le mot de passe de l\'utilisateur, doit être d\'au moins 6 caractères',
    type: String,
    example: 'password123',
  })
  @MinLength(6)
  @IsNotEmpty()
  password: string;
  
  @ApiProperty({
    description: 'Le nom complet de l\'utilisateur (au moins prénom et nom)',
    type: String,
    example: 'John Doe',
  })
  @IsNotEmpty()
  @Matches(/^[a-zA-ZÀ-ÖØ-öø-ÿ' -]{2,}(?: [a-zA-ZÀ-ÖØ-öø-ÿ' -]{2,})+$/, {
    message: 'Name must be a full name (at least first and last name, letters only)',
  })
  name: string;
  
  @ApiProperty({
    description: 'Le rôle de l\'utilisateur dans l\'application',
    enum: Role,  // Utiliser l'enum Role pour générer la liste des rôles disponibles
    example: Role.ADMIN,  // Exemple de rôle
  })
  role: Role;
}
