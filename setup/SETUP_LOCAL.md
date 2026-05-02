# ☁️ Setup Local Cloud Server

Transformez votre atelier en système cloud avec serveur local et backups réseau.

## Architecture

```
┌─────────────────────────────────────────┐
│  App Frontend (index.html)              │
│  - Login cloud                          │
│  - Sync prestations/données             │
└──────────────┬──────────────────────────┘
               │
               ↓ API HTTP
┌──────────────────────────────────────────┐
│  Serveur Node.js local (port 5000)       │
│  - JWT authentication                    │
│  - REST API endpoints                    │
└──────────────┬───────────────────────────┘
               │
               ↓ SQL
┌──────────────────────────────────────────┐
│  Base de données PostgreSQL (ou SQLite)  │
│  - Users                                 │
│  - Prestations                           │
│  - Données cliniques                     │
└──────────────┬───────────────────────────┘
               │
         ┌─────┴─────┐
         ↓           ↓
    GitHub      Disque réseau
    (code)      (backups auto)
```

## Prérequis

- **Node.js 16+** → https://nodejs.org
- **PostgreSQL 12+** (OU SQLite intégré)
- **Disque réseau accessible** (NAS, serveur file, etc.)

## Installation (5 min)

### 1️⃣ Cloner le repository

```bash
git clone https://github.com/dmaret/outil_chiffrage_atelier_1er.git
cd outil_chiffrage_atelier_1er
```

### 2️⃣ Configurer le serveur

```bash
cd server

# Copier la config
cp .env.example .env

# Éditer .env (voir section ci-dessous)
nano .env  # ou ouvrir dans éditeur
```

**Configuration .env:**

```
# Pour SQLite (développement - zéro setup):
NODE_ENV=development
JWT_SECRET=votre_clé_secrète_complexe_ici

# Pour PostgreSQL (production):
DATABASE_URL=postgresql://user:password@localhost:5432/atelier_db
NODE_ENV=production
JWT_SECRET=votre_clé_secrète_complexe_ici
PORT=5000
FRONTEND_URL=http://localhost:3000
```

### 3️⃣ Installer les dépendances

```bash
npm install
```

### 4️⃣ Lancer le serveur

**Linux/macOS:**
```bash
chmod +x start.sh
./start.sh
```

**Windows:**
```cmd
start.bat
```

**Manuel:**
```bash
npm start
```

Le serveur démarre sur `http://localhost:5000` ✅

## Configuration PostgreSQL (Optionnel)

Si tu veux utiliser PostgreSQL au lieu de SQLite:

### macOS (Homebrew)
```bash
brew install postgresql
brew services start postgresql

# Créer la base
createdb atelier_db

# Importer le schéma
psql atelier_db < server/src/config/schema.sql
```

### Linux (Debian/Ubuntu)
```bash
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql

# Créer la base
sudo -u postgres createdb atelier_db
sudo -u postgres psql atelier_db < server/src/config/schema.sql
```

### Windows
- Télécharger PostgreSQL: https://www.postgresql.org/download/windows/
- Installer avec pgAdmin
- Créer base de données `atelier_db`
- Importer schema: `server/src/config/schema.sql`

## Backups vers Disque Réseau

### Configuration

1. **Monter ton disque réseau** (NAS, serveur files, etc.)

   **macOS:**
   ```bash
   open "smb://192.168.1.100/partage"  # ou ton adresse NAS
   # Puis glisser-déposer le dossier dans le Finder
   ```

   **Windows:**
   ```cmd
   net use Z: \\192.168.1.100\partage /persistent:yes
   ```

   **Linux:**
   ```bash
   sudo mount -t cifs //192.168.1.100/partage /mnt/backup -o username=user,password=pass
   ```

2. **Configurer backup automatique**

   Éditer `crontab` (macOS/Linux):
   ```bash
   crontab -e
   ```

   Ajouter (backup quotidien à 2h du matin):
   ```
   0 2 * * * cd /chemin/vers/atelier/server && ./backup.sh /Volumes/MonNAS/backups
   ```

   **Windows (Task Scheduler):**
   - Ouvrir Task Scheduler
   - Créer tâche planifiée
   - Commande: `C:\chemin\vers\server\backup.bat`
   - Planifier: Quotidien à 02:00

3. **Backup manuel**

   ```bash
   cd server
   ./backup.sh /Volumes/MonNAS/backups
   # Ou sur Windows:
   backup.bat Z:\backups
   ```

## Utilisation

### Démarrer l'app

1. **Lancer le serveur** (voir section ci-dessus)

2. **Ouvrir l'app** dans le navigateur
   ```
   http://localhost:3000  (ou l'IP de ta machine)
   ```

3. **Créer un compte cloud**
   - Cliquer "🔗 Se connecter au cloud"
   - "Créer un compte"
   - Email + mot de passe

4. **Synchroniser les données**
   - Les prestations se syncent automatiquement
   - Accessible depuis n'importe quel ordi du réseau

### Accéder depuis autre ordi

```
http://192.168.1.50:5000
  ↑ IP de la machine serveur
```

L'app se charge, tu cliques "Se connecter au cloud", tu entres ton email/password, et tu as accès à toutes tes données! 🎉

## Dépannage

### "Cannot find module"
```bash
npm install
```

### "Port 5000 already in use"
```bash
npm start -- --port 5001
# Ou changer PORT dans .env
```

### PostgreSQL "connection refused"
Vérifie que PostgreSQL est lancé:
```bash
# macOS
brew services list
# Linux
sudo systemctl status postgresql
```

### Disque réseau non accessible
Vérifier:
- ✓ Disque monté correctement
- ✓ Permissions d'accès
- ✓ Chemin correct dans backup.sh

## Sécurité

✅ **À faire:**
- Utiliser un mot de passe JWT **complexe** et **unique**
- Firewall: ouvrir port 5000 seulement sur réseau local
- Backups chiffrés sur disque réseau
- Mettre à jour Node.js régulièrement

❌ **À ÉVITER:**
- Exposer le port 5000 sur internet
- Partager JWT_SECRET
- Sauvegardes sans chiffrement
- SQLite en production (utiliser PostgreSQL)

## Production

Pour passer en production:

1. **Utiliser PostgreSQL** (au lieu de SQLite)
2. **Générer JWT_SECRET fort:**
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
3. **Activer HTTPS** (certificat auto-signé ou Let's Encrypt)
4. **Configurer firewall** (port 5000 sur réseau local uniquement)
5. **Backups chiffrés** (LUKS, BitLocker, etc.)

## Support

- Logs serveur: Voir console quand tu lances `npm start`
- Logs app: Ouvrir DevTools (F12) → Console
- Erreurs DB: Vérifier `atelier.db` ou logs PostgreSQL

## Commits & Push

Après chaque session importante:

```bash
git add -A
git commit -m "Description des changements"
git push origin main
```

Tes données sont:
- ✅ Sauvegardées sur disque réseau (backups réguliers)
- ✅ Versionées sur GitHub (code)
- ✅ Accessibles depuis tout le réseau (serveur local)
