/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   enum-validator.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/04/30 01:43:27 by mbah              #+#    #+#             */
/*   Updated: 2025/04/30 01:43:29 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

// validators/enum-validator.ts

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function enumValidator(enumObj: object): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const values = Object.values(enumObj);
    if (value && !values.includes(value)) {
      return { invalidEnum: { value } };
    }
    return null;
  };
}
