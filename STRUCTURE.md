# 📁 Structure du Projet - Outil Complet Atelier

## Vue d'ensemble

```
outil_chiffrage_atelier_1er/
├── 📄 index.html                 # Application SPA principale (2.2 MB)
├── 📄 README.md                  # Documentation complète
├── 📄 STRUCTURE.md               # Ce fichier - organisation du projet
├── 📄 CHANGELOG.md               # Historique des versions
├── 📄 CONTRIBUTING.md            # Guide de contribution
│
├── 📁 .github/                   # Configuration GitHub
│   ├── workflows/                # Actions CI/CD
│   └── ...
│
├── 📁 docs/                      # Documentation statique
│   ├── README.md                 # Guide utilisateur
│   ├── FEATURES.md               # Liste des fonctionnalités
│   ├── API.md                    # Documentation API interne
│   └── TROUBLESHOOTING.md        # Dépannage
│
├── 📁 data/                      # Données et fixtures
│   ├── sample-data.json          # Données d'exemple pour tests
│   └── ...
│
├── 📁 logistique_cea_1er/        # Sous-module de gestion logistique
│   ├── index.html                # Application logistique
│   ├── README.md                 # Documentation du module
│   └── ...
│
├── 📁 server/                    # Configuration serveur
│   ├── README.md                 # Guide serveur
│   ├── config.js                 # Configuration Node.js
│   └── ...
│
├── 📁 setup/                     # Scripts de configuration
│   ├── install.sh                # Installation initiale
│   ├── init-db.js                # Initialisation base de données
│   └── README.md                 # Guide setup
│
├── 📁 audits/                    # Audits et rapports
│   ├── audit-2026-04.md          # Audit avril 2026
│   └── performance.json          # Métriques de performance
│
├── 📁 documents/                 # Documents clients/internes
│   ├── LICENCE.pdf               # Licence d'utilisation
│   └── ...
│
├── 📁 releases/                  # Notes de version
│   ├── v2.26.md                  # Notes version 2.26
│   └── ...
│
├── 📁 src/                       # Code source organisé
│   ├── README.md                 # Documentation code
│   ├── components/               # Composants réutilisables
│   ├── utils/                    # Utilitaires
│   ├── styles/                   # Stylesheets
│   └── ...
│
├── 📄 manifest.json              # Web app manifest
├── 📄 sw.js                      # Service Worker (PWA)
├── 📄 LICENSE                    # Licence du projet
├── 📄 .gitignore                 # Fichiers ignorés par Git
└── 📄 _config.yml                # Configuration GitHub Pages
```

---

## 🎯 Modules Principaux

### 1. **Application Principale** (`index.html`)
- **Taille**: 2.2 MB (compilée)
- **Type**: Single Page Application (SPA)
- **Framework**: Vanilla JavaScript + HTML5 + CSS3
- **Stockage**: LocalStorage + IndexedDB

#### Onglets disponibles:
- 🏠 **Dashboard** - KPIs et alertes
- 🧙 **Assistant** - Guide pas à pas
- 💼 **Calculateur** - Chiffrage prestations
- 📦 **Gestion Stock** - Valorisation FIFO
- ⚙️ **Paramétrage** - Configuration
- 📚 **Gestes** - Catalogue chronométré
- 🛒 **Consommables** - Articles
- 📊 **Prestations** - Devis/Factures
- 👥 **Clients** - Fiches clients
- 📈 **Stats** - Rentabilité
- ⚙️ **Config** - Paramètres avancés
- 🖐️ **Calculateur Visuel** - Flux canvas
- 📅 **Planification** - Gantt
- 📋 **Procédures** - Workflows
- 🎓 **Formation Admin** - Apprentissage
- 🏭 **Formation Logistique** - CEA
- 🧠 **Accompagnement** - Jalons
- 📖 **Guide** - Documentation

### 2. **Logistique CEA** (`logistique_cea_1er/`)
- Gestion des mouvements de stock
- Palette transfers FIFO
- Suivi entrée/sortie
- Intégration avec le calculateur

### 3. **Infrastructure** (`server/`)
- Serveur Node.js (optionnel)
- Configuration webhooks
- API REST endpoints
- Authentification

---

## 💾 Données et Persistance

### LocalStorage (Navigateur)
```
Local Storage Structure:
├── 'gestes'                    # Catalogue des gestes
├── 'consommables'              # Articles stockés
├── 'prestations'               # Devis/factures
├── 'clients'                   # Fiches clients
├── 'config'                    # Paramètres application
├── 'sectionOrder'              # Ordre des onglets (drag-drop)
├── 'CEA_formations'            # Formations attribuées
└── ...
```

### IndexedDB (Pour gros volumes)
```
IndexedDB Stores:
├── 'referenceDocuments'        # Documents importés
├── 'mediaFiles'                # Images/Vidéos
└── ...
```

---

## 🔧 Configuration et Modes

### Modes d'Affichage
- **Mode Client** - Coûts internes masqués
- **Mode Atelier** - Vue complète interne
- **Mode Admin** - Drag-drop onglets + configuration

### Authentification
- **PIN** - Accès protégé simple
- **Groupe** - Multi-utilisateurs (groupe de travail)
- **Cloud** - Sync cloud (Phase 2)

---

## 📦 Dépendances Externes

### Intégrées (CDN)
- **Chart.js** 3.x - Graphiques
- **Roboto Font** - Typographie
- **Material Icons** - Icônes

### Service Worker
- Cache First strategy pour assets
- Offline support (PWA)

---

## 🚀 Démarrage Rapide

### Développement local
```bash
# Cloner le repo
git clone https://github.com/dmaret/outil_chiffrage_atelier_1er.git
cd outil_chiffrage_atelier_1er

# Lancer serveur local (Python)
python -m http.server 8000

# Ou avec Node.js
npx http-server

# Accéder
http://localhost:8000
```

### Production
- Hébergé sur GitHub Pages
- Build statique (aucune compilation requise)
- Accès direct via HTTPS

---

## 🔄 Workflow de Contribution

1. **Branch feature** → `claude/feature-name`
2. **Pull Request** vers `main`
3. **Tests et revue** avant merge
4. **Commit message** auto-generated avec Claude
5. **Tags de version** pour releases

---

## 📊 Métriques Clés

- **Taille app**: 2.2 MB (HTML+CSS+JS)
- **Performance**: <2s load time (LTE)
- **Accessibilité**: WCAG AA
- **Support**: Chrome 90+, Firefox 88+, Safari 14+
- **Mobile**: Responsive (iOS/Android)

---

## 📝 Fichiers Critiques

| Fichier | Rôle | Taille |
|---------|------|--------|
| `index.html` | Application SPA | 2.2 MB |
| `.gitignore` | Exclusions Git | < 1 KB |
| `manifest.json` | PWA manifest | 1 KB |
| `sw.js` | Service Worker | 5 KB |
| `LICENSE` | Licence MIT | 1 KB |

---

## ✅ Checklist Avant Publication

- [ ] Tests passent
- [ ] Console sans erreurs
- [ ] Performance optimale
- [ ] Responsive sur mobile
- [ ] Données sauvegardées
- [ ] Version taguée
- [ ] CHANGELOG mis à jour
- [ ] Documentation à jour

---

**Dernière mise à jour**: Mai 2026  
**Version**: 2.26  
**Mainteneur**: Davie MARET
