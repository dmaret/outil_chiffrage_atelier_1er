# Améliorations

> 🧹 **Hygiène repo** : « Automatically delete head branches » activé sur GitHub — les branches sources des PR mergées sont supprimées automatiquement.

## 2026-04-29 — v2.14 Cinq nouveaux flux visuels interactifs sur le Dashboard

5 widgets ajoutés à la fin du Dashboard, chacun configurable individuellement via les permissions de groupe :

- **🌡️ Heatmap CA — 52 dernières semaines** : grille jour-par-jour style « GitHub contributions » (52×7), couleur log-échelle (gris → vert foncé), tooltip CHF par jour, **clic → filtrage automatique** des prestations sur cette date.
- **🗂️ Kanban approbation drag & drop** : 5 colonnes (Brouillon · Soumis · Approuvé · Rejeté · Facturé). Cartes draggables HTML5 — relâcher dans une autre colonne déclenche la transition correspondante (`requestPrestationApproval`, `approvePrestation`, `rejectPrestation`). Synchronisation immédiate avec le reste de l'app.
- **🕸️ Graphe relationnel** : SVG dynamique avec simulation de forces (répulsion + ressort) en JS natif, pas de D3. Trois types de nœuds (Clients bleu, Prestations violet, Bénéficiaires vert). Drag possible, toggles visibilité, bouton « Réorganiser ».
- **🏙️ Vue Ville** : 10 bâtiments isométriques cliquables, chaque bâtiment = un module de l'app. Badges rouges pour signaler les éléments à traiter (devis, approbations en attente, stock bas). Routes ondulées + soleil + nuages décoratifs.
- **🌊 Rivière de trésorerie** : SVG animé, courant dont la largeur représente le flux mensuel net sur 12 mois, gradient bleu, ondulation animée, **bateaux ⛵ flottants** (prestations actives) qui dérivent via `<animate>`.

Tous protégés par try/catch dans `renderDashboard()` — un échec d'une vue ne bloque pas le reste. Tous inscrits dans `DASHBOARD_WIDGETS` pour respecter les permissions par groupe.

---

## 2026-04-28 — v2.13 Excel partout : modèle, import & export

- Sur les 5 onglets BDD (Catalogue, Consommables, Stock, Clients, Bénéficiaires), chaque panneau **Modèle / Importer / Exporter** propose désormais **CSV ET Excel** côte à côte.
- Bouton vert Excel (#1d6f42, couleur officielle Microsoft Excel) à côté du bouton bleu CSV — pas de toggle, juste 2 boutons côte à côte.
- **Import** : `accept=".csv,.xlsx,.xls"` sur tous les inputs ; détection auto par extension via le helper `_isXLSXFile`. Le glisser-déposer accepte aussi les fichiers Excel.
- 2 nouveaux helpers : `_downloadXLSX(aoa, sheet, filename)` + `_readXLSXAsAOA(file, callback)` — utilisent SheetJS déjà présent (CDN).
- Refactor : extraction des `_applyXxxRows()` partagés entre les chemins CSV et XLSX (zéro duplication).
- 10 nouvelles fonctions : `download<Entité>TemplateXLSX()` + `export<Entité>XLSX()` pour Gestes, Consommables, Stock, Clients, Bénéficiaires.

---

## 2026-04-28 — v2.12 Style "carte illustrée" sur Parcours, Guide & Gantt

Inspiré d'une carte touristique dessinée à la main : lignes ondulées, cercles numérotés rouges, pictogrammes gras.

- **Parcours bénéficiaires** : nouveaux **cercles rouges numérotés** (`.map-marker`) en haut de chaque carte, **connecteurs SVG ondulés** colorés entre les événements (remplacent `›` en pointillés), grand **pictogramme central** par type de jalon (⚡⚠️🔵🌀🏅), badge état PASSÉ/AUJOURD'HUI/À VENIR.
- **Guide** : `.guide-num` toujours **rouge #e74c3c en 32px** avec bordure blanche, flèches `→` remplacées par des **SVG ondulés bleus en `background-image`** CSS — aucune modification HTML requise grâce au `font-size:0` qui masque le texte.
- **Gantt** : nouveau bouton **🗺️ Vue carte** — chaque prestation devient un **rail SVG ondulé** proportionnel à sa durée, avec cercle rouge numéroté au départ et flag coloré à l'arrivée. Pointillés pour les statuts provisoires (devis/brouillon).
- Compatible dark mode (cartes en fond sombre, ombre adaptée).

---

## 2026-04-28 — v2.11 Import · Export · Modèle CSV sur tous les onglets base de données

- **Stock** : nouveau bloc « 📦 Modèle · Import · Export » — modèle CSV (`reference, quantite, prix_unitaire, emplacement`), import par glisser-déposer ou sélection de fichier (crée des mouvements « entrée » FIFO), export inventaire complet. Remplace les anciens boutons inline.
- **Clients** : bloc identique ajouté — modèle CSV (`nom, tel, email, adresse, notes, tarif_special`), import (ajout + mise à jour si le nom existe déjà), export de `clientsData` complet.
- **Bénéficiaires** : bloc identique dans le sous-onglet Suivi — modèle CSV (`prenom, nom, date_entree, statut, objectifs, notes`), import (skip si le couple prénom+nom existe déjà), export complet.
- Catalogue et Consommables avaient déjà le triplet — couverture maintenant **uniforme** sur tous les onglets base de données.
- Tous les panneaux supportent le glisser-déposer (`ondrop`) et l'input fichier.
- Dark mode couvert via les variables existantes (pas de nouveaux blocs CSS nécessaires).

---

## 2026-04-26 — v2.10 Refonte light de l'onglet Procédures

- L'onglet Procédures avait un thème **sombre style "GitHub dark" / terminal** en dur dans la CSS, dissonant avec le reste de l'app qui est clair.
- Réécriture complète des classes `.proc-*` (~30 règles) pour utiliser les variables `--color-*` du `:root` du thème principal.
- Header avec gradient doux, sub-nav pills harmonisées avec le reste, cartes blanches avec bordure colorée gauche, badges CEA/CLIENT en versions light (vert pâle, bleu pâle).
- Inputs/selects de la zone forcés en light via `#procedures input, select, textarea { ... !important }` — capture aussi les inline `background:#0d1117` historiques.
- Comparateur : cellules `match/moved/missing/extra` redessinées en versions claires (vert/jaune/rouge/bleu pastel).
- **Couverture dark mode** : règles `body.dark-mode .proc-*` ajoutées pour conserver la cohérence quand le mode sombre global est actif.

---

## 2026-04-26 — v2.9 Onglet Guide & Flux de travail

- **Nouvel onglet « 📖 Guide »** dans la barre principale, inspiré du visuel « Aide & Flux » du module Gantt.
- 7 sections accessibles via pills : 🚀 Démarrer · 📅 Quotidien · ✅ Workflow approbation · 💶 Suivi & paiement · 🛡️ Sauvegarde & sécurité · ⌨️ Raccourcis · ✨ Nouveautés.
- Cartes numérotées colorées (badge rond + emoji + titre + description) reliées par des flèches `→`, cliquables pour ouvrir l'onglet correspondant.
- Tip-boxes (💡) entre les flow blocks pour les bonnes pratiques.
- Couvre tout le cycle de vie d'une prestation (brouillon → facturé encaissé) + workflow d'approbation + sécurité.
- Compatible dark mode.

---

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
