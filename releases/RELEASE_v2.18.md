# Release v2.18 — Comparateur 3-niveaux (Module B)

> Date : 2026-04-30 — Module B de la suite clinique du travail.
> L'atelier comme dispositif d'observation : le Comparateur permet de mettre côte-à-côte ce que le client a demandé, la procédure CEA standard, et ce qui s'est réellement déroulé.

## 🎯 Vue d'ensemble

Le Comparateur 3-niveaux relie trois perspectives autour d'une même prestation :

- **Prescrit client** : ce que le client a demandé, ses attentes, ses contraintes.
- **Procédure CEA** : la procédure standard de l'atelier (template réutilisable).
- **Réel exécuté** : ce qui s'est réellement déroulé pendant la prestation.

L'outil met en évidence les écarts (étapes omises, partielles, modifiées) et offre un espace de réflexion clinique structuré pour l'équipe.

## 🆕 Nouvelles fonctionnalités

### Modèles de procédure CEA

3 modèles fournis par défaut :

- **Conditionnement standard** (10 étapes) : vérification matériel, briefing sécurité, tri/préparation, emballage, contrôle qualité, étiquetage, palettisation, nettoyage, débriefing.
- **Assemblage/montage standard** (9 étapes) : préparation postes, consignes sécurité, constitution groupes, tri composants, assemblage, contrôle, rangement, nettoyage, retour d'expérience.
- **Formation logistique standard** (9 étapes) : mise en place pédagogique, accueil stagiaires, exposé théorique, démonstration, exercices guidés, évaluations formatives, mise en pratique autonome, rangement, feedback.

Chaque étape est marquée :
- **`mandatory: true|false`** — étape obligatoire ou optionnelle (visuellement distinguée par une icône 🔴 vs ⚪).
- **`etape: 'avant'|'pendant'|'apres'`** — phase chronologique.

Un éditeur de modèles (CRUD) est accessible via ⚙️ Modèles dans la modale du Comparateur.

### Modale Comparateur

Accessible via le bouton **🔀 Comparer** présent sur chaque prestation sauvegardée (entre `⏱️ Réel` et `📄 PDF`).

**Layout 3 colonnes responsive** :
- Desktop (≥900px) : 3 colonnes côte à côte
- Mobile (<900px) : 1 colonne empilée

**Colonne « Prescrit client »** (bleu)
- Textarea libre pour les **objectifs / demandes** du client
- Textarea libre pour les **contraintes connues** (délais, moyens, restrictions)

**Colonne « Procédure CEA »** (terracotta)
- Sélecteur de modèle (dropdown)
- Liste des étapes du modèle, chacune marquée 🔴 obligatoire ou ⚪ optionnelle, avec son étape `[avant/pendant/apres]`

**Colonne « Réel exécuté »** (vert)
- Champ **Durée réelle** (heures)
- Liste des étapes avec dropdown de statut par étape :
  - **Fait** ✅ (vert)
  - **Partiel** ⚠️ (orange)
  - **Omis** ❌ (rouge)
  - **Modifié** 🔄 (bleu)
- Liste des **déviations observées** (chaque déviation = ligne supprimable)
- Bouton **➕ Ajouter déviation** (prompt textuel)
- Textarea **Réflexion clinique** post-atelier

### Stats agrégées en haut de la modale

- **Étapes réalisées / total** (ex: 7/10)
- Compteurs **Fait / Partiel / Omis / Modifié**
- Nombre total de **déviations** explicitement décrites

### Widget Dashboard « 📐 Écarts observés »

Nouveau widget Dashboard configurable via les permissions :

- **Top 10 des déviations textuelles** (par fréquence cross-prestations, avec pourcentage)
- **Compteurs visuels** : ❌ étapes omises, ⚠️ partielles, 🔄 modifiées
- **État vide gracieux** : « Aucune comparaison enregistrée » si rien n'a été saisi
- **État positif** : « ✨ Excellente exécution — aucun écart significatif détecté ! » si tout est OK

## 🛠️ Architecture technique

### Modèle de données

Stockage en `localStorage`, clé séparée pour les modèles :

```javascript
// Clé localStorage : 'procedureTemplates'
procedureTemplates = [
  {
    id: 'tpl-cond-001',
    name: 'Conditionnement standard',
    type: 'atelier',
    description: '...',
    steps: [
      { id: 's1', label: '...', mandatory: true, etape: 'avant' },
      ...
    ]
  },
  ...
];

// Stocké dans chaque prestation (existante, étendue) :
prestation.prescritClient = {
  objectifs: '...',
  contraintes: '...',
  dateRecueil: '2026-04-30T...'
};
prestation.procedureTemplateId = 'tpl-cond-001';
prestation.realExecute = {
  stepsState: { 's1': 'fait', 's2': 'omis', ... },
  deviations: [{ id, note, timestamp }, ...],
  reflexion: '...',
  dureeReelle: 4.5,
  completedAt: '2026-04-30T...'
};
```

### Fonctions clés

| Fonction | Rôle |
|---|---|
| `loadProcedureTemplates()` | Charge depuis localStorage, seed avec defaults si vide |
| `saveProcedureTemplates()` | Persiste les modèles |
| `openComparator(prestationId)` | Ouvre la modale pré-remplie |
| `closeComparator()` | Ferme la modale (sans sauvegarder) |
| `_renderComparator(p)` | Construit le DOM 3 colonnes |
| `_setStepState(stepId, state)` | Met à jour l'état d'une étape |
| `addDeviation()` | Ajoute une déviation textuelle (prompt) |
| `_removeDeviation(idx)` | Supprime une déviation |
| `saveComparator()` | Capture toutes les saisies, persiste, ferme |
| `_captureCompareFormValues()` | **Fix v2.18.1** : préserve les saisies textareas lors des re-renders |
| `openTemplateEditor()` / `closeTemplateEditor()` | Modale CRUD des modèles |
| `addProcedureTemplate()` / `_deleteTemplate(id)` | Création/suppression |
| `renderEcartsWidget()` | Widget Dashboard |

### Sécurité

- **`try/catch`** sur toutes les opérations (open, save, render).
- **`escapeHtml()`** sur tous les contenus utilisateur affichés.
- **Defensive checks** : `realData?.stepsState || {}`, vérification `_currentComparePrestation` avant chaque opération.
- Échec d'une feature ne bloque pas le reste de l'app.

## 📝 Fix v2.18.1

**Bug** : Taper dans les textareas (objectifs, contraintes, durée, réflexion) puis cliquer un état d'étape ou ajouter une déviation effaçait les saisies en cours, car le re-render reconstruisait l'ensemble du DOM.

**Fix** : Nouvelle fonction `_captureCompareFormValues()` appelée avant tout re-render. Elle capture les valeurs des champs (`prescritObjectifs`, `prescritContraintes`, `realDuree`, `realReflexion`) et les sauve dans le draft in-memory de la prestation (`_currentComparePrestation`).

Affecte : `_setStepState`, `_updateTemplateinComparator`, `addDeviation`, `_removeDeviation`.

## 🎨 Style

- Palette terracotta (variables `--terra-*`)
- Animation hover sur les chips et boutons (`transform: translateY(-1px)`)
- États visuels par couleur (omis = rouge, partiel = orange, modifié = bleu, fait = vert, ajouté = lavande)
- Dark mode intégré (sombre terracotta)

## 📐 Volume

- **CSS** : ~150 lignes (vue 3 colonnes + dark mode)
- **HTML** : ~50 lignes (modale Comparateur + modale Éditeur de modèles + widget Dashboard)
- **JavaScript** : ~400 lignes (modèle de données + 15 fonctions + widget agrégé)

Total : **583 lignes ajoutées** (commit `8ca7593`) + **24 lignes** pour le fix v2.18.1 (commit `d9bb090`).

## 🔗 Intégration avec les autres modules

- **Module A (v2.17)** : Le bouton FAB clinique reste actif pendant l'utilisation du Comparateur. Les inputs cliniques saisis sont visibles ensuite dans le Module C.
- **Module C (v2.19)** : Les déviations et réflexions seront agrégées dans la Timeline clinique.
- **Module D (à venir)** : Glossaire intégré pour expliquer "double contrainte", "charge mentale", etc.
- **Module E (à venir)** : Débriefing post-prestation guidé.
