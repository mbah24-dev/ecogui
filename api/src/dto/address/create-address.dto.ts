import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger"; // Importer ApiProperty de @nestjs/swagger
import { City, ConakryCommune } from "src/types/address.types";

export class CreateAddressDto {

  @ApiProperty({
    description: 'La commune de l\'adresse',
    enum: ConakryCommune, // Déclarez l\'enum pour Swagger
    example: ConakryCommune.Dixinn, // Exemple de valeur à afficher dans la documentation Swagger
  })
  @IsEnum(ConakryCommune)
  commune: ConakryCommune;

  @ApiProperty({
    description: 'La ville de l\'adresse',
    enum: City, // Déclarez l\'enum pour Swagger
    example: City.Conakry, // Exemple de valeur à afficher dans la documentation Swagger
  })
  @IsEnum(City)
  city: City;

  @ApiProperty({
    description: 'Le pays de l\'adresse',
    type: String, // Indiquez le type pour Swagger
    example: 'Guinée', // Exemple de valeur à afficher dans la documentation Swagger
  })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({
    description: 'Une description de l\'adresse',
    type: String, // Indiquez le type pour Swagger
    example: 'Adresse dans le quartier X à Conakry', // Exemple de valeur à afficher dans la documentation Swagger
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
