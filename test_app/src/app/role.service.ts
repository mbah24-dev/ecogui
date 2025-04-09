/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   role.service.ts                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/20 17:26:07 by mbah              #+#    #+#             */
/*   Updated: 2025/03/22 22:32:35 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private roleSubject: BehaviorSubject<'buyer' | 'seller' | 'admin'>;

  role$ = new Observable<'buyer' | 'seller' | 'admin'>();

  constructor() {
    const savedRole = this.isBrowser() ? localStorage.getItem('userRole') as 'buyer' | 'seller' | 'admin' | null : null;
    this.roleSubject = new BehaviorSubject<'buyer' | 'seller' | 'admin'>(savedRole ?? 'buyer');
    this.role$ = this.roleSubject.asObservable();
  }

  setRole(role: 'buyer' | 'seller' | 'admin'): void {
    if (this.isBrowser()) {
      localStorage.setItem('userRole', role);  // On sauvegarde uniquement si on est côté client
    }
    this.roleSubject.next(role);
  }

  getRole(): 'buyer' | 'seller' | 'admin' {
    return this.roleSubject.value;
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined'; // Vérifie si on est bien dans un navigateur
  }
}

