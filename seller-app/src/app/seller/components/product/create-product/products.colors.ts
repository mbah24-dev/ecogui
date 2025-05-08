/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   products.colors.ts                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/05/05 16:48:18 by mbah              #+#    #+#             */
/*   Updated: 2025/05/05 16:52:54 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

export interface ColorOption {
    name: string;
    code: string | null;
    variants: string[];
}

export const allColors: ColorOption[] = [
    { name: 'Noir', code: '#000000', variants: ['Noir profond', 'Noir mat'] },
    { name: 'Blanc', code: '#FFFFFF', variants: ['Blanc cassé', 'Blanc neige', 'Blanc ivoire'] },
    { name: 'Rouge', code: '#FF0000', variants: ['Rouge vif', 'Rouge bordeaux', 'Rouge cerise'] },
    { name: 'Vert', code: '#008000', variants: ['Vert forêt', 'Vert menthe', 'Vert émeraude'] },
    { name: 'Bleu', code: '#0000FF', variants: ['Bleu marine', 'Bleu ciel', 'Bleu roi'] },
    { name: 'Gris', code: '#808080', variants: ['Gris clair', 'Gris anthracite', 'Gris perle'] },
    { name: 'Marron', code: '#A52A2A', variants: ['Marron clair', 'Chocolat', 'Café'] },
    { name: 'Jaune', code: '#FFFF00', variants: ['Jaune moutarde', 'Or', 'Jaune pâle'] },
    { name: 'Orange', code: '#FFA500', variants: ['Corail', 'Abricot', 'Orange brûlé'] },
    { name: 'Rose', code: '#FFC0CB', variants: ['Rose poudré', 'Fuchsia', 'Rose bonbon'] },
    { name: 'Violet', code: '#800080', variants: ['Lavande', 'Mauve', 'Violet profond'] },
    { name: 'Argent', code: '#C0C0C0', variants: ['Métallisé', 'Argenté brillant'] },
    { name: 'Or', code: '#FFD700', variants: ['Or rose', 'Or vieux'] },
    { name: 'Beige', code: '#F5F5DC', variants: ['Beige clair', 'Beige sable', 'Taupe'] },
    { name: 'Turquoise', code: '#40E0D0', variants: ['Turquoise clair', 'Turquoise foncé'] },
    { name: 'Bordeaux', code: '#800020', variants: ['Bordeaux foncé', 'Vin rouge'] },
    { name: 'Kaki', code: '#996B1F', variants: ['Kaki clair', 'Kaki militaire'] },
    { name: 'Multicolore', code: null, variants: ['Arc-en-ciel', 'Couleurs variées'] },
    { name: 'Transparent', code: null, variants: [] },
    { name: 'Métallisé', code: null, variants: ['Effet métal'] },
    { name: 'Normal', code: null, variants: [] }
];
