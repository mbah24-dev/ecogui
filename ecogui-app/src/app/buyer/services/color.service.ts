/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   color.service.ts                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/04/17 17:35:00 by mbah              #+#    #+#             */
/*   Updated: 2025/04/17 19:35:16 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
  })
export class ColorService {

    isValidCssColor(color: string): boolean {
        const div = document.createElement('div');
        div.style.color = color;
        return div.style.color !== '';
    }

}
