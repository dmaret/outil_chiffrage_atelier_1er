# Release v2.19 — Timeline clinique (Module C)

> Date : 2026-04-30 — Module C de la suite clinique du travail.
> Vue agrégée des observations cliniques pour chaque bénéficiaire — détection de patterns, repères chronologiques, suivi longitudinal.

## 🎯 Vue d'ensemble

Le Module C agrège tous les inputs cliniques saisis via le Module A (v2.17) et les présente comme une **timeline chronologique par bénéficiaire**, accompagnée de **patterns détectés automatiquement**.

C'est l'outil de relecture clinique : on saisit au fil de la prestation (Module A) → on relit l'historique consolidé d'une personne (Module C).

## 🆕 Nouvelles fonctionnalités

### Bouton 📊 Timeline sur chaque bénéficiaire

Ajout d'un bouton **📊 Timeline** entre `🎯 Jalon` et `✏️ Édition` sur la fiche de chaque bénéficiaire (style terracotta `#fff4e6`).

### Modale Timeline clinique

Largeur max 980px, header avec :
- Avatar + nom du bénéficiaire
- Objectifs (italic)

### Patterns détectés automatiquement

4 cards de patterns affichés en haut, sur fond beige :

**😊 Top émotions** (3 max)
- Listées par fréquence
- Intensité moyenne (0-5) en étoiles
- Format : `Nom · 4× · ⭐3.5`

**🤝 Top zones corporelles** (3 max)
- Zones les plus fréquentes (Tête, Nuque, Épaules, etc.)
- Compteur

**🌀 Doubles contraintes**
- Compteur total des paradoxes signalés

**📨 Volumes**
- Total messages reçus
- Total observations factuelles

### Filtres par type d'input

Chips cliquables en haut de la timeline :
- **Tout** (par défaut)
- 😊 Émotions
- 👁️ Observations
- 📨 Messages
- 🌀 Doubles contraintes
- 🤝 Ressentis corporels

Le filtrage est instantané, sans rechargement.

### Timeline chronologique verticale

Ligne verticale terracotta connectant tous les events.

Chaque event est rendu comme une carte avec :
- **Icône type-aware** (😊 / 👁️ / 📨 / 🌀 / 🤝) dans un cercle bordé
- **Bordure gauche colorée** par type :
  - Émotion : rose (#e6b4a0)
  - Observation : bleu (#a8c8f0)
  - Message : vert (#b8e0c0)
  - Double contrainte : jaune (#f5cb73)
  - Ressenti corporel : lavande (#c9b3d4)
- **Métadonnées** : date, heure, type, auteur, prestation associée
- **Contenu adapté au type** :
  - **Émotion** : nom en gras + intensité étoilée + note italique
  - **Observation** : texte + cible
  - **Message** : émetteur + contenu cité « ... » + interprétation → ...
  - **Double contrainte** : injonction A / B / source / note
  - **Ressenti corporel** : zone + sensation + intensité étoilée + note

Tri **anti-chronologique** (plus récent en haut).

### Agrégation intelligente

La fonction `_getBeneficiaryClinicalInputs(beneficiaireId)` collecte :

1. **Inputs directs** : `clinicalInputs` filtrés par `beneficiaireId === id`
2. **Inputs indirects** : tous les inputs d'autres prestations dont le bénéficiaire fait partie de `prestation.beneficiaires[]` ou de `b.prestationsIds[]`
3. **Déduplication** par ID

Cela permet, par exemple, qu'une observation faite « pendant la prestation X » soit visible dans la timeline du bénéficiaire Y, même si l'auteur n'avait pas explicitement renseigné le bénéficiaire au moment de la saisie.

## 🛠️ Architecture technique

### Fonctions clés

| Fonction | Rôle |
|---|---|
| `openClinicalTimeline(beneficiaireId)` | Ouvre la modale, pré-remplie pour ce bénéficiaire |
| `closeClinicalTimeline()` | Ferme la modale |
| `_filterTimeline(type)` | Applique un filtre de type, re-render |
| `_getBeneficiaryClinicalInputs(id)` | Agrégation directe + indirecte avec déduplication |
| `_computeClinicalPatterns(inputs)` | Calcule les patterns (top émotions, zones, compteurs) |
| `_renderClinicalTimeline()` | Construit le DOM (patterns + events filtrés) |
| `_renderTimelineEvent(ci)` | Rend un event individuel selon son type |

### État interne

```javascript
let _currentTimelineBenefId = null;     // ID du bénéficiaire affiché
let _currentTimelineFilter = 'all';     // Filtre actif
```

### Sécurité

- **`try/catch`** sur l'ouverture (gestion gracieuse si bénéficiaire introuvable)
- **`escapeHtml()`** sur tous les contenus utilisateur (notes, citations, observations, etc.)
- **Defensive checks** sur `clinicalInputs` (Array.isArray)

## 🎨 Style

- Palette terracotta cohérente avec les autres modules
- Patterns sur fond beige `#faf6f0`
- Events sur fond blanc avec timeline-line en couleur d'accent
- Dark mode intégré (sombre terracotta)
- Hover transitions sur les filtres (`translateY(-1px)`)

## 📐 Volume

- **CSS** : ~140 lignes (vue timeline + patterns + filtres + dark mode)
- **HTML** : ~25 lignes (modale)
- **JavaScript** : ~230 lignes (7 fonctions)

Total : **395 lignes ajoutées** (commit `c339c98`).

## 🔗 Intégration avec les autres modules

- **Module A (v2.17)** : Source de toutes les données (clinicalInputs).
- **Module B (v2.18)** : Les déviations/réflexions du Comparateur enrichissent à terme le contexte (à corréler avec les saisies cliniques de la même période).
- **Module D (à venir)** : Tooltip glossaire sur les termes cliniques affichés (ex: cliquer sur "double contrainte" dans la timeline → définition).
- **Module E (à venir)** : Débriefing post-prestation pourra ajouter des entrées dans la timeline.

## 📝 Cas d'usage typique

1. Pendant l'atelier : un MSP saisit via le FAB 🎭 deux émotions, une observation et une double contrainte sur la prestation X (impliquant Mme Dupont).
2. Une semaine plus tard, le CEA ouvre la fiche de Mme Dupont → clique sur **📊 Timeline**.
3. Il voit en haut : « Top émotions : Frustration 3× · ⭐4.2 », « Doubles contraintes : 2 paradoxes signalés ».
4. Il filtre sur « 🌀 Doubles contraintes » → relit les paradoxes dans le contexte des prestations.
5. Il prépare son entretien clinique avec ces éléments structurés.
