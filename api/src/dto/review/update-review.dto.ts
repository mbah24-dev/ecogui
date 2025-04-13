import { IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';  // Importer ApiProperty pour Swagger

export class UpdateReviewDto {

  @ApiProperty({
    description: 'Le message mis à jour de l\'avis laissé par l\'utilisateur',
    type: String,
    example: 'Produit amélioré, très satisfait !',
    required: false,  // Spécifie que ce champ est optionnel
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({
    description: 'La note mise à jour attribuée au produit (entre 0 et 10)',
    type: Number,
    minimum: 0,
    maximum: 10,
    example: 9,
    required: false,  // Spécifie que ce champ est optionnel
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(10)
  rating: number;
}
