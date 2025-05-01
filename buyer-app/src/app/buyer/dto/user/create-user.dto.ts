/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   create-user.dto.ts                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/04/24 18:39:53 by mbah              #+#    #+#             */
/*   Updated: 2025/04/24 18:48:36 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Role } from "../../models/user/role.model";

export class CreateUserDto {
    email!: string;
    password!: string;
    name!: string;
    role?: Role = Role.BUYER;
}
