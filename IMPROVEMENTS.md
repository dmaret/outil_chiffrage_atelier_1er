# Améliorations

> 🧹 **Hygiène repo** : « Automatically delete head branches » activé sur GitHub — les branches sources des PR mergées sont supprimées automatiquement.

## 2026-04-26 — v2.3 Lot 1 visuel/UX

### Nouvelles fonctionnalités
- **⚡ Templates sectoriels** : 6 presets de prestation cliquables (assemblage électro, mise sous pli, kit conditionnement, contrôle qualité, étiquetage, réception/stock) au-dessus du formulaire calculateur. Pré-remplissent prestation/référence/nbPieces/nbCEA/MSP/unité + notes internes. Cartes accessibles (role=button, tabindex, Enter/Space).
- **🎨 Comparateur de devis avec diff coloré** : nouvelle colonne Δ (B − A), flèches ▲/▼/=, code couleur, delta absolu et pourcentage. Sens inversé pour le prix unitaire (moins cher = mieux).
- **📊 Charts dashboard (Chart.js 4.4.1)** : CA 6 mois (bar), statuts (donut), top 5 clients (barres horiz). Cache d'instances + destroy au re-render. Tolérant à l'absence du CDN.
- **👁️ Aperçu devis live** : FAB sur l'onglet Calculateur, slide-in panel à droite, refresh debouncé 200 ms via `buildDevisHtml({preview:true})`. Persistance localStorage.
- **🌙 Dark mode étendu** : couverture des composants v2.2 et v2.3 (modal-box, qg-code-hint, .compare-diff-*, .devis-preview-pane, .preset-template-card).

### Notes
- Le mode sombre était déjà entièrement implémenté côté toggle/persistance — la v2.3 étend juste sa couverture.
- Tous les nouveaux appels protégés par `try/catch` pour qu'un échec d'une feature n'impacte pas le reste de l'app.

---

## 2026-04-26 — Refactor structurel + accessibilité

### CSS
- Extension des variables `:root` :
  - Échelle d'espacement canonique : `--space-xs` (4px) → `--space-2xl` (28px)
  - Tokens d'ombre : `--shadow-card`, `--shadow-modal`
  - Couleurs sémantiques additionnelles : `--color-success-alt`, `--color-on-primary`, `--color-overlay`
  - `--border-radius-pill` (999px)
- Les valeurs en dur (`10px`, `8px`, `rgba(0,0,0,0.5)`…) restent en place pour ne pas risquer de régression visuelle, mais les variables sont prêtes pour les futurs call-sites.

### JavaScript — Helpers de déduplication
Six fonctions ajoutées à côté de `safeSetItem` pour centraliser les patterns
les plus dupliqués dans le code :

| Helper | Rôle |
|---|---|
| `safeJSONSet(key, value)` | Sérialise + persiste en localStorage avec gestion quota |
| `safeJSONGet(key, fallback)` | Lit + parse JSON, retourne fallback si corrompu |
| `openModal(id, display)` | Affiche une modale (centralise `style.display = 'flex'`) |
| `closeModal(id)` | Masque une modale (centralise `style.display = 'none'`) |
| `getInputValue(id, default)` | Lit + trim une valeur de champ, fallback si vide |
| `isValidPattern(value, regex)` | Validation regex avant persistance |

Les call-sites existants ne sont pas réécrits — adoption progressive.

### Accessibilité (ARIA)
- `role="dialog"` + `aria-modal="true"` + `aria-labelledby` ajoutés sur 5 modales
  qui n'en avaient pas : `pinModal`, `fluxLectureModal`, `shortcutsModal`,
  `compareModal`, `paiementModal`.
- `aria-label` sur le bouton-icône de fermeture (`&times;`) de `fluxLectureModal`.

### Validation des inputs
Formulaire de création rapide de geste durci :
- `qg-code` : `required`, `pattern="[A-Za-z]{2,4}-[0-9]{1,3}"`, `maxlength="10"`,
  `aria-describedby` pointant vers un hint visuel.
- `qg-desc` : `required`, `minlength="3"`, `maxlength="200"`.
- `qg-notes` : `maxlength="500"`.
- Tous les `<label>` associés via `for=`.

### Documentation (JSDoc)
JSDoc ajoutées sur cinq fonctions critiques :
`migrateLocalStorage`, `loadFromStorage`, `saveToStorage`, `calculateTotal`,
`genererDevis`. Format `@param`/`@returns` avec description du contrat,
side-effects et invariants.

---

## 2026-04-26 — Optimisations performance (PR #81)
- Minification CSS
- Lazy loading images (`loading="lazy"` sur les previews d'attachements)
- Optimisations standards
