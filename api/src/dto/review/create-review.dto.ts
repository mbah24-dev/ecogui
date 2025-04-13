import { IsInt, IsNotEmpty, IsString, Max, Min } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';  // Importer ApiProperty pour Swagger

export class CreateReviewDto {
  
  @ApiProperty({
    description: 'Le message de l\'avis laissé par l\'utilisateur',
    type: String,  // Spécifie que le message est une chaîne de caractères
    example: 'Excellent produit, je recommande vivement !',  // Exemple de message
  })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({
    description: 'La note attribuée au produit (entre 0 et 10)',
    type: Number,  // Spécifie que la note est un nombre entier
    minimum: 0,  // La note doit être supérieure ou égale à 0
    maximum: 10,  // La note doit être inférieure ou égale à 10
    example: 8,  // Exemple de note
  })
  @IsInt()
  @Min(0)
  @Max(10)
  rating: number;
}
