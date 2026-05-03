# v2.3.0 — Outil Complet Atelier - La Pallanterie

**Date :** 26 avril 2026
**Commit :** 4d33633
**Branche :** main

---

## Nouvelles fonctionnalités — Lot 1 visuel/UX

### ⚡ Templates sectoriels de prestation
Six presets pré-remplissables affichés en grille au-dessus du formulaire calculateur :
| Template | Secteur | Pré-remplit |
|---|---|---|
| 🔌 Assemblage électronique standard | Industrie | 50 pièces, 2 CEA, 30% MSP |
| ✉️ Mise sous pli volumineuse | Logistique | 1000 plis, 3 CEA, 25% MSP |
| 📦 Kit de conditionnement | Logistique | 200 kits, 2 CEA, 30% MSP |
| 🔍 Contrôle qualité visuel | Industrie | 500 pièces, 1 CEA, 50% MSP |
| 🏷️ Étiquetage produit | Logistique | 800 pièces, 2 CEA, 30% MSP |
| 📥 Réception et mise en stock | Logistique | 100 palettes, 1 CEA, 60% MSP |

Un clic remplit `prestation` / `reference` / `nbPieces` / `nbCEA` / `nbMSP` / `unite` + suggère des notes internes. Confirmation demandée si des champs sont déjà remplis. Cartes pleinement accessibles (`role="button"`, `tabindex`, navigation Enter/Space).

### 🎨 Comparateur de devis avec diff coloré
Le comparateur affiche désormais une colonne **Δ (B − A)** :
- **▲ vert** : la prestation B est meilleure que A
- **▼ rouge** : B est moins bonne
- **= gris** : identique

Le delta est affiché en valeur absolue + pourcentage (ex : `▲ 250 CHF (+12.5%)`). Pour le **prix unitaire**, le sens est inversé (« moins cher » est meilleur). Légende affichée sous le tableau.

### 📊 Graphiques KPI sur le dashboard
Trois visualisations [Chart.js 4.4.1](https://www.chartjs.org/) ajoutées dans une nouvelle section « Tendances » du dashboard :
- **CA confirmé** sur les 6 derniers mois (bar chart) — somme des `prixVente` des prestations `valide` et `facture`.
- **Répartition par statut** (donut) — devis / valide / facturé / annulé / refusé avec couleurs sémantiques.
- **Top 5 clients** par CA cumulé (barres horizontales).

Les graphiques sont recréés à chaque `renderDashboard()` (cache d'instances `_dashCharts` détruites avant re-render pour éviter les fuites mémoire). Tolérant à l'absence de Chart.js (CDN bloquée → section vide, pas d'erreur).

### 👁️ Aperçu devis live (sidebar WYSIWYG)
Bouton flottant **FAB 👁️** en bas à droite, visible **uniquement sur l'onglet Calculateur**. Cliquer ouvre un panneau slide-in à droite (380 px) qui affiche `buildDevisHtml({ preview: true })` en temps réel.

- Refresh **debouncé 200 ms** sur chaque `calculateTotal()` et `updateSaveButtonState()` (frappe au clavier non bloquante).
- État ouvert/fermé **persisté en localStorage** (`liveDevisPreviewOpen`).
- Se ferme automatiquement en quittant l'onglet calculateur.
- Bouton de fermeture avec `aria-label`, fonctionne aussi au clavier.

### 🌙 Couverture dark mode étendue
Règles dark-mode ajoutées pour les nouvelles surfaces : `.modal-box`, `#pinModalBox`, `#fluxLectureBox`, `#qg-code-hint`, `.compare-diff-pos/neg/eq`, `.devis-preview-pane`, `.preset-template-card`.

Le mode sombre était déjà entièrement implémenté côté toggle (bouton 🌙 dans le header) et persistance localStorage — la v2.3 étend juste sa couverture aux nouveaux composants.

## Améliorations techniques

- **Chart.js** ajouté en dépendance via CDN (`cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js`).
- **Helpers de robustesse** : tous les nouveaux appels passent par `try/catch` (`renderDashboardCharts`, `updateLiveDevisPreview`, `renderPrestationTemplates`, `updateLiveDevisFabVisibility`) — un échec d'une feature n'impacte pas le reste de l'app.

## Documentation

- **README** : nouvelle section 19 « 🎨 Visuel & productivité (v2.3) » avec tables des templates et description des charts.
- **RELEASE_v2.3.0.md** : ce fichier.

---

*© 2025–2026 MARET Davie — Tous droits réservés*
