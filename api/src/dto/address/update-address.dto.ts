import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger"; // Importer ApiProperty pour Swagger
import { City, ConakryCommune } from "src/types/address.types";

export class UpdateAddressDto {
  
  @ApiProperty({
    description: 'La commune de l\'adresse (facultatif)',
    type: String,
    example: ConakryCommune.Dixinn,
    required: false,
  })
  @IsOptional()
  @IsString()
  commune?: string;

  @ApiProperty({
    description: 'La ville de l\'adresse (facultatif)',
    enum: City,
    example: City.Conakry,
    required: false,
  })
  @IsOptional()
  @IsEnum(City)
  city?: City;

  @ApiProperty({
    description: 'Le pays de l\'adresse (facultatif)',
    type: String,
    example: 'Guinée',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  country?: string;

  @ApiProperty({
    description: 'Une description de l\'adresse (facultatif)',
    type: String,
    example: 'Adresse mise à jour dans le quartier X à Conakry', 
    required: false, 
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;
}
