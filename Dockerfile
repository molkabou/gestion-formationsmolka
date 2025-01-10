# Étape 1 : Utiliser une image Node.js officielle
FROM node:14

# Étape 2 : Définir le répertoire de travail
WORKDIR /app

# Étape 3 : Copier les fichiers nécessaires
COPY package*.json ./

# Étape 4 : Installer les dépendances
RUN npm install

# Étape 5 : Copier tout le code de l'application
COPY . .

# Étape 6 : Exposer le port utilisé par l'application
EXPOSE 5000

# Étape 7 : Commande pour démarrer l'application
CMD ["node", "server.js"]
