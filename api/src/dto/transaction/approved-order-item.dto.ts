/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   approved-order-item.dto.ts                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/26 18:26:44 by mbah              #+#    #+#             */
/*   Updated: 2025/04/12 18:13:24 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { OrderItemStatus } from "@prisma/client";
import { IsString, IsUUID } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';  // Importer ApiProperty pour Swagger

export class ApproveOrderItemDto {

  @ApiProperty({
    description: 'L\'identifiant du produit à approuver dans la commande',
    type: String,
    example: 'e0e8f22f-0000-4b25-bbb7-15f1e903f30f',
  })
  @IsUUID()
  productId: string;

  @ApiProperty({
    description: 'L\'identifiant de la commande contenant l\'élément',
    type: String,
    example: 'f1e903f30f7c-15f1e903f30f',
  })
  @IsUUID()
  orderId: string;

  @ApiProperty({
    description: 'La décision pour cet élément de commande (approuvé ou rejeté)',
    enum: OrderItemStatus,  // Cela génère automatiquement la liste des valeurs possibles si `OrderItemStatus` est un enum
    example: OrderItemStatus.CONFIRMED,
  })
  @IsString()
  decision: OrderItemStatus;
}
