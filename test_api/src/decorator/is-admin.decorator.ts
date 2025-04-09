/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   is-admin.decorator.ts                              :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/16 01:24:47 by mbah              #+#    #+#             */
/*   Updated: 2025/03/25 14:15:52 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { SetMetadata } from '@nestjs/common';

export const IS_ADMIN_KEY = 'isAdmin';
export const IsAdmin = () => SetMetadata(IS_ADMIN_KEY, true);
