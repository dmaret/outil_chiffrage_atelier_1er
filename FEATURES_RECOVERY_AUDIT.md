# 🔍 Audit de Récupération des Features v2.3.0, v2.4.0, v2.5.0

**Date**: 30 avril 2026  
**Statut**: ✅ **TOUTES LES FEATURES PRÉSENTES ET OPÉRATIONNELLES**

---

## 📋 Résumé

Les features mentionnées comme « perdues dans les flux » de git history ont été vérifiées et sont **totalement présentes** dans le code courant (v2.25). Aucune récupération n'était nécessaire — elles ont été proprement intégrées dans la branche main lors des merges successifs.

---

## v2.3.0 — Lot 1 Visuel/UX

### ✅ Templates sectoriels (6 presets)
- **Localisation** : Calculateur onglet > au-dessus du formulaire
- **Fonction** : `renderPrestationTemplates()` (ligne 12018)
- **CSS** : `.preset-template-card` (lignes 2368-2397)
- **Statut** : Opérationnel — 6 modèles affichés en grille
  - 🔌 Assemblage électronique
  - ✉️ Mise sous pli
  - 📦 Conditionnement
  - 🔍 Contrôle qualité
  - 🏷️ Étiquetage
  - 📥 Réception stock

### ✅ Comparateur de devis avec diff coloré
- **Localisation** : Onglet Prestations > Comparateur
- **Colonne Δ** : (B − A) avec symboles ▲ ▼ =
- **CSS** : `.compare-diff-pos` (vert), `.compare-diff-neg` (rouge), `.compare-diff-eq` (gris)
- **Statut** : Opérationnel — valeur absolue + pourcentage affiché
- **Légende** : Visible sous tableau comparatif

### ✅ Graphiques KPI sur le dashboard
- **Bibliothèque** : Chart.js 4.4.1 (CDN ligne 28)
- **Fonction** : `renderDashboardCharts()` (ligne 22202)
- **3 Visualisations** :
  1. CA confirmé (6 derniers mois) — bar chart
  2. Répartition par statut — donut
  3. Top 5 clients — barres horizontales
- **Gestion mémoire** : Cache `_dashCharts` détruit/recréé à chaque rendu
- **Robustesse** : Tolère l'absence de CDN (section vide, pas d'erreur)
- **Statut** : ✅ Opérationnel

### ✅ Aperçu devis live (sidebar WYSIWYG)
- **Localisation** : Onglet Calculateur > FAB 👁️ en bas à droite
- **Fonction** : `updateLiveDevisPreview()` (ligne 11931)
- **Pane** : `.devis-preview-pane` (ligne 2379)
- **Refresh** : Debounced 200 ms sur chaque `calculateTotal()`
- **État persisté** : localStorage `liveDevisPreviewOpen`
- **Fermeture auto** : En quittant l'onglet Calculateur
- **Statut** : ✅ Opérationnel

### ✅ Dark mode étendue
- **Couverture complète** pour v2.3 :
  - `.dark-mode .preset-template-card` (ligne 2396)
  - `.dark-mode .compare-diff-*` (lignes 2392-2394)
  - `.dark-mode .devis-preview-pane` (ligne 2395)
- **Statut** : ✅ Opérationnel

---

## v2.4.0 — Lot 2 Robustesse des Données

### ✅ Backup chiffré (Web Crypto AES-GCM 256)
- **Localisation** : Paramétrage → Sauvegarde & Restauration
- **Bouton** : « 🔐 Export chiffré »
- **Chiffrement** : AES-GCM 256 bits
- **Dérivation clé** : PBKDF2-SHA256, 200 000 itérations (ligne 17217)
- **Web Crypto** : `crypto.subtle` (ligne 17216)
- **Salt & IV** : Aléatoires (16 et 12 octets)
- **Format fichier** : `.encbackup` — enveloppe JSON en base64
- **Import auto-détecte** : Format chiffré vs. format standard
- **Mauvais mot de passe** : Toast d'erreur sans crash
- **Audit log** : Tracé via `logAction()`
- **Statut** : ✅ Opérationnel

### ✅ Sauvegardes automatiques en localStorage
- **Localisation** : Paramétrage → Sauvegarde & Restauration
- **Section** : « Sauvegarde automatique en arrière-plan »
- **Configurations** :
  | Réglage | Options |
  |---------|---------|
  | Activer | toggle on/off |
  | Intervalle | 1h / 6h / 24h |
  | Sauvegarder | bouton manuel |
  | Lister | affiche snapshots |
- **Max snapshots** : 3 (purge automatique des plus anciens)
- **Stockage** : localStorage (en clair — sécurité machine)
- **Actions par snapshot** : ↻ Restaurer · 📤 Exporter · 🗑️ Supprimer
- **Gestion quota** : `safeSetItem()` — l'utilisateur notifié sans crash
- **Statut** : ✅ Opérationnel

### ✅ Notifications navigateur
- **Localisation** : Paramétrage → Notifications
- **Contrôles** : Toggle « Activer », badge état permission, bouton 🧪 Tester
- **API** : `Notification` standard
- **Déclenchement** : D'abord `Notification.requestPermission()` (ligne 17493)
- **Filtre alerts** : Seules les danger (stocks bas, devis expirés, paiements retard)
- **Anti-spam** : 1 notification par jour par tag via `localStorage.notifSentHistory` (ligne 17463)
- **Nouveau détecteur** : Paiements en retard (>45 jours) — `detectOverduePayments()` (ligne 17555)
- **Arrière-plan** : Fonctionnent tant que le navigateur tourne
- **Statut** : ✅ Opérationnel

### ✅ Workflow d'approbation (orthogonal au statut métier)
- **Champ** : `approvalState` distinct du `statut` (devis/valide/facture…)
- **États** :
  | État | Badge | Signification |
  |------|-------|---------------|
  | `approved` | ✅ Validée | Défaut rétro-compatible — opérationnel |
  | `draft` | 📝 Brouillon | En cours, pas encore soumise |
  | `pending_review` | ⏳ Relecture | Soumise, en attente |
  | `rejected` | ❌ Rejetée | Refusée, motif obligatoire |
- **Permissions RBAC** :
  - `request_approval` : MSP + ADMIN
  - `approve_prestation` : ADMIN seul
- **Fonctions auditées** :
  - `requestPrestationApproval(id)` (ligne 15238)
  - `approvePrestation(id)` (ligne 15265) — capture `approvedBy` + `approvedAt`
  - `rejectPrestation(id)` (ligne 15286) — motif max 500 caractères
- **Migration zero** : Prestations legacy sans `approvalState` → traitées comme `'approved'`
- **Boutons contextuels** : Visibles selon état + permission
- **Statut** : ✅ Opérationnel

---

## v2.5.0 — Intégrations Avancées

### ✅ Carte « Formation CEA » sur écran de connexion
- **Localisation** : Écran d'authentification > widget droit
- **Emplacement HTML** : ligne 20788-20797
- **Icône & badge** : 🎓 Formation CEA (vert)
- **Bouton action** : « 🚀 Accéder à la formation »
- **Comportement** : Ferme overlay auth + switch tab `formation-logistique`
- **Accès** : Apprenants sans credentials admin
- **Configuration** : Paramétrage → Écran d'accueil ADMIN (toggle « Formation »)
- **Statut** : ✅ Opérationnel

### ✅ Carte « Statistiques rapides » configurable
- **Localisation** : Écran d'authentification > widget droit
- **Array métriques** : `LOGIN_STATS_METRICS` (lignes 20735-20746)
- **6 Métriques disponibles** :
  | Métrique | Couleur |
  |----------|---------|
  | Prestations | 🔵 #4e9af1 |
  | Clients | 🟢 #27ae60 |
  | CA ce mois (CHF) | 🟠 #f39c12 |
  | Devis en attente | 🟣 #9a70b8 |
  | Gestes au catalogue | 🔵 #3498db |
  | Consommables | 🟠 #e67e22 |
- **Admin config** : Paramétrage → Écran d'accueil ADMIN (checkboxes colorés)
- **Fallback défaut** : 3 métriques si aucune sélection
- **Bug passé** : L'ancien rendu lisait variables inexistantes — ✅ **CORRIGÉ**
- **Statut** : ✅ Opérationnel

### ✅ Widget Dashboard « Approbations en attente »
- **Localisation** : Dashboard > nouvelle section
- **ID widget** : `dashSectionApprovals` (ligne 7563)
- **Inscription** : `DASHBOARD_WIDGETS` (ligne 7560)
- **Contenu** :
  - Prestations `pending_review` + boutons ✅ Approuver / ❌ Rejeter
  - Prestations `rejected` + bouton ↻ Resoumettre
  - Par ligne : titre, client, date demande, montant, motif rejet
- **Permissions** : `approve_prestation` + `request_approval`
- **Visibilité/Masquage** : Via système permissions widgets existant
- **Statut** : ✅ Opérationnel

### ✅ Filtre rapide « Approbation » dans liste prestations
- **Localisation** : Onglet Prestations > section filtres
- **Select** : `#filtreApproval` (ligne 5321)
- **Options** :
  - ⏳ En attente de validation
  - 📝 Brouillon
  - ❌ Rejetée
  - ✅ Validée
  - (vide) Toutes approbations
- **Combinable** : Avec filtres existants (texte, statut, client, dates)
- **Statut** : ✅ Opérationnel

---

## 📊 Tableau Récapitulatif

| Version | Feature | Ligne | Statut |
|---------|---------|-------|--------|
| v2.3.0 | Templates sectoriels | 12018 | ✅ |
| v2.3.0 | Comparateur diff | 2372-2394 | ✅ |
| v2.3.0 | Chart.js KPI | 22202 | ✅ |
| v2.3.0 | Live devis preview | 11931 | ✅ |
| v2.3.0 | Dark mode étendu | 2396 | ✅ |
| v2.4.0 | Backup AES-GCM | 17216 | ✅ |
| v2.4.0 | Auto-backups localStorage | 5433 | ✅ |
| v2.4.0 | Notifications navigateur | 17493 | ✅ |
| v2.4.0 | Workflow approbation | 15238 | ✅ |
| v2.5.0 | Formation CEA widget | 20788 | ✅ |
| v2.5.0 | Stats configurables | 20735 | ✅ |
| v2.5.0 | Widget approbations | 7563 | ✅ |
| v2.5.0 | Filtre approbation | 5321 | ✅ |

---

## 🎯 Conclusion

**TOUTES les features** mentionnées dans v2.3.0, v2.4.0, v2.5.0 sont **présentes, testées et opérationnelles** dans le code courant.

**Aucune récupération requise** — les commits ont été proprement intégrés via :
- Commit 4d33633 : Lot 1 visuel/UX
- Commit a36a887 : Lot 2 robustesse
- Commit 569c97d : Lot 3 intégrations avancées

La branche main est **stable et complète** à v2.25.

---

*Audit effectué le 2026-04-30 — Vérification exhaustive du code source indexhtml*
