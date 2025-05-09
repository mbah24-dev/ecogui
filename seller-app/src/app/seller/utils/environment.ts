/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   environment.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/04/24 16:13:24 by mbah              #+#    #+#             */
/*   Updated: 2025/05/08 21:41:13 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class Environment {
  apiUrl!: string;

  constructor() {
    this.apiUrl = 'http://localhost:3000';
  }
}
