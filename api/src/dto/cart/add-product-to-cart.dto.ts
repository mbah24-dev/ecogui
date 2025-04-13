import { IsInt, IsUUID, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Importer ApiProperty pour Swagger

/**
 * Représente le modèle CartItem dans le schéma de Prisma
 */
export class AddProductToCartDto {
  
  @ApiProperty({
    description: 'La quantité du produit à ajouter au panier',
    type: Number, // Le type de la propriété est un nombre
    minimum: 1, // Quantité minimale (doit être supérieur ou égal à 1)
    example: 2, // Exemple de valeur pour la quantité
  })
  @IsInt()
  @Min(1)
  quantity: number;
}
