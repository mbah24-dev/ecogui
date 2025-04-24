import { ArrayMinSize, IsArray, IsInt, IsNumber, IsOptional, IsString, IsUUID, Min } from "class-validator";
import { ApiPropertyOptional } from '@nestjs/swagger'; // Importer ApiPropertyOptional pour Swagger

export class UpdateProductDto {
  
  @ApiPropertyOptional({
    description: 'Le nom du produit',
    type: String,  // Spécifie le type comme étant une chaîne de caractères
    example: 'Produit Exemple', // Exemple de valeur pour le nom du produit
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'La description du produit',
    type: String,  // Spécifie le type comme étant une chaîne de caractères
    example: 'Ceci est un produit exemple', // Exemple de valeur pour la description
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiPropertyOptional({
    description: 'Le prix du produit',
    type: Number,  // Spécifie que le prix est un nombre
    minimum: 0,  // Le prix doit être supérieur ou égal à 0
    example: 29.99, // Exemple de prix pour le produit
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price: number;

  @ApiPropertyOptional({
    description: 'Le stock disponible du produit',
    type: Number,  // Spécifie que le stock est un nombre entier
    minimum: 0,  // Le stock doit être supérieur ou égal à 0
    example: 100, // Exemple de stock disponible
  })
  @IsOptional()
  @IsInt({ message: 'Le stock doit être un nombre entier' })
  @Min(0, { message: 'Le stock ne peut pas être négatif' })
  stock: number;

  @ApiPropertyOptional({
    description: 'L\'ID de la catégorie à laquelle le produit appartient',
    type: String,  // Spécifie que l\'ID de la catégorie est une chaîne de caractères (UUID)
    example: 'e3f7d8b2-7597-4d38-b3c9-5330a697b8fe', // Exemple d\'UUID pour la catégorie
  })
  @IsOptional()
  @IsUUID()
  categoryId: string;

  @ApiPropertyOptional({
    description: 'Les tailles disponibles du produit (optionnel)',
    type: [String],
    example: ['Taille unique'],
    default: ['Taille unique'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  size?: string[];

  @ApiPropertyOptional({
    description: 'Les couleurs disponibles du produit (optionnel)',
    type: [String],
    example: ['Standard'],
    default: ['Standard'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  color?: string[];

  // Uncomment if images are to be handled later
  // @ApiPropertyOptional({
  //   description: 'Les images du produit',
  //   type: [String],
  //   minItems: 2,  // Au moins 2 images sont requises
  //   example: ['image1.jpg', 'image2.jpg'], // Exemple d\'images
  // })
  // @IsOptional()
  // @IsArray()
  // @ArrayMinSize(2, { message: 'Un produit doit avoir au moins 2 images.' })
  // @IsString({ each: true })
  // images: string[];
}
