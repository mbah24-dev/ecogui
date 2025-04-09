# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Dockerfile                                         :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2025/04/08 15:59:36 by mbah              #+#    #+#              #
#    Updated: 2025/04/08 17:58:19 by mbah             ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

# api/Dockerfile
FROM node:18

# Set work directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Build the app (compile TypeScript to JavaScript)
RUN npm run build

# Start the app
CMD ["npm", "run", "start:prod"]


