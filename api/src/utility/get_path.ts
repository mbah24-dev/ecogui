/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   get_path.ts                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/04/12 01:03:45 by mbah              #+#    #+#             */
/*   Updated: 2025/04/12 01:33:31 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import * as path from 'path';
import * as fs from 'fs';
import { getProjectRoot } from './cwd_and_dirname';

/**
 * Construit un chemin absolu vers le dossier dans "static/upload" et le crée si nécessaire.
 * @param {...string[]} subdirs - Un ou plusieurs sous-dossiers, ex: 'images', 'products'
 * @returns {string} Chemin absolu vers le dossier
 */
export function get_upload_path(...subdirs: string[]): string {
  const basePath = path.join(getProjectRoot(), 'static', 'upload');
  const fullPath = path.join(basePath, ...subdirs);

  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }

  return (fullPath);
}
