/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   session.types.d.ts                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/17 18:08:48 by mbah              #+#    #+#             */
/*   Updated: 2025/03/17 18:16:50 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import session from 'express-session';

declare module 'express-session' {
  interface SessionData {
    user?: {
      id: string;
      email: string;
      role: string;
    };
  }
}
