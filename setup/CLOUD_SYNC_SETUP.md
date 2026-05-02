# ☁️ Cloud Synchronization Setup Guide

Transformez l'application en vrai SaaS cloud avec données centralisées.

## Architecture

```
┌─────────────────┐
│  Frontend       │ (index.html - navigateur)
│  (index.html)   │ ← Appels API HTTP/REST
└────────┬────────┘
         │
         │ API Calls
         ↓
┌─────────────────┐
│  Backend        │ (Node.js/Express)
│  (server/)      │
├─────────────────┤
│ Routes:         │
│ /api/auth       │ (login/register)
│ /api/data       │ (CRUD données)
└────────┬────────┘
         │
         │ SQL Queries
         ↓
┌─────────────────┐
│  Database       │ (PostgreSQL)
│  (Cloud)        │
└─────────────────┘
```

## Avantages

✅ Données centralisées sur serveur
✅ Accessible de n'importe quel ordi/téléphone
✅ Synchronisation temps réel
✅ Multi-utilisateurs natif
✅ Meilleure sécurité (auth, audit trail)
✅ Backups automatiques
✅ Scalable (plus d'utilisateurs = plus facile)

## Phase 1: Setup local (aujourd'hui)

### Étape 1: Installer PostgreSQL
```bash
# macOS
brew install postgresql
brew services start postgresql

# Linux
sudo apt-get install postgresql
sudo systemctl start postgresql

# Windows
# Télécharger PostgreSQL depuis postgresql.org
```

### Étape 2: Setup base de données
```bash
cd server
cp .env.example .env
# Éditer .env avec votre DATABASE_URL

createdb atelier_db
psql atelier_db < src/config/schema.sql
```

### Étape 3: Démarrer le serveur
```bash
npm install
npm run dev
# Serveur sur http://localhost:5000
```

### Étape 4: Tester l'API
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Testeur"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## Phase 2: Intégrer le Frontend (prochaine étape)

### Modifications à faire dans index.html:

1. **Ajouter API client au démarrage:**
```javascript
// Au top du <script> principal
const API_BASE_URL = 'http://localhost:5000/api';
let authToken = localStorage.getItem('authToken');

function setAuthToken(token) {
  authToken = token;
  localStorage.setItem('authToken', token);
}

function apiCall(method, endpoint, data = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    }
  };
  if (data) options.body = JSON.stringify(data);
  
  return fetch(`${API_BASE_URL}${endpoint}`, options)
    .then(res => res.json())
    .catch(err => ({ error: 'Network error' }));
}
```

2. **Remplacer localStorage par API pour les prestations:**
```javascript
// Ancien code (à remplacer):
// prestationsSauvegardees = JSON.parse(localStorage.getItem('prestationsSauvegardees') || '[]')

// Nouveau code:
async function loadPrestations() {
  const data = await apiCall('GET', '/data/prestations');
  if (!data.error) prestationsSauvegardees = data;
}

async function savePrestations() {
  for (let p of prestationsSauvegardees) {
    if (!p.id) {
      await apiCall('POST', '/data/prestations', p);
    } else {
      await apiCall('PUT', `/data/prestations/${p.id}`, p);
    }
  }
}
```

3. **Modifier les login/logout:**
```javascript
// Login - au lieu de vérifier en local, appeler API
async function handleLogin(email, password) {
  const result = await apiCall('POST', '/auth/login', { email, password });
  if (result.token) {
    setAuthToken(result.token);
    await loadPrestations();  // Charger les données
    showMainApp();
  } else {
    showError('Identifiants invalides');
  }
}

// Register - créer un compte
async function handleRegister(email, password, name) {
  const result = await apiCall('POST', '/auth/register', { email, password, name });
  if (result.token) {
    setAuthToken(result.token);
    showMainApp();
  }
}

// Logout
function handleLogout() {
  authToken = null;
  localStorage.removeItem('authToken');
  showLoginScreen();
}
```

## Phase 3: Déployer sur le cloud (jour 4)

### Option Railway (recommandée)

1. Push sur GitHub
```bash
git add -A
git commit -m "Add cloud backend"
git push origin main
```

2. Sur railway.app:
   - Connecte-toi avec GitHub
   - Crée projet → Select Repository
   - Ajoute PostgreSQL plugin
   - Configure env vars:
     - `JWT_SECRET=your_secret`
     - `FRONTEND_URL=https://votre-domaine.com`
   - Deploy!

3. Récupère l'URL du serveur (ex: `https://api.railway.app`)

4. Mets à jour le frontend:
```javascript
const API_BASE_URL = 'https://api.railway.app/api';  // Au lieu de localhost
```

### Alternative: Render.com
Même processus, interface un peu plus simple.

## Phase 4: Données accessibles partout

Après déploiement:
```
Ordi 1 → Login → Récupère données depuis cloud
Ordi 2 → Login → Même données
Téléphone → Ouvre URL → Login → Même données

Tous les changements sync automatiquement!
```

## Checklist

- [ ] PostgreSQL installé localement
- [ ] Base de données créée
- [ ] Serveur démarre sans erreurs
- [ ] API endpoints testés avec curl
- [ ] Frontend intégré (appels API au lieu de localStorage)
- [ ] Login/register fonctionne
- [ ] Prestations sync sur serveur
- [ ] Documents sync sur serveur
- [ ] Données cliniques sync
- [ ] Déployé sur Railway/Render
- [ ] Frontend pointe sur serveur cloud
- [ ] Testé depuis 2 ordi différents

## Avantages de cette approche

| Aspect | Avant (GitHub) | Après (Cloud) |
|--------|---|---|
| **Où sont les données?** | Local IndexedDB sur chaque ordi | Serveur cloud centralisé |
| **Accès depuis autre ordi?** | Faut cloner le repo, charger depuis IndexedDB local | URL directe, login, c'est tout |
| **Multi-utilisateurs?** | Zéro | Natif, chacun a son compte |
| **Backup?** | Manuel, sur GitHub | Automatique tous les jours |
| **Sécurité données?** | Client-side seulement | Serveur + auth + logs |
| **Conformité RGPD?** | Non | Oui |

## Coûts

- **PostgreSQL local**: Gratuit
- **Railway**: Gratuit tier (suffit pour commencer), $5-20/mois après
- **Render**: Gratuit tier, $7+/mois après
- **Domaine custom**: ~$10/an

**Total année 1**: ~$130 (très économique pour une vraie app cloud)

## Support & Help

- API docs: Voir `server/README.md`
- Questions DB: PostgreSQL docs
- Déploiement: Railway docs
