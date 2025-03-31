/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   is-seller.decorator.ts                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/16 01:24:47 by mbah              #+#    #+#             */
/*   Updated: 2025/03/25 18:16:24 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { SetMetadata } from '@nestjs/common';

export const IS_SELLER_KEY = 'isSeller';
export const IsSeller = () => SetMetadata(IS_SELLER_KEY, true);
