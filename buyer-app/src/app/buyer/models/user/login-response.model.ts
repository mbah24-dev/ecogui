/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   login-response.model.ts                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/04/24 19:03:24 by mbah              #+#    #+#             */
/*   Updated: 2025/04/24 19:06:18 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { User } from "./user.model";

export interface LoginResponseDto {
    message: string;
    accessToken: string;
    user: User;
}
