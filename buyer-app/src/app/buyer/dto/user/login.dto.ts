/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   login.dto.ts                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/04/24 18:42:08 by mbah              #+#    #+#             */
/*   Updated: 2025/04/24 18:47:17 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Role } from "../../models/user/role.model";

export class LoginDto {
    email!: string;
    password!: string;
    role?: Role = Role.BUYER;
}
