/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   role.service.ts                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/20 17:26:07 by mbah              #+#    #+#             */
/*   Updated: 2025/03/20 17:26:45 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private roleSubject = new BehaviorSubject<'buyer' | 'seller' | 'admin'>('buyer'); // Valeur par défaut 'buyer'
  role$ = this.roleSubject.asObservable();

  constructor() {}

  setRole(role: 'buyer' | 'seller' | 'admin'): void {
    this.roleSubject.next(role);
  }

  getRole(): 'buyer' | 'seller' | 'admin' {
    return this.roleSubject.value;
  }
}
