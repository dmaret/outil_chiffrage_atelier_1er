# 📖 Mode d'emploi — Outil Atelier La Pallanterie

> Version 2.27 — Mai 2026

---

## Sommaire

1. [Accès et connexion](#1-accès-et-connexion)
2. [Dashboard — Accueil](#2-dashboard--accueil)
3. [Chiffrer une prestation](#3-chiffrer-une-prestation)
4. [Gestion du stock](#4-gestion-du-stock)
5. [Module Formation](#5-module-formation)
6. [Planification capacité](#6-planification-capacité)
7. [Statistiques et graphiques](#7-statistiques-et-graphiques)
8. [Configuration](#8-configuration)
9. [Réorganiser les onglets](#9-réorganiser-les-onglets)
10. [Mode Démo](#10-mode-démo)
11. [Sauvegarde et restauration](#11-sauvegarde-et-restauration)
12. [Raccourcis clavier](#12-raccourcis-clavier)

---

## 1. Accès et connexion

### Groupes disponibles

| Groupe | Onglets accessibles | Mot de passe |
|--------|--------------------|-|
| **CEA** | Dashboard, Stats, Formation, Procédures | Oui |
| **ASP** | Dashboard, Stats, Formation, Procédures, Stock, Consommables | Non |
| **MSP** | Dashboard, Stock, Consommables, Stats, Paramétrage, Formation, Logistique | Non |
| **ADMIN** | Tous les onglets | Oui |

### Se connecter
1. Sélectionner son groupe dans la liste déroulante
2. Entrer le mot de passe si demandé
3. Cliquer **Se connecter**

> **Astuce ADMIN** : après connexion, le bouton 🔓 en haut à droite permet de déverrouiller le mode superutilisateur (drag des onglets, réorganisation des sections).

---

## 2. Dashboard — Accueil

Le dashboard affiche un résumé en temps réel de l'activité de l'atelier.

### Sections disponibles
- **KPI cards** : prestations totales, CA du mois, devis en attente, heures engagées
- **Tendances** : graphiques CA mensuel, répartition par statut, top 5 clients
- **Devis en attente** : liste avec ancienneté et alertes (> 30 jours)
- **Alertes** : stock bas, devis expirés, capacité dépassée
- **Kanban approbation** : pipeline de validation (Soumis → Approuvé → Refusé)
- **Demandes de formation** : formation en attente des apprenants

### Personnaliser les sections
Cliquer **⚙️ Personnaliser** (en haut à droite) pour afficher ou masquer chaque section. La préférence est sauvegardée.

### Mode CEA/apprenant
En mode CEA, la liste des apprenants assignés apparaît directement sur l'accueil.

---

## 3. Chiffrer une prestation

### Flux complet

1. Aller dans l'onglet **Calculateur**
2. Renseigner :
   - **Client** (existant ou nouveau)
   - **Intitulé** de la prestation
   - **Référence** unique
   - Nombre de **CEA** et part **MSP**
   - **Nombre de pièces**
3. Ajouter des **gestes** depuis le catalogue (code, quantité, temps)
4. Ajouter des **consommables** si nécessaire
5. Ajuster la **marge %**
6. Vérifier le **prix de vente** calculé automatiquement
7. Cliquer **💾 Enregistrer** (ou Ctrl+S)

### Formule de calcul
```
Coût MO       = (secondes × nbCEA × tauxHoraireCEA) / 3600
Coût Encad.   = (secondes × nbMSP × tauxHoraireMSP) / 3600
Coût Conso.   = Σ (prix unitaire × quantité)
Frais généraux = selon mode (horaire / fixe / %)
Prix de revient = MO + Encadrement + Consommables + Frais généraux
Prix de vente = Prix de revient / (1 - marge%)
```

### Statuts d'une prestation
`devis` → `soumis` → `validé` → `facturé` (ou `annulé`)

---

## 4. Gestion du stock

### Capacité (bandeau en haut)
Le module stock affiche en en-tête la capacité actuelle :
- **Atelier** : palettes présentes vs capacité configurée
- **Sous-sol** : idem
- **Total** : somme des deux

### Mouvements stock
- **Entrée** : réception de marchandise (+ quantité)
- **Sortie** : utilisation ou expédition (- quantité)
- **Transfert** : déplacement entre emplacements

### Emplacements
Les types d'emplacements (Atelier, Sous-sol, Expédition, etc.) sont configurables dans **Config → Stock**.

### Alertes
Les articles dont le stock est sous le seuil minimum apparaissent en rouge avec un badge sur l'onglet.

---

## 5. Module Formation

### Formation Admin (MSP/ADMIN)

**Apprenants**
1. Onglet **Formation Admin** → section "Gestion des apprenants"
2. Renseigner nom, catégorie et date de début
3. Cliquer **Ajouter apprenant**

**Assigner des formations aux groupes**
1. Sélectionner un groupe (CEA / ASP / MSP) dans la liste
2. Cocher les domaines de formation à dispenser
3. Cliquer **Sauvegarder assignations**

**Modules et quiz**
- Les modules de formation sont gérables via "Assigner des formations"
- Les quiz sont accessibles depuis l'onglet Formation Logistique

### Formation Logistique (CEA/Apprenants)
- Accès aux modules assignés par l'admin
- Progression visible par domaine
- Résultats de quiz sauvegardés

---

## 6. Planification capacité

Accessible depuis l'onglet **Planification**.

### Table capacité hebdomadaire
Affiche les 10 prochaines semaines avec :
- Heures engagées (prestations actives : devis, soumis, validés, en cours)
- Barre de charge en % de la capacité configurée
- Alerte rouge si surcharge

### Configurer la capacité
Champ **"Capacité CEA dispo/semaine (h)"** en haut du tableau (défaut : 35h).

> La date utilisée est `dateDebut` de la prestation si renseignée, sinon la date de création.

---

## 7. Statistiques et graphiques

### Graphique "Répartition par statut"
Couleurs par statut :
- 🟡 **Devis** — orange
- 🟠 **Soumis** — orange foncé
- 🟢 **Validé** — vert
- 🔵 **Facturé** — bleu
- 🟣 **En cours** — violet
- 🔴 **Annulé** — rouge

### Exports disponibles
- **CSV** : données brutes
- **Excel (.xlsx)** : avec mise en forme
- **PDF** : devis formaté client
- **JSON** : sauvegarde complète

---

## 8. Configuration

### Coûts horaires
Onglet **Paramétrage** ou **Config** → ajuster :
- Taux horaire CEA
- Taux horaire MSP
- Marge par défaut
- Mode frais généraux (horaire / fixe / %)

### Capacité stock
Config → Stock :
- **Capacité atelier** (palettes)
- **Capacité sous-sol** (palettes)

### Groupes et mots de passe
Config → Gestion des accès :
- Créer / modifier les groupes
- Définir les mots de passe
- Exporter `auth-config.json` pour partager entre PC

### Partager les mots de passe entre PC
1. Config → Gestion des accès → **Exporter auth-config.json**
2. Déposer le fichier téléchargé à la racine du dépôt (remplacer l'ancien)
3. Sur les autres PC, rafraîchir la page — les mots de passe sont automatiquement chargés

---

## 9. Réorganiser les onglets

### Manuellement (ADMIN uniquement)
En mode superutilisateur, glisser-déposer les onglets dans la barre pour les réorganiser.

### Via l'éditeur (Config)
Config → Réorganisation des onglets :
1. Glisser-déposer les pilules colorées pour choisir l'ordre
2. Cliquer **💾 Sauvegarder comme modèle** pour télécharger `tabs-config.json`
3. Déposer ce fichier à la racine du dépôt

### Partager l'ordre entre PC
Le fichier `tabs-config.json` à la racine du dépôt est automatiquement chargé si aucun ordre local n'existe. Les PC sans personnalisation adoptent le modèle du dépôt.

---

## 10. Mode Démo

Permet de présenter l'outil avec des données fictives sans toucher aux vraies données.

### Activer
Config (admin) → Mode Démo → **🎭 Activer le mode démo**

Un **bandeau orange** en bas de page signale le mode démo en permanence.

### Données fictives chargées
- 6 prestations (Nestlé, Migros, Rolex, Pharmacie Centrale — statuts variés)
- 5 apprenants
- 4 clients avec coordonnées

### Désactiver
Cliquer **✕ Quitter le mode démo** (bandeau orange ou bouton Config).

Les vraies données sont restaurées exactement. Le bandeau disparaît au rechargement de page.

---

## 11. Sauvegarde et restauration

### Export JSON (recommandé)
Config → Sauvegarde → **📤 Exporter (JSON)**

Contient : prestations, gestes, consommables, stock, clients, configuration.

### Export chiffré
Config → **🔐 Export chiffré** — protégé par mot de passe (AES-GCM 256).

### Import
Config → **📥 Importer** — accepte les fichiers `.json` et `.encbackup`.

### Sauvegarde automatique
Config → Sauvegarde automatique → activer + choisir l'intervalle (1h / 6h / 24h).
Jusqu'à 3 snapshots conservés dans le navigateur, restaurables en un clic.

### Fréquence recommandée
- Export JSON **hebdomadaire** minimum
- Avant toute manipulation importante : exporter d'abord

---

## 12. Raccourcis clavier

| Raccourci | Action |
|-----------|--------|
| `Ctrl+S` | Enregistrer la prestation en cours |
| `Ctrl+K` | Ouvrir la palette de commandes |
| `Ctrl+Z` | Annuler la dernière action |
| `Ctrl+Y` | Rétablir |
| `Ctrl+P` | Imprimer / Exporter PDF |
| `↑ ↓ Enter Esc` | Navigation dans la palette de commandes |

---

## Conseils pratiques

- **Backup avant modification** : toujours exporter le JSON avant un import ou une réorganisation importante
- **auth-config.json** : committer ce fichier dans le dépôt pour que tous les PC partagent les mots de passe
- **tabs-config.json** : idem pour l'ordre des onglets
- **Hard refresh** (Cmd+Shift+R sur Mac, Ctrl+Shift+R sur PC) si l'outil semble afficher une ancienne version

---

*Outil Atelier La Pallanterie — v2.27 — Mai 2026*
