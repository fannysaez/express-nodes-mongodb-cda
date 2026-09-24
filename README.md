#  La Bonne Salle au Bon Moment — Back-end

> API REST back-end pour la gestion de réservations de salles.  
> Construite avec **Node.js · Express · TypeScript · MongoDB · Mongoose**

---

## Structure des dossiers :

```bash
src/
├── config/
│   └── mongo.database.ts         ← connexion MongoDB
├── controllers/                  ← reçoit les requêtes HTTP
├── dto/                          ← interfaces TypeScript "données entrantes"
├── middlewares/
│   └── validate.middleware.ts    ← validation JOI générique
├── models/                       ← schémas Mongoose
├── repositories/                 ← accès base de données
├── routes/                       ← définition des URLs
├── services/                     ← logique métier
├── validators/                   ← schémas JOI par ressource
├── swagger.ts                    ← configuration Swagger
└── app.ts                        ← point d'entrée
```

---

##  Table des matières

- [Description](#-description)
- [Technologies utilisées](#-technologies-utilisées)
- [Prérequis](#-prérequis)
- [Installation](#-installation)
- [Configuration](#-configuration-env)
- [Lancer le serveur](#-lancer-le-serveur)
- [Architecture du projet](#-architecture-du-projet)
- [Base de données NoSQL — MongoDB](#-base-de-données-nosql--mongodb)
- [Ressources & Endpoints](#-ressources--endpoints)
- [Logique métier — Anti double-réservation](#-logique-métier--anti-double-réservation)
- [Documentation Swagger](#-documentation-swagger)
- [Connexion front-end ↔ back-end](#-connexion-front-end--back-end)
- [Tester avec Postman](#-tester-avec-postman)
- [Validation des données](#-validation-des-données-joi)
- [Git Flow](#-git-flow)

---

##  Description

**La Bonne Salle au Bon Moment** est une API REST qui permet de gérer des réservations de salles pour une organisation. Elle expose des endpoints CRUD pour quatre ressources :

-  **Rôles** — les rôles attribuables aux utilisateurs
-  **Utilisateurs** — les membres de l'organisation
-  **Salles** — les salles disponibles à la réservation
-  **Réservations** — les créneaux réservés par les utilisateurs

L'API suit les principes **REST** : URLs en noms au pluriel, méthodes HTTP pour les actions, réponses en JSON.

---

##  Technologies utilisées

| Technologie | Rôle |
|---|---|
| **Node.js** | Environnement d'exécution JavaScript côté serveur |
| **Express** | Framework web pour créer le serveur et les routes HTTP |
| **TypeScript** | Typage statique — détecte les erreurs avant l'exécution |
| **MongoDB** | Base de données NoSQL orientée documents (BSON/JSON) |
| **Mongoose** | ODM — modélise les données MongoDB avec des schémas TypeScript |
| **MongoDB Compass** | Interface graphique pour visualiser et gérer la base de données |
| **mongosh** | Shell MongoDB en ligne de commande |
| **JOI** | Validation des données entrantes (body des requêtes) |
| **CORS** | Middleware pour autoriser les requêtes cross-origin (front-end) |
| **dotenv** | Chargement des variables d'environnement depuis `.env` |
| **Swagger UI** | Documentation interactive de l'API (`/api-docs`) |
| **swagger-jsdoc** | Génère la spec OpenAPI depuis les commentaires JSDoc |

---

##  Prérequis

Avant de commencer, s'assurer d'avoir installé :

- [Node.js](https://nodejs.org/) (v18 ou supérieur)
- [MongoDB](https://www.mongodb.com/try/download/community) (local) ou une instance MongoDB Atlas
- [MongoDB Compass](https://www.mongodb.com/try/download/compass) *(optionnel — interface graphique)*

---

##  Installation

```bash
# 1. Cloner le dépôt
git clone https://github.com/fannysaez/la-bonne-salle-au-bon-moment-backend-cda.git
cd la-bonne-salle-au-bon-moment-backend-cda

# 2. Installer les dépendances
npm install
```

**Dépendances installées :**

```bash
# Production
npm install express mongoose cors dotenv joi swagger-ui-express swagger-jsdoc

# Développement (types TypeScript)
npm install -D typescript @types/express @types/node @types/cors @types/swagger-ui-express @types/swagger-jsdoc
```

---

##  Configuration `.env`

Créer un fichier `.env` à la racine du projet (ne **jamais** le committer) :

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/la-bonne-salle-au-bon-moment
```

> Un fichier `.env.exemple` est disponible dans le dépôt comme modèle.

```env
# .env.exemple
PORT=
MONGO_URI=
JWT_SECRET=
```

---

##  Lancer le serveur

```bash
npm start
```

Le serveur démarre sur `http://localhost:3000`  
Connecté à MongoDB via le `MONGO_URI` défini dans `.env`

---

##  Architecture du projet

Le projet suit une **architecture en couches** stricte :

```
Client (Postman / front-end)
        │
        ▼
    Router          ← définit les URLs et applique les middlewares
        │
        ▼
  Middleware        ← validate() — valide le body avec JOI
        │
        ▼
  Controller        ← reçoit req/res, appelle le service
        │
        ▼
   Service          ← logique métier, appelle le repository
        │
        ▼
 Repository         ← accès MongoDB via Mongoose
        │
        ▼
   MongoDB          ← base de données NoSQL
```

---

##  Base de données NoSQL — MongoDB

### Pourquoi NoSQL ?

MongoDB est une base de données **orientée documents**. Contrairement au SQL (tables, lignes, colonnes), MongoDB stocke les données sous forme de **documents JSON** (BSON en interne).

| SQL | MongoDB |
|---|---|
| Base de données | Base de données |
| Table | Collection |
| Ligne | Document |
| Colonne | Champ |
| Clé primaire | `_id` |
| Jointure | `populate()` / Référence |

### Collections du projet

| Collection | Description |
|---|---|
| `roles` | Les rôles attribuables |
| `users` | Les utilisateurs (référencent un rôle) |
| `rooms` | Les salles disponibles |
| `reservations` | Les réservations (référencent un user + une room) |

### Commandes mongosh utiles

```bash
mongosh
show dbs
use la-bonne-salle-au-bon-moment
show collections
db.roles.find()
db.users.find()
db.rooms.find()
db.reservations.find()
db.roles.deleteMany({})
```

### Modèles Mongoose (schémas)

- **Role** → `{ label: String }`
- **Room** → `{ name: String, capacity: Number }`
- **User** → `{ lastname, firstname, email, password: String, roleId: ObjectId → Role }`
- **Reservation** → `{ userId: ObjectId → User, roomId: ObjectId → Room, startDate: Date, endDate: Date }`

---

##  Ressources & Endpoints

###  Rôles — `/api/roles`

| Méthode | URL | Action | Body requis |
|---|---|---|---|
| `GET` | `/api/roles` | Lister tous les rôles | — |
| `GET` | `/api/roles/:id` | Récupérer un rôle | — |
| `POST` | `/api/roles` | Créer un rôle | `{ "label": "string" }` |
| `PUT` | `/api/roles/:id` | Modifier un rôle (complet) | `{ "label": "string" }` |
| `PATCH` | `/api/roles/:id` | Modifier un rôle (partiel) | Champs optionnels |
| `DELETE` | `/api/roles/:id` | Supprimer un rôle | — |

###  Salles — `/api/rooms`

| Méthode | URL | Action | Body requis |
|---|---|---|---|
| `GET` | `/api/rooms` | Lister toutes les salles | — |
| `GET` | `/api/rooms/:id` | Récupérer une salle | — |
| `POST` | `/api/rooms` | Créer une salle | `{ "name", "capacity" }` |
| `PUT` | `/api/rooms/:id` | Modifier une salle (complet) | `{ "name", "capacity" }` |
| `PATCH` | `/api/rooms/:id` | Modifier une salle (partiel) | Champs optionnels |
| `DELETE` | `/api/rooms/:id` | Supprimer une salle | — |

###  Utilisateurs — `/api/users`

| Méthode | URL | Action | Body requis |
|---|---|---|---|
| `GET` | `/api/users` | Lister tous les utilisateurs | — |
| `GET` | `/api/users/:id` | Récupérer un utilisateur | — |
| `POST` | `/api/users` | Créer un utilisateur | `{ "lastname", "firstname", "email", "password", "roleId" }` |
| `PUT` | `/api/users/:id` | Modifier un utilisateur (complet) | Tous les champs |
| `PATCH` | `/api/users/:id` | Modifier un utilisateur (partiel) | Champs optionnels |
| `DELETE` | `/api/users/:id` | Supprimer un utilisateur | — |

###  Réservations — `/api/reservations`

| Méthode | URL | Action | Body requis |
|---|---|---|---|
| `GET` | `/api/reservations` | Lister toutes les réservations | — |
| `GET` | `/api/reservations/:id` | Récupérer une réservation | — |
| `POST` | `/api/reservations` | Créer une réservation | `{ "userId", "roomId", "startDate", "endDate" }` |
| `PUT` | `/api/reservations/:id` | Modifier une réservation (complet) | Tous les champs |
| `PATCH` | `/api/reservations/:id` | Modifier une réservation (partiel) | Champs optionnels |
| `DELETE` | `/api/reservations/:id` | Supprimer une réservation | — |

> ⚠️ Les dates doivent être au format **ISO 8601** : `"2026-09-10T09:00:00.000Z"`

### Codes HTTP utilisés

| Code | Signification | Quand |
|---|---|---|
| `200` | OK | GET / PUT / PATCH réussi |
| `201` | Created | POST réussi |
| `204` | No Content | DELETE réussi |
| `400` | Bad Request | Données invalides (JOI) |
| `404` | Not Found | Ressource introuvable |
| `409` | Conflict | Créneau déjà réservé |
| `500` | Internal Server Error | Erreur serveur |

---

##  Logique métier — Anti double-réservation

Lors d'un `POST` ou `PUT` sur `/api/reservations`, l'API vérifie automatiquement si la salle est déjà réservée sur le créneau demandé.

Si un conflit est détecté → réponse `409 Conflict` :

```json
{ "message": "Cette salle est déjà réservée sur ce créneau" }
```

---

##  Documentation Swagger

Une documentation interactive est disponible sur :

```
http://localhost:3000/api-docs
```

Elle liste toutes les routes et permet de les tester directement depuis le navigateur.  
Générée automatiquement depuis les commentaires JSDoc dans `src/routes/*.ts`.

---

##  Connexion front-end ↔ back-end

🔗 Repo front-end : [la-bonne-salle-au-bon-moment-frontend-cda](https://github.com/fannysaez/la-bonne-salle-au-bon-moment-frontend-cda)

Le front-end React ne se connecte **jamais directement à MongoDB**.  
Il communique uniquement avec l'API back-end via des requêtes HTTP :

```
React (localhost:5173)
        │
        │  fetch('/api/rooms')  ← requête HTTP
        ▼
Express (localhost:3000)        ← traite la requête
        │
        │  Mongoose             ← accès base de données
        ▼
MongoDB                         ← stockage des données
```

Le CORS est configuré pour autoriser les requêtes depuis `http://localhost:5173`.

---

##  Tester avec Postman

### Ordre de création recommandé

**Étape 1 — Créer un rôle** `POST /api/roles`
```json
{ "label": "Apprenant" }
```

**Étape 2 — Créer une salle** `POST /api/rooms`
```json
{ "name": "Salle A", "capacity": 20 }
```

**Étape 3 — Créer un utilisateur** `POST /api/users`
```json
{
  "lastname": "Saez",
  "firstname": "Fanny",
  "email": "fanny@exemple.com",
  "password": "1234",
  "roleId": "<_id du rôle>"
}
```

**Étape 4 — Créer une réservation** `POST /api/reservations`
```json
{
  "userId": "<_id de l'utilisateur>",
  "roomId": "<_id de la salle>",
  "startDate": "2026-09-10T09:00:00.000Z",
  "endDate": "2026-09-10T11:00:00.000Z"
}
```

---

##  Validation des données (JOI)

Toutes les routes `POST` et `PUT` sont protégées par une validation JOI.  
En cas de données invalides → réponse `400` :

```json
{
  "message": "Données invalides",
  "details": ["\"name\" is required"]
}
```

---

##  Git Flow

```
develop          ← branche principale de développement
  ├── feature/dto
  ├── feature/validation
  ├── feature/patch
  ├── feature/swagger
  └── feature/auth  ← à venir
```

---

##  Prochaines étapes

- [ ] `feature/auth` — Authentification avec bcrypt + JWT
- [ ] `POST /api/auth/login` — Retourne un token JWT
- [ ] Middleware `authMiddleware` — Protège les routes sensibles

---

*Mise à jour le 24 Septembre 2026*