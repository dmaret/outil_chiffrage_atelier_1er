# Améliorations

> 🧹 **Hygiène repo** : « Automatically delete head branches » activé sur GitHub — les branches sources des PR mergées sont supprimées automatiquement.

## 2026-04-26 — v2.8 Vue Parcours dans Accompagnement

- **Nouveau sous-onglet « 🌊 Parcours »** dans le module Accompagnement, à côté de Bénéficiaires/Jalons/Vue croisée/Outils.
- Affiche pour chaque bénéficiaire un **flux horizontal** de cartes (jalons + prestations liées en option), connectées par des **flèches en pointillés**, dans l'esprit du Flux du module Gantt.
- Chaque carte : couleur du type de jalon (progression/difficulté/bilan/transition/reconnaissance) ou bleu pour prestation, état temporel (PASSÉ/AUJOURD'HUI/À VENIR), titre + date. Cliquer ouvre directement le modal d'édition.
- Filtre bénéficiaire + toggle « Inclure prestations ».
- Header par bénéficiaire avec avatar initiale + badge statut + comptes (passés / aujourd'hui / à venir).
- Compatible dark mode.

---

## 2026-04-26 — v2.7 Statistiques d'approbation

- **Nouveau widget Dashboard « 📈 Statistiques d'approbation »** : taux d'approbation, délai moyen de décision (en min/h/jours selon ordre de grandeur), nombre en attente, nombre décidées.
- **Donut Chart.js** : répartition des prestations par état d'approbation.
- **Top 3 approbateurs** + **5 derniers verdicts** avec horodatage formaté.
- Capture du demandeur (`approvalRequestedBy`) ajoutée dans les transitions d'approbation et bulk actions, pour de futures stats par demandeur.

---

## 2026-04-26 — v2.6 Bulk actions

- **Approbation en lot** : 3 boutons (✋ Demander validation / ✅ Approuver / ❌ Rejeter) dans la barre de sélection multiple. Filtrage automatique par état compatible (skip silencieux des prestations déjà dans le bon état). Motif unique demandé pour le rejet en lot.
- **Suppression en lot** avec double confirmation et undo via Ctrl+Z (snapshot via `pushUndoSnapshot`).
- **Export sélection** en CSV ou Excel — réutilise les fonctions d'export existantes via substitution temporaire de la liste source.
- Tous les boutons portent `data-perm` — auto-cachés pour les utilisateurs sans permission. Audit log à chaque opération.

---

## 2026-04-26 — v2.5 Workflow & écran d'accueil avancé

### Nouvelles fonctionnalités
- **🎓 Carte Formation CEA** sur l'écran de connexion (4e widget configurable). Bouton d'accès direct à `formation-logistique`.
- **📊 Statistiques rapides configurables** : 6 métriques au choix (Prestations, Clients, CA mois, Devis attente, Gestes catalogue, Consommables). Bug corrigé : l'ancienne carte affichait toujours 0/0/0 car liée à des variables inexistantes.
- **⏳ Widget Dashboard « Approbations en attente »** : liste les prestations en `pending_review` et `rejected`, avec actions ✅/❌/↻ contextuelles selon les permissions. Inscrit dans `DASHBOARD_WIDGETS`.
- **🔍 Filtre « Approbation »** dans la liste des prestations (en attente / brouillon / rejetée / validée).

### Notes
- La PR #90 (Formation CEA + stats config) avait été shippée sans doc — rattrapée ici.
- Hooks ajoutés dans `requestPrestationApproval` / `approvePrestation` / `rejectPrestation` pour rafraîchir le widget dashboard à chaque transition.

---

## 2026-04-26 — v2.4 Lot 2 robustesse données

### Nouvelles fonctionnalités
- **🔐 Backup chiffré (AES-GCM 256 + PBKDF2 200k)** — bouton « Export chiffré » dans Paramétrage. Mot de passe en double saisie, fichier `.encbackup`. Import auto-détecte chiffré vs clair.
- **💾 Sauvegardes automatiques** — toggle + intervalle 1h/6h/24h, max 3 snapshots rotatifs en localStorage avec actions Restaurer/Exporter/Supprimer.
- **🔔 Notifications navigateur** — toggle, hook dans `checkAndShowAlerts`, throttle 1/jour/tag. Détection nouvelle des paiements en retard >45j.
- **✅ Workflow d'approbation** — `approvalState` orthogonal au statut métier (`draft`/`pending_review`/`approved`/`rejected`). 2 nouvelles permissions RBAC (`request_approval`, `approve_prestation`). Transitions auditées avec motif sur rejet. Badge contextuel dans la liste.

### Notes
- Migration `localStorage` → `IndexedDB` **différée** au Lot 3 technique (touche 162 call-sites, trop risqué de bundler).
- Tous les nouveaux appels protégés par `try/catch`.

---

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
