import { Role } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  Matches,
  MinLength,
  IsString,
  IsPhoneNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {

  @ApiProperty({
    description: "L'email de l'utilisateur, doit être un email valide",
    type: String,
    example: 'user@example.com',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: "Le mot de passe de l'utilisateur (minimum 6 caractères)",
    type: String,
    example: 'password123',
    required: false,
  })
  @MinLength(6)
  @IsOptional()
  password?: string;

  @ApiProperty({
    description: "L'ancien mot de passe de l'utilisateur (minimum 6 caractères)",
    type: String,
    example: 'password123',
    required: false,
  })
  @MinLength(6)
  @IsOptional()
  old_password?: string;

  @ApiProperty({
    description: 'Le nom complet de l’utilisateur (au moins prénom et nom)',
    type: String,
    example: 'John Doe',
    required: false,
  })
  @Matches(/^[a-zA-ZÀ-ÖØ-öø-ÿ' -]{2,}(?: [a-zA-ZÀ-ÖØ-öø-ÿ' -]{2,})+$/, {
    message: 'Le nom complet doit contenir au moins un prénom et un nom, uniquement des lettres',
  })
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: "Le numéro de téléphone de l'utilisateur (format international ou local)",
    type: String,
    example: '+224 621 66 66 85',
    required: false,
  })
  @IsOptional()
  @Matches(/^(\+224|00224)?\s?\d{3}[\s.-]?\d{2}[\s.-]?\d{2}[\s.-]?\d{2}$/, {
    message: 'Le numéro de téléphone est invalide',
  })
  phoneNumber?: string;

  @ApiProperty({
    description: "Le rôle de l'utilisateur",
    enum: Role,
    example: Role.ADMIN,
    required: false,
  })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
