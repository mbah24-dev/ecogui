/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   is-buyer.decorator.ts                              :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/16 01:24:47 by mbah              #+#    #+#             */
/*   Updated: 2025/03/26 01:41:48 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { SetMetadata } from '@nestjs/common';

export const IS_BUYER_KEY = 'isBuyer';
export const IsBuyer = () => SetMetadata(IS_BUYER_KEY, true);
