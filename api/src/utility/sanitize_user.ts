/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   sanitize_user.ts                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/04/30 17:58:19 by mbah              #+#    #+#             */
/*   Updated: 2025/04/30 17:59:17 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { SessionData } from "express-session";

export function sanitizeUser(user: any): SessionData["user"] {
	return {
	  id: user.id,
	  email: user.email,
	  name: user.name,
	  role: user.role,
	  balance: user.balance,
	  profilePic: user.profilePic,
	  phoneNumber: user.phoneNumber,
	  score: user.score
	};
}
  