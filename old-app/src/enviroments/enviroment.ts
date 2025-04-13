/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   enviroment.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/20 02:10:38 by mbah              #+#    #+#             */
/*   Updated: 2025/03/20 02:12:54 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class Enviroment {
  apiUrl: string = 'http://localhost:3000';
}
