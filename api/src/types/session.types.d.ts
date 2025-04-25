/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   session.types.d.ts                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/17 18:08:48 by mbah              #+#    #+#             */
/*   Updated: 2025/04/24 19:11:36 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import session from 'express-session';

declare module 'express-session' {
  interface SessionData {
    user?: {
		email: string;
		password: string;
		id: string;
		name: string;
		role: $Enums.Role;
		createdAt: Date;
		updatedAt: Date;
		resetToken: string | null;
		balance: number;
		profilePic: string | null;
		isOnline: boolean;
		countryCode: string | null;
		phoneNumber: string | null;
		score: number;
    };
  }
}
