import { Transform } from "class-transformer";
import { ArrayMinSize, IsArray, IsInt, IsNumber, IsString, IsUUID, Min } from "class-validator";
import { ApiProperty } from '@nestjs/swagger'; // Importer ApiProperty pour Swagger

export class CreateProductDto {
  
  @ApiProperty({
    description: 'Le nom du produit',
    type: String,  // Spécifie le type comme étant une chaîne de caractères
    example: 'Produit Exemple', // Exemple de valeur pour le nom du produit
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'La description du produit',
    type: String,  // Spécifie le type comme étant une chaîne de caractères
    example: 'Ceci est un produit exemple', // Exemple de valeur pour la description
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Le prix du produit',
    type: Number,  // Spécifie que le prix est un nombre
    minimum: 0,  // Le prix doit être supérieur ou égal à 0
    example: 29.99, // Exemple de prix pour le produit
  })
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    description: 'Le stock disponible du produit',
    type: Number,  // Spécifie que le stock est un nombre entier
    minimum: 0,  // Le stock doit être supérieur ou égal à 0
    example: 100, // Exemple de stock disponible
  })
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(0)
  stock: number;

  @ApiProperty({
    description: 'L\'ID de la catégorie à laquelle le produit appartient',
    type: String,  // Spécifie que l\'ID de la catégorie est une chaîne de caractères (UUID)
    example: 'e3f7d8b2-7597-4d38-b3c9-5330a697b8fe', // Exemple d\'UUID pour la catégorie
  })
  @IsUUID()
  categoryId: string;

  // Uncomment if images are to be handled later
  // @ApiProperty({
  //   description: 'Les images du produit',
  //   type: [String],
  //   minItems: 2,  // Au moins 2 images sont requises
  //   example: ['image1.jpg', 'image2.jpg'], // Exemple d\'images
  // })
  // @IsArray()
  // @ArrayMinSize(2, { message: 'Un produit doit avoir au moins 2 images.' })
  // @IsString({ each: true })
  // images: string[];
}
