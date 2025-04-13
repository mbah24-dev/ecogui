import { IsString, IsNotEmpty, MinLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger'; // Importer ApiProperty pour Swagger

export class ResetPasswordDto {

  @ApiProperty({
    description: 'Le nouveau mot de passe de l\'utilisateur',
    type: String, // Type de la propriété
    minLength: 6, // Minimum length pour le mot de passe
    example: 'newpassword123', // Exemple de valeur
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
