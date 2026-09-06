#  La Bonne Salle au Bon Moment

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
git clone https://github.com/fannysaez/express-nodes-mongodb-cda.git
cd la-bonne-salle-au-bon-moment

# 2. Installer les dépendances
npm install
```

**Dépendances installées :**

```bash
# Production
npm install express mongoose cors dotenv joi

# Développement (types TypeScript)
npm install -D typescript @types/express @types/node @types/cors
```

---

##  Configuration `.env`

Créer un fichier `.env` à la racine du projet (ne **jamais** le committer) :

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/la-bonne-salle-au-bon-moment
```

> Un fichier `.env.exemple` est disponible dans le dépôt comme modèle.  
> Il contient les clés nécessaires sans les valeurs.

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

> **tsconfig.json** — configuration TypeScript utilisée :
> ```json
> {
>   "compilerOptions": {
>     "target": "esnext",
>     "module": "nodenext",
>     "allowImportingTsExtensions": true,
>     "verbatimModuleSyntax": true,
>     "noEmit": true,
>     "strict": true,
>     "skipLibCheck": true
>   }
> }
> ```
> ⚠️ Avec `module: nodenext`, les imports relatifs **doivent** utiliser l'extension `.ts`  
> ⚠️ Avec `verbatimModuleSyntax: true`, les imports de types doivent utiliser `import type`

---

##  Architecture du projet

Le projet suit une **architecture en couches** stricte :

```bash
Client "Postman / front-end"
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
# Lancer le shell MongoDB
mongosh

# Afficher les bases de données
show dbs

# Utiliser la base du projet
use la-bonne-salle-au-bon-moment

# Afficher les collections
show collections

# Afficher tous les documents d'une collection
db.roles.find()
db.users.find()
db.rooms.find()
db.reservations.find()

# Afficher un document formaté
db.roles.findOne().pretty()

# Supprimer tous les documents d'une collection
db.roles.deleteMany({})
```

### Modèles Mongoose (schémas)

Les modèles définissent la structure des documents MongoDB :

- **Role** → `{ role: String }`
- **Room** → `{ nom: String, capacite: Number, equipements: [String] }`
- **User** → `{ nom, prenom, email, motDePasse: String, role: ObjectId → Role }`
- **Reservation** → `{ user: ObjectId → User, room: ObjectId → Room, dateDebut: Date, dateFin: Date }`

> Les références entre documents utilisent `populate()` lors de la lecture  
> (ex: une réservation affiche les détails de l'utilisateur et de la salle)

---

##  Ressources & Endpoints

###  Rôles — `/api/roles`

| Méthode | URL | Action | Body requis |
|---|---|---|---|
| `GET` | `/api/roles` | Lister tous les rôles | — |
| `GET` | `/api/roles/:id` | Récupérer un rôle | — |
| `POST` | `/api/roles` | Créer un rôle | `{ "role": "string" }` |
| `PUT` | `/api/roles/:id` | Modifier un rôle | `{ "role": "string" }` |
| `DELETE` | `/api/roles/:id` | Supprimer un rôle | — |

###  Salles — `/api/rooms`

| Méthode | URL | Action | Body requis |
|---|---|---|---|
| `GET` | `/api/rooms` | Lister toutes les salles | — |
| `GET` | `/api/rooms/:id` | Récupérer une salle | — |
| `POST` | `/api/rooms` | Créer une salle | `{ "nom", "capacite", "equipements?" }` |
| `PUT` | `/api/rooms/:id` | Modifier une salle | Champs optionnels |
| `DELETE` | `/api/rooms/:id` | Supprimer une salle | — |

###  Utilisateurs — `/api/users`

| Méthode | URL | Action | Body requis |
|---|---|---|---|
| `GET` | `/api/users` | Lister tous les utilisateurs | — |
| `GET` | `/api/users/:id` | Récupérer un utilisateur | — |
| `POST` | `/api/users` | Créer un utilisateur | `{ "nom", "prenom", "email", "motDePasse", "role" }` |
| `PUT` | `/api/users/:id` | Modifier un utilisateur | Champs optionnels |
| `DELETE` | `/api/users/:id` | Supprimer un utilisateur | — |

> ⚠️ `role` doit être l'`_id` MongoDB d'un rôle existant

###  Réservations — `/api/reservations`

| Méthode | URL | Action | Body requis |
|---|---|---|---|
| `GET` | `/api/reservations` | Lister toutes les réservations | — |
| `GET` | `/api/reservations/:id` | Récupérer une réservation | — |
| `POST` | `/api/reservations` | Créer une réservation | `{ "user", "room", "dateDebut", "dateFin" }` |
| `PUT` | `/api/reservations/:id` | Modifier une réservation | Champs optionnels |
| `DELETE` | `/api/reservations/:id` | Supprimer une réservation | — |

> ⚠️ `user` et `room` doivent être des `_id` MongoDB valides  
> ⚠️ Les dates doivent être au format **ISO 8601** : `"2026-09-10T09:00:00.000Z"`

### Codes HTTP utilisés

| Code | Signification | Quand |
|---|---|---|
| `200` | OK | GET réussi |
| `201` | Created | POST réussi |
| `204` | No Content | DELETE réussi |
| `400` | Bad Request | Données invalides (JOI) |
| `404` | Not Found | Ressource ou route introuvable |
| `500` | Internal Server Error | Erreur serveur |

---

##  Tester avec Postman

### Ordre de création recommandé

> Certaines ressources dépendent d'autres — respecter cet ordre :

**Étape 1 — Créer un rôle** `POST /api/roles`
```json
{ "role": "Apprenante" }
```
→ Copier le `_id` retourné

**Étape 2 — Créer une salle** `POST /api/rooms`
```json
{
  "nom": "Salle A",
  "capacite": 20,
  "equipements": ["projecteur", "tableau blanc"]
}
```
→ Copier le `_id` retourné

**Étape 3 — Créer un utilisateur** `POST /api/users`
```json
{
  "nom": "Saez",
  "prenom": "Fanny",
  "email": "fanny@exemple.com",
  "motDePasse": "motdepasse123",
  "role": "<_id du rôle créé à l'étape 1>"
}
```
→ Copier le `_id` retourné

**Étape 4 — Créer une réservation** `POST /api/reservations`
```json
{
  "user": "<_id de l'utilisateur>",
  "room": "<_id de la salle>",
  "dateDebut": "2026-09-10T09:00:00.000Z",
  "dateFin": "2026-09-10T11:00:00.000Z"
}
```

---

##  Validation des données (JOI)

Toutes les routes `POST` et `PUT` sont protégées par une validation JOI.  
En cas de données invalides, l'API retourne une réponse `400` avec le détail des erreurs :

```json
{
  "message": "Données invalides",
  "details": [
    "\"nom\" is required",
    "\"email\" must be a valid email"
  ]
}
```

> `abortEarly: false` — toutes les erreurs sont retournées en une seule réponse

---

##  Git Flow

```bash
develop          ← branche principale de développement (défaut)
  │
  ├── feature/dto          ← DTOs des 4 ressources
  ├── feature/validation   ← JOI validators + middleware + routes
  └── feature/auth         ← JWT + bcrypt (à venir)
```

---

**Créer une feature :**

```bash
git checkout -b feature/ma-feature
# ... travailler ...
git add .
git commit -m "feat: description de ce qui a été fait"
git checkout develop
git merge feature/ma-feature
git branch -d feature/ma-feature
```

---

##  Prochaines étapes

- [ ] `feature/auth` — Authentification JWT avec bcrypt
- [ ] `POST /api/auth/login` — Retourne un token JWT
- [ ] Middleware `authMiddleware` — Protège les routes sensibles
- [ ] Rate limiting avec `express-rate-limit`

---

*Mise à jour le 06 Septembre 2026*