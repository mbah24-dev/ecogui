/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   image-select-validator.ts                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/05/05 21:19:22 by mbah              #+#    #+#             */
/*   Updated: 2025/05/06 00:52:05 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { ValidatorFn, ValidationErrors, AbstractControl } from "@angular/forms";

export function imagesValidator(selectedFiles: File[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const totalFiles = selectedFiles.length + (control.value?.length || 0);
      return totalFiles >= 2 ? null : { minImages: { value: control.value } };
    }
}
