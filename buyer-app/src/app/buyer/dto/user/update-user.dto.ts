/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   update-user.dto.ts                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/04/30 00:23:25 by mbah              #+#    #+#             */
/*   Updated: 2025/04/30 00:23:27 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Role } from "../../models/user/role.model";

export class UpdateUserDto {
  email?: string;
  password?: string;
  name?: string;
  phoneNumber?: string;
  role?: Role;
}
