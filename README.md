# 🏭 Outil Complet Atelier - La Pallanterie

**Un outil web complet pour gérer une atelier de travail adapté avec chiffrage, formation, gestion de stock et bien plus.**

---

## 📋 Table des Matières

1. [Features](#features)
2. [Authentification](#authentification)
3. [Modules Principaux](#modules-principaux)
4. [Phases Implémentées](#phases-implémentées)
5. [Installation](#installation)
6. [Utilisation](#utilisation)

---

## ✨ Features

### Phase 1: 🎓 Formation
- **Système de formation complet** avec vidéos intégrées
- **Apprentissage par gestes** avec checklist interactive
- **Progression des apprenants** suivi en temps réel
- **Export des rapports de formation**
- **Import/Export des données de formation**

### Phase 2: 🔐 Authentification & Permissions
- **4 groupes d'accès** : CEA, ASP, MSP, ADMIN
- **Contrôle d'accès basé sur les rôles (RBAC)**
- **Permissions granulaires** par fonctionnalité
- **Audit trail complet** : qui a modifié quoi et quand
- **Historique des actions** traçable
- **Isolation des données** par utilisateur

### Phase 3: 📧 Email Webhooks
- **Système de webhooks configurable** pour Email
- **Templates d'email personnalisables** avec variables
- **Déclencheurs automatiques** (devis envoyé, rapport prêt)
- **Substitution de variables** dans les templates
- **API Key authentication** pour sécurité

### BATCH 1: ⏱️ Chronomètre & Alertes
- **Chronomètre intégré** pour mesurer les gestes
- **Alertes intelligentes** pour performance
- **Gestion des temps** par prestation

### BATCH 2: 📊 Rentabilité, Prévisions & Export
- **Analyse de rentabilité** par prestation
- **Prévisions** CA et coûts
- **Export PDF** des rapports et devis
- **Export Excel** des données
- **Tableaux de bord** avec KPIs

### Autres Features
- 📸 **Photos/vidéos** attachées aux prestations
- 📦 **Gestion de stock** complète (FIFO, emplacements, alertes)
- 🛒 **Gestion des consommables**
- 👥 **Gestion des clients** et prospects
- 💼 **Calculateur de devis** professionnel
- 📈 **Statistiques** détaillées
- 📅 **Planification** avec Gantt chart
- 💾 **Auto-save** des données
- 🔍 **Recherche globale** dans l'application
- ⭐ **Favoris** de gestes et prestations

---

## 🔐 Authentification

### Groupes d'Accès par Défaut

| Groupe | Mot de passe | Accès | Permissions |
|--------|--------------|-------|-------------|
| **CEA** | `cea2026` | Chiffrage, Prestations, Stats, Catalogue | Créer/Modifier prestations, Voir rapports |
| **ASP** | `asp2026` | Stock, Calculateur, Consommables, Catalogue | Gérer stock, Consommables |
| **MSP** | `msp2026` | Stock, Consommables, Paramètrage | Inventaire, Transferts |
| **ADMIN** | `admin2026` | **Tous les onglets** | Tous les droits + gestion utilisateurs |

### Onglets par Groupe

```
CEA:  Dashboard, Calculateur, Prestations, Clients, Stats, Catalogue, Formation, Planification
ASP:  Dashboard, Calculateur, Stock, Consommables, Catalogue, Formation, Planification
MSP:  Dashboard, Stock, Consommables, Stats, Paramètrage
ADMIN: Tous les onglets
```

---

## 📦 Modules Principaux

### 1️⃣ Dashboard (🏠)
- Vue d'ensemble des prestations et CA
- KPIs du mois et du trimestre
- Alertes actives
- Pipeline commercial

### 2️⃣ Calculateur (💼)
- Création/édition de devis
- Calcul automatique coûts + marges
- Import/export de gestes
- Génération PDF des devis

### 3️⃣ Gestion Stock (📦)
- Inventaire par emplacement
- Alertes de stock faible
- Transferts internes
- Suivi FIFO
- Import/export

### 4️⃣ Formation (🎓)
- Ajout d'apprenants
- Vidéos de formation par geste
- Checklist interactive
- Progression en temps réel
- Export rapports

### 5️⃣ Prestations (📊)
- Liste complète des prestations
- Photos/vidéos attachées
- Historique des modifications (revisions)
- Filtres et recherche
- Export données

### 6️⃣ Gestion Clients (👥)
- Base de données clients
- Contact et coordonnées
- Historique des commandes
- Segmentation par CA

### 7️⃣ Paramètrage (⚙️)
- Configuration Email Webhooks
- Gestion des types de mouvements (admin)
- Gestion des emplacements (admin)
- Gestion des unités (admin)
- Gestion des gestes du catalogue

### 8️⃣ Accompagnement (🧠)
- Support et documentation (admin)
- Glossaire des termes
- Recommandations théoriques

### 9️⃣ Historique (📝)
- Audit trail complet
- Filtrage par date/utilisateur/action
- Export de l'historique

### 🔟 Planification (📅)
- Gantt chart des projets
- Planning des prestations
- Vue temporelle

---

## 🚀 Phases Implémentées

### ✅ Phase 1: Formation System
- Système complet de formation
- Vidéos et checklist
- Suivi de progression

### ✅ Phase 2: Authentication & Permissions
- Authentification par groupe
- RBAC complet
- Audit logging

### ✅ Phase 3: Email Webhooks
- Configuration de webhooks
- Templates email
- Triggers automatiques

### ✅ BATCH 1: Chronomètre + Alertes
- Mesure de temps
- Alertes intelligentes

### ✅ BATCH 2: Rentabilité + Prévisions
- Analyse financière
- Export PDF/Excel

---

## 📥 Installation

### Prérequis
- Navigateur moderne (Chrome, Safari, Firefox, Edge)
- JavaScript activé
- Stockage local (LocalStorage)

### Déploiement
L'application est déployée automatiquement sur **GitHub Pages** à chaque push sur `main` :
```
https://dmaret.github.io/outil_chiffrage_atelier_1er/
```

### Développement Local
```bash
# Cloner le repository
git clone https://github.com/dmaret/outil_chiffrage_atelier_1er.git
cd outil_chiffrage_atelier_1er

# Ouvrir dans un navigateur
open index.html

# Ou avec un serveur local
python3 -m http.server 8000
# puis visiter http://localhost:8000
```

---

## 🎯 Utilisation

### Premier Démarrage

1. **Connexion** :
   - Sélectionner votre groupe (CEA, ASP, MSP, ADMIN)
   - Entrer le mot de passe
   - ✅ Connecté!

2. **Créer une prestation** :
   - Onglet "Calculateur" → Ajouter une ligne
   - Sélectionner geste, quantité, tarif
   - Sauvegarder (Ctrl+S ou bouton)

3. **Générer un devis** :
   - Calculateur → "📄 Générer devis"
   - Choisir client et date
   - ✅ Devis PDF téléchargé

4. **Formation** :
   - Onglet "Formation" → "➕ Ajouter apprenant"
   - Suivre le checklist des gestes
   - Cocher quand geste maîtrisé

5. **Consulter l'audit trail** :
   - Onglet "Historique" (admin)
   - Voir qui a modifié quoi et quand

---

## 🔧 Configuration Email Webhooks

### Activer les webhooks

1. Aller dans **Paramètrage** (⚙️)
2. Scroll vers "📧 Email Webhooks"
3. Cocher "Activer les webhooks email"
4. Entrer **URL du webhook** : `https://votre-serveur.com/webhook`
5. Entrer **API Key** : votre clé sécurisée
6. Sélectionner **templates** à activer
7. Tester avec "🧪 Tester webhook"

### Variables Disponibles

```
{client}           - Nom du client
{prestation}       - Nom de la prestation
{reference}        - Numéro de référence
{montant}          - Prix de vente (HT)
{montant_revient}  - Coût de revient
{marge}            - Marge nette
{heures}           - Heures travaillées
{statut}           - Statut (devis/rapport)
{date}             - Date (YYYY-MM-DD)
{responsable}      - Responsable
```

### Exemple Template

```html
<h2>Devis pour {client}</h2>
<p><strong>{prestation}</strong></p>
<p>Référence : {reference}</p>
<p>Montant : {montant} CHF</p>
<p>Marge : {marge} CHF</p>
<p>Date : {date}</p>
```

---

## 📊 Permissions Détaillées

### CEA (Collaborateur en emploi adapté)
```
✅ Créer/modifier prestations
✅ Créer/modifier clients
✅ Voir statistiques
✅ Voir audit trail
✅ Exporter données
❌ Gérer stock
❌ Gérer consommables
❌ Gérer configuration
```

### ASP (Assistant socioprofessionnel)
```
✅ Voir calculateur
✅ Gérer stock
✅ Gérer consommables
✅ Accéder à la formation
❌ Créer prestations
❌ Voir statistiques
❌ Gérer configuration
```

### MSP (Maître socioprofessionnel)
```
✅ Gérer stock
✅ Gérer consommables
✅ Voir statistiques
✅ Accéder à paramètrage
❌ Créer prestations
❌ Créer clients
❌ Gérer utilisateurs
```

### ADMIN
```
✅ Accès complet à tous les modules
✅ Gérer utilisateurs (groupes d'accès)
✅ Voir l'audit trail complet
✅ Configuration système
✅ Gestion du catalogue
```

---

## 🐛 Dépannage

### L'écran de login n'apparaît pas
```javascript
// Dans la console (F12 → Console)
sessionStorage.clear(); 
localStorage.clear(); 
location.reload();
```

### Les données ne se sauvegardent pas
- Vérifier que LocalStorage est activé
- Vérifier l'espace disque disponible
- Recharger la page

### Performances lentes
- Vider le cache navigateur (⌘Cmd+Shift+R)
- Essayer un autre navigateur
- Réduire le nombre de prestations en vue

---

## 📞 Support

Pour un problème ou suggestion :
- 📧 Email : [contact info]
- 🐛 Issues : https://github.com/dmaret/outil_chiffrage_atelier_1er/issues
- 💬 Discussions : https://github.com/dmaret/outil_chiffrage_atelier_1er/discussions

---

## 📄 Licence

© 2025–2026 **MARET Davie** — Tous droits réservés.

Toute reproduction, utilisation ou distribution de ce logiciel sans accord écrit préalable est interdite.

---

**Dernière mise à jour** : Avril 2026  
**Version** : 3.0 (Formation + Phase 2 + Phase 3 Complet)
