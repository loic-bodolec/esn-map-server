# API de gestion des consultants regroupés par client d'une ESN

Cette API permet de gérer les consultants, regroupés par client, dans une application de cartographie. Elle fournit des fonctionnalités pour créer, lire, mettre à jour et supprimer des consultants et/ou clients accessibles pour des utilisateurs connectés (avec rôles : utilisateur simple ou administrateur).

## Installation

- Clonez ce dépôt.
- Configurez votre fichier .env en le complétant avec les infos du fichier .env.example (dont les identifiants du 1er utilisateur "admin" créé par défaut)
- Exécutez npm install pour installer les dépendances.
- Exécutez npm run start:dev pour démarrer le serveur.

## Tests

Exécutez npm test pour exécuter les tests unitaires.

## Migration (BDD)

Après avoir créé votre base de données (vide) sur postgreSQL, exécutez :

- npm run migration:create-dev

- npm run migration:generate-dev

- npm run migration:run-dev

### MPD

![MPD](/readme-images/mpd-bdd-20250130.png)

## Documentation de l'API (Swagger)

Exécutez npm run start:dev pour démarrer le serveur.

=> lien de la documentation : <http://localhost:5000/api-docs/>

## Infos pratiques

Pour tester l'API après s'ếtre connecté (via Postman, Insomnia, ThunderClient ou autre...), il faut récupérer le token et le mettre dans le Header :

![Connexion API](/readme-images/login.png)

![Token dans le header](/readme-images/getClient.png)

## Frontend Repository

Le dépôt du frontend est disponible à l'adresse suivante : [esn-map-client](https://github.com/loic-bodolec/esn-map-client)
