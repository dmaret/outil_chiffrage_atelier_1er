# 📦 Logistique CEA 1er - Terminal Portable

Application logistique dédiée aux CEA (Coordinateurs Espace Atelier) pour gérer les commandes, les stocks, la planification et les formations depuis un terminal portable.

---

## 🎯 Vue d'ensemble

**Logistique CEA 1er** est une application web spécialisée pour les CEA qui travaillent en entrepôt. Elle se synchronise avec l'application principale (outil_chiffrage_atelier) pour offrir une vision en temps réel des tâches à accomplir, des stocks disponibles et des formations à dispenser.

### Caractéristiques principales:
- 📊 **Commandes** : Visualiser et exécuter les gestes des commandes en cours
- 📦 **Stocks** : Gérer les palettes et effectuer des transferts entre emplacements
- 📅 **Planification** : Valider la prise en charge des prestations de travail
- 🎓 **Formation** : Consulter les formations assignées par l'administrateur

### Interface FALC:
- Facile À Lire et Comprendre
- Terminal portable pour utilisateurs
- Visuels épurés et intuitifs
- Navigation par onglets et modales

---

## 🔄 Flux d'informations

```
┌─────────────────────────────────────────────────────────────────┐
│  APP PRINCIPALE (outil_chiffrage_atelier)                       │
│  - Crée les prestations/commandes                               │
│  - Gère les stocks et mouvements                                │
│  - Assigne les formations aux CEA                               │
│  - Sauvegarde dans localStorage                                 │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      ↓ localStorage (même domaine)
                      │  SYNCHRONISATION EN TEMPS RÉEL
                      │  (Pas de serveur, pas de latence)
                      ↓
┌─────────────────────────────────────────────────────────────────┐
│  LOGISTIQUE CEA 1er (CEA Terminal)                              │
│  - Lit les prestations assignées                                │
│  - Lit les stocks en temps réel                                 │
│  - Exécute les gestes et transfère les palettes                 │
│  - Valide les prises en charge                                  │
│  - Modifie les données dans localStorage                        │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      ↓ localStorage (même domaine)
                      │
┌─────────────────────────────────────────────────────────────────┐
│  APP PRINCIPALE (Recharge automatiquement)                      │
│  - Voit les commandes terminées                                 │
│  - Voit les mouvements de stock                                 │
│  - Peut facturer les commandes                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Points clés:
✅ **Pas de serveur** : Tout passe par localStorage (même domaine)
✅ **Synchronisation automatique** : Les deux apps lisent/écrivent en temps réel
✅ **CEA autonome** : Peut travailler sans connexion réseau (données en cache)
✅ **Pas de latence** : Les changements sont immédiats dans localStorage

---

## 📱 Modules

### 1. 📊 COMMANDES (Tableau de bord)

**Qu'est-ce que c'est?**
- Liste de toutes les commandes acceptées ou en cours
- Chaque commande affiche : client, numéro, nombre de gestes
- Les commandes sont des "prestations" en attente de traitement

**Flux complet d'une commande:**
```
1. App principale crée commande → statut = "accepte"
                              ↓
2. CEA voit commande au dashboard
                              ↓
3. CEA clique commande → Modale avec liste de gestes
                    ✅ = complété (vert)
                    ▶️  = en cours (violet)
                    ⭕ = en attente (gris)
                              ↓
4. CEA clique geste pour le marquer complété
                              ↓
5. CEA continue jusqu'au dernier geste
                              ↓
6. Dernier geste → Modale "Avez-vous fini cette commande?"
                              ↓
        Oui (✅)                    Non (❌)
         ↓                           ↓
    Commande terminée         Retour à la liste
    statut = "terminee"       des gestes
    realisePar = "cea"
         ↓
7. App principale voit commande terminée
   → Peut la facturer
```

**Données mises à jour:**
- `prestationsSauvegardees[].currentGestureIndex` ← Progresse avec chaque clic
- `prestationsSauvegardees[].statut` ← "accepte" → "en-cours" → "terminee"
- `prestationsSauvegardees[].realisePar` ← Enregistre le CEA qui a fait le travail

---

### 2. 📦 STOCKS (Gestion des palettes)

**Qu'est-ce que c'est?**
- Visualisation des palettes par emplacement (Rack A, RDC Arrivage, etc.)
- Chaque palette affiche sa référence et quantité disponible
- Permet de déplacer les palettes entre emplacements

**Flux de transfert d'une palette:**
```
1. CEA clique sur une palette
                              ↓
2. Modale s'ouvre:
   📦 Transférer une palette
   Référence: REF-001
   Disponible: 50 unités
   Input: Quantité à transférer [50]
                              ↓
3. CEA saisit quantité (1 à 50) et choisit destination
   Boutons: Vers Rack B, Vers RDC Arrivage, etc.
                              ↓
4. CEA clique destination → Transfert exécuté
                              ↓
5. En arrière-plan (invisible):
   - Enregistrement du mouvement "type: transfert"
   - Recalcul du stock FIFO (rejeu de TOUS les mouvements)
   - Si transfert partiel : palette scindée
   - Sauvegarde dans localStorage
                              ↓
6. Affichage recharge → Palettes repositionnées
                              ↓
7. Notification: "✅ 50 unités transférées de Rack A vers Rack B!"
```

**Logique FIFO (First In, First Out):**
- Quand on transfère, on prend les lots les plus anciens d'abord
- Si une palette a 3 lots (10 du 1er mai, 20 du 2 mai, 20 du 3 mai)
- Et on transfère 15 unités
- → On transfère les 10 du 1er mai + 5 du 2 mai
- → Le lot du 2 mai passe de 20 à 15 unités

**Données mises à jour:**
- `stockData.mouvements[]` ← Ajout du mouvement "transfert"
- `stockData.stockActuel` ← Recalculé intégralement (FIFO)

---

### 3. 📅 PLANIFICATION (Procédures de travail)

**Qu'est-ce que c'est?**
- Liste des tâches du jour (choses à faire aujourd'hui)
- Affichage en semaine avec dates des tâches
- Permet de "valider la prise en charge" (confirmer qu'on va faire le travail)

**Flux de planification:**
```
1. CEA clique sur l'onglet "Planification"
                              ↓
2. Affichage des tâches (commandes avec dates):
   Lundi 5 mai:
   - Mise sous pli + adressage (1.5h)
   - Test 1 (155.9h)
                              ↓
3. CEA clique sur une tâche
                              ↓
4. Modale s'ouvre: "Procédure de travail"
   Affiche:
   - Titre de la prestation
   - Liste des gestes (avec code, description, quantité, durée)
   - Bouton ✅ "Valider la prise en charge"
   - Bouton 📋 "Retour aux commandes"
                              ↓
5. CEA clique "Valider la prise en charge"
                              ↓
6. Enregistrement:
   - prestation.statut = "en-cours" (confirme qu'on va faire)
   - prisEnCharge = "2025-05-04T10:30:00Z" (timestamp)
   - prisEnChargeParCEA = "cea" (qui a validé)
                              ↓
7. Notification: "✅ Prise en charge validée!"
                              ↓
8. Retour au dashboard
                              ↓
9. App principale voit: "Cette prestation est maintenant en-cours"
   (CEA a pris en charge, travail commence)
```

**Données mises à jour:**
- `prestationsSauvegardees[].statut` ← "accepte" → "en-cours"
- `prestationsSauvegardees[].prisEnCharge` ← Date/heure du moment
- `prestationsSauvegardees[].prisEnChargeParCEA` ← ID du CEA (=currentCEA)

---

### 4. 🎓 FORMATION (Domaines à apprendre)

**Qu'est-ce que c'est?**
- Liste des formations assignées au CEA
- Formations viennent de l'app principale (admin assigne)
- Domaines: Systèmes (WMS/ERP/TMS), Méthodes (FIFO/Kanban/5S), etc.

**Flux de formation:**
```
1. App principale (Admin):
   - Va dans Formation Admin
   - Sélectionne CEA
   - Coche "Systèmes", "Méthodes", "KPI"
   - Clique "Sauvegarder"
   → Données dans localStorage: CEAFormations
                              ↓
2. Logistique CEA 1er:
   - CEA (cea) se connecte
   - Tab Formation s'ouvre
   - Affiche:
     💻 Systèmes → "▶️ Commencer la formation"
     🔄 Méthodes → "▶️ Commencer la formation"
     📈 KPI     → "▶️ Commencer la formation"
                              ↓
3. CEA clique "Commencer" pour une formation
                              ↓
4. Notification: "📚 Formation en cours de développement..."
   (À l'avenir: quiz, contenu vidéo, suivi de progression)
```

**Domaines de formation disponibles:**
- 💻 **Systèmes** : WMS, ERP, TMS, logiciels d'entrepôt
- 🔄 **Méthodes** : FIFO, Kanban, 5S, gestion Lean
- 🏬 **Retailers** : Gestion des petits distributeurs
- 📦 **Opérations** : Réception, picking, expédition
- 📈 **KPI** : Indicateurs de performance

**Données lues (pas d'écriture):**
- `CEAFormations["cea"]` ← Liste des domaines assignés

---

## 💾 Données partagées (localStorage)

| Clé | Source | Qui lit | Qui écrit | Format |
|-----|--------|---------|-----------|--------|
| `prestationsSauvegardees` | App principale | Commandes, Planification | Commandes, Planification | Array d'objets |
| `stockData` | App principale | Stocks | Stocks (transferts) | Objet {mouvements, stockActuel} |
| `configEmplacements` | App principale | Stocks (affichage) | App principale | Array de strings |
| `CEAFormations` | App principale | Formation | App principale | Objet {cea: [...], asp: [...]} |
| `currentCEA` | Logistique CEA | Tous les modules | Login | String (ex: "cea") |

**Important:** localStorage n'a pas de serveur, pas d'API
- Les deux apps sont sur le même domaine (dmaret.github.io)
- Elles partagent le même localStorage
- Aucune latence réseau (instant)

---

## 🔐 Connexion

**Écran de login:**
```
CEA: cea
Mot de passe: (n'importe quel)
→ Clique Valider
```

**Effet:**
- Stocke `currentCEA = "cea"` dans localStorage
- Affiche l'app
- Tous les modules utilisent `currentCEA` pour filtrer les données

---

## 👤 Rôles et données visibles

| Rôle | Commandes | Stocks | Planification | Formation |
|------|-----------|--------|---------------|-----------|
| **cea** | Toutes accepte/en-cours | Tous les stocks | Toutes | Celles assignées à cea |
| **asp** | À venir | À venir | À venir | Celles assignées à asp |
| **msp** | À venir | À venir | À venir | Celles assignées à msp |

---

## 🎮 Interactions principales

**Séquence typique d'un CEA:**

```
1. Se connecter → ID = "cea"
           ↓
2. Dashboard (Tab Commandes)
   Voir cartes de commandes
           ↓
3. Cliquer commande #1
   → Modale avec gestes
           ↓
4. Compléter chaque geste (clic = marquer fait)
           ↓
5. Dernier geste → "Avez-vous fini?" → Oui
   Commande terminée ✅
           ↓
6. Tab Stocks
   Cliquer palette
   → Saisir 20 unités
   → Choisir "Rack B"
   → Transfert exécuté ✅
           ↓
7. Tab Planification
   Cliquer procédure de travail
   → "Valider la prise en charge"
   → Prise en charge confirmée ✅
           ↓
8. Tab Formation
   Voir formations assignées
   → "Commencer" (à développer)
```

---

## 📊 Exemple complet : Une commande du début à la fin

```
T0 - App principale:
  Admin crée commande COM-001
  Client: Client XYZ
  Gestes: ETI-01 (10s), ASS-14 (2s), ASS-09 (5s), ETI-02 (12s), CTR-03 (15s)
  statut: "accepte"
  → Sauvegarde dans localStorage

T1 - Logistique CEA 1er:
  CEA (cea) se connecte
  Dashboard affiche: "COM-001 - Client XYZ - 5 gestes"
  → Clique sur COM-001

T2 - Modale des gestes:
  ✅ ETI-01 (complété en 12s)
  ✅ ASS-14 (complété en 3s)
  ▶️  ASS-09 (en cours) ← currentGestureIndex = 2
  ⭕ ETI-02 (en attente)
  ⭕ CTR-03 (en attente)

T3 - CEA continue:
  Clique ASS-09 → complété
  Clique ETI-02 → complété
  Clique CTR-03 → complété (DERNIER)
  
  Modale: "Avez-vous fini cette commande?"
  CEA clique "Oui"

T4 - Enregistrement:
  prestationsSauvegardees[0].statut = "terminee"
  prestationsSauvegardees[0].dateTerminaison = "2025-05-04T10:47:00Z"
  prestationsSauvegardees[0].realisePar = "cea"
  → Sauvegarde dans localStorage

T5 - App principale (recharge):
  Admin voit "COM-001" maintenant en vert
  Status: "TERMINEE - Réalisée par cea"
  Peut cliquer "Facturer" pour créer facture
```

---

## 🛠️ Architecture technique

**Frontend:**
- HTML5 / CSS3 / JavaScript vanille (aucune dépendance)
- Modales pour interactions
- Responsive design (mobile/tablet/desktop)

**Stockage:**
- localStorage (navigateur)
- Synchronisation sans serveur
- Données persistantes même sans connexion réseau

**Performance:**
- Chargement instant
- Pas d'appels API
- UI fluide et réactive

---

## 📱 Terminaux supportés

✅ Tablettes iOS/Android
✅ Téléphones mobiles
✅ Navigateurs desktop (Chrome, Firefox, Safari, Edge)
✅ Tout navigateur moderne avec localStorage

---

## 🚀 Accès

```
https://dmaret.github.io/outil_chiffrage_atelier_1er/logistique_cea_1er/
```

Intégré dans le même repo que l'app principale.
Synchronisation automatique via localStorage (même domaine).

---

## 📝 Notes techniques

- **Pas d'authentification serveur** : Validation simple en localStorage
- **Aucun appel réseau** : Tout en localStorage (même domaine: dmaret.github.io)
- **FIFO recalculé** : À chaque transfert, tous les mouvements sont rejouées
- **États globaux** : currentOrderIndex, currentGestureIndex, currentCEA
- **Notifications** : Toast qui disparaît après 3 secondes
- **Modales** : Visibility/opacity (pas display:none) pour les animations

---

## 📊 Statuts de prestation

```
"accepte"   → Commande créée, en attente de prise en charge
    ↓
    [CEA valide Prise en Charge depuis Planification]
    ↓
"en-cours"  → Travail commencé par le CEA
    ↓
    [CEA complète tous les gestes]
    ↓
"terminee"  → Travail terminé, CEA confirmé
    realisePar: "cea"  ← Enregistre qui a fait le travail
```

---

## 🎯 Prochaines évolutions

- 📚 Contenu des formations (quiz, vidéos, documents)
- 📊 Suivi de progression des formations
- 📱 Application mobile native
- 🔔 Notifications push
- 📈 Dashboard avec statistiques CEA
- 🏷️ Codes-barres pour scan palettes

---

**Créé pour la Pallanterie** 🏭
**Version:** 1.0 - MVP complet
**Dernière mise à jour:** 2025-05-04
