
import { Pipe, PipeTransform } from '@angular/core';

/**
 * Le pipe `GnfFormatPipe` permet de formater un nombre en une chaîne de caractères,
 * avec une mise en forme spécifique pour la Guinée (fr-GN), suivie du symbole de la devise.
 * Il est utilisé pour afficher des montants financiers dans le format approprié.
 *
 * @example
 * {{ product.price | gnfFormat }}
 */
@Pipe({
  name: 'gnfFormat'
})
export class GnfFormatPipe implements PipeTransform {

  /**
   * Transforme une valeur numérique en chaîne formatée avec le symbole de la devise.
   *
   * @param value La valeur numérique à formater.
   * @param currencySymbol Le symbole de la devise, par défaut 'GNF'.
   * @returns La valeur formatée sous forme de chaîne avec le symbole de la devise.
   */
  transform(value: number, currencySymbol: string = 'GNF'): string {
    if (!value && value !== 0) return `0 ${currencySymbol}`;
    let formattedValue = value.toLocaleString('fr-GN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
    return `${formattedValue} ${currencySymbol}`;
  }
}
