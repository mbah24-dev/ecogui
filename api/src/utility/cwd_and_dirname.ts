/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   cwd_and_dirname.ts                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/04/12 01:26:52 by mbah              #+#    #+#             */
/*   Updated: 2025/04/12 01:27:35 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

/**
 * @file cwd_and_dirname.ts
 * @brief Utilitaires pour gérer les chemins dans une application Node.js.
 */

/**
 * @function getProjectRoot
 * @brief Récupère le chemin absolu du dossier depuis lequel l'application a été lancée.
 * 
 * @details
 * Utilise `process.cwd()` pour obtenir le chemin racine du projet.
 * Cela permet de construire des chemins dynamiques, indépendamment du fichier courant.
 * 
 * @return {string} Chemin absolu vers le dossier de travail courant.
 * 
 * @example
 * const root = getProjectRoot();
 * const uploadsPath = path.join(root, 'static', 'upload', 'images');
 */
export function getProjectRoot(): string {
    return process.cwd();
}

/**
 * @function getCurrentFileDir
 * @brief Récupère le chemin absolu du dossier contenant le fichier courant.
 * 
 * @details
 * Utilise la variable globale `__dirname`, propre à chaque fichier.
 * Pratique pour accéder à des fichiers situés dans le même dossier que le script.
 * 
 * @return {string} Chemin absolu vers le dossier du fichier courant.
 * 
 * @example
 * const currentDir = getCurrentFileDir();
 * const templatePath = path.join(currentDir, 'templates', 'invoice.html');
 */
export function getCurrentFileDir(): string {
    return __dirname;
}
