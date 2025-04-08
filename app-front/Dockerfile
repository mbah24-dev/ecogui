# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Dockerfile                                         :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2025/04/08 16:03:25 by mbah              #+#    #+#              #
#    Updated: 2025/04/08 17:36:47 by mbah             ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

FROM node:22 AS build

# Répertoire de travail
WORKDIR /app

# Copie les fichiers package.json et package-lock.json
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie tout le code source
COPY . .

# Construit l'application Angular
RUN npm run build --prod

# Utilise un serveur Nginx pour servir l'application construite
FROM nginx:alpine

# Copie les fichiers construits dans le répertoire public de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expose le port 80 (par défaut pour Nginx)
EXPOSE 80

# Lance Nginx
CMD ["nginx", "-g", "daemon off;"]
