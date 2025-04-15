/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   toggle.service.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/04/14 17:20:00 by mbah              #+#    #+#             */
/*   Updated: 2025/04/14 17:20:10 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ToggleService {

    private isToggled = new BehaviorSubject<boolean>(false);

    get isToggled$() {
        return this.isToggled.asObservable();
    }

    toggle() {
        this.isToggled.next(!this.isToggled.value);
    }

    // Dark Mode
    private isDarkTheme = new BehaviorSubject<boolean>(false);

    constructor() {
        // Dark Mode: Only access localStorage in the browser
        if (this.isBrowser()) {
        const storedTheme = localStorage.getItem('isDarkTheme');
        this.isDarkTheme.next(storedTheme ? JSON.parse(storedTheme) : false);
        }
    }

    // Dark Mode
    toggleTheme() {
        const newTheme = !this.isDarkTheme.value;
        this.isDarkTheme.next(newTheme);

        if (this.isBrowser()) {
        localStorage.setItem('isDarkTheme', JSON.stringify(newTheme));
        }
    }

    isDark() {
        return this.isDarkTheme.value;
    }

    get isDarkTheme$() {
        return this.isDarkTheme.asObservable();
    }

    // Helper function to check if running in browser
    private isBrowser(): boolean {
        return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
    }

}
