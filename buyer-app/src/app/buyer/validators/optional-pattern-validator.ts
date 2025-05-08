/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   optional-pattern-validator.ts                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/04/30 01:56:22 by mbah              #+#    #+#             */
/*   Updated: 2025/04/30 01:56:29 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Validators, ValidatorFn, AbstractControl } from '@angular/forms';

export function optionalPatternValidator(pattern: RegExp): ValidatorFn {
  return (control: AbstractControl) => {
    const value = control.value;
    if (!value || value.trim() === '') {
      return null; // champ vide autorisé
    }
    return pattern.test(value) ? null : { invalidPattern: true };
  };
}
