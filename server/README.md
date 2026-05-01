# Backend Cloud - Outil de Chiffrage de l'Atelier

Backend Node.js/Express pour synchroniser les données sur un serveur cloud centralisé.

## Installation

### 1. Prérequis
- Node.js 16+
- PostgreSQL 12+

### 2. Configuration locale

```bash
# Copier le fichier d'exemple
cp .env.example .env

# Éditer .env avec vos paramètres:
# DATABASE_URL=postgresql://user:password@localhost:5432/atelier_db
# JWT_SECRET=votre_secret_complexe
# PORT=5000
```

### 3. Base de données

```bash
# Créer la base de données
createdb atelier_db

# Initialiser le schéma
psql atelier_db < src/config/schema.sql
```

### 4. Installation des dépendances et lancement

```bash
npm install
npm run dev
```

Le serveur démarre sur `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Créer un compte
- `POST /api/auth/login` - Se connecter

### Data
- `GET /api/data/prestations` - Récupérer les devis
- `POST /api/data/prestations` - Créer un devis
- `PUT /api/data/prestations/:id` - Modifier un devis
- `DELETE /api/data/prestations/:id` - Supprimer un devis
- `GET /api/data/clinical` - Récupérer les dossiers cliniques
- `POST /api/data/clinical` - Sauvegarder un dossier clinique
- `GET /api/data/documents` - Récupérer les documents
- `POST /api/data/documents` - Uploader un document
- `DELETE /api/data/documents/:id` - Supprimer un document

## Déploiement

### Railway (gratuit pour démarrer)
1. Push le repo sur GitHub
2. Connecte-toi à https://railway.app
3. Crée un nouveau projet depuis GitHub
4. Ajoute une base PostgreSQL
5. Configure les variables d'environnement
6. Deploy!

### Render
Similaire à Railway, plus simple pour commencer.

## Architecture

```
server/
├── src/
│   ├── index.js          # Point d'entrée
│   ├── config/
│   │   ├── database.js   # Config PostgreSQL
│   │   └── schema.sql    # Schéma DB
│   ├── middleware/
│   │   └── auth.js       # Middleware JWT
│   ├── controllers/
│   │   ├── authController.js  # Logic auth
│   │   └── dataController.js  # Logic données
│   └── routes/
│       ├── auth.js       # Routes auth
│       └── data.js       # Routes données
├── package.json
└── .env.example
```

## Sécurité

- ✓ Passwords hashées avec bcrypt
- ✓ JWT tokens avec expiration 7j
- ✓ CORS configuré
- ✓ Données isolées par utilisateur
- ✓ Support HTTPS en production

## Prochaines étapes

- [ ] Intégrer le frontend (index.html)
- [ ] Tests unitaires
- [ ] Logs et monitoring
- [ ] Rate limiting
- [ ] Backup automatique
