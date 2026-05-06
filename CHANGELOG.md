# 📝 CHANGELOG - Outil Complet Atelier

Tous les changements notables de ce projet sont documentés dans ce fichier.

## Format

Basé sur [Keep a Changelog](https://keepachangelog.com/fr/).

---

## [2.27] - 2026-05-06

### ✨ Nouvelles fonctionnalités
- **Mode Démo** — jeu de données fictives (6 prestations, 5 apprenants, 4 clients) activable depuis Config admin. Bandeau orange distinctif. Les vraies données sont sauvegardées et restaurées à la désactivation.
- **tabs-config.json** — fichier partageable à la racine du dépôt pour synchroniser l'ordre des onglets entre ordinateurs. Bouton "Sauvegarder comme modèle" dans l'éditeur de réorganisation.
- **Bandeau capacité stock** — affichage en haut du module Stock : Atelier / Sous-sol / Total avec barre de progression visuelle.
- **Widget Dashboard personnalisable** — bouton ⚙️ Personnaliser (dropdown) pour afficher/masquer chaque section du Dashboard.
- **Liste des apprenants sur l'accueil** — visible en mode CEA/apprenant après connexion.

### 🐛 Corrections
- **Couleurs graphique statuts** — les statuts `validé`, `facturé`, `soumis` avaient des clés sans accent dans la map de couleurs → tous tombaient sur le même bleu-gris. Chaque statut a maintenant une couleur distincte.
- **Table capacité hebdo à 0** — filtre statuts corrigé (`devis`/`soumis`/`validé` au lieu des clés inutilisées `accepte`/`en-cours`). Date de référence = `dateDebut` si renseignée, sinon date de création.
- **Ordre des onglets non persisté** — deux clés localStorage distinctes (`tabsOrder` et `tabOrder`) se contredisaient au rechargement. Unification : `loadTabOrder` ignoré si `tabsOrder` existe.
- **Date apprenant effacée après ajout** — le champ date était vidé (`''`) après un ajout réussi, bloquant silencieusement l'ajout suivant. Il se remet maintenant à aujourd'hui.
- **dashWidgetPrefs zone morte** — variable déclarée avec `let` à la ligne 25569 mais utilisée dès l'init (ligne 9862) → ReferenceError. Déclaration déplacée en haut.
- **Chevauchement boutons ↑↓ / Personnaliser** — les boutons de réorganisation admin étaient injectés dans `#dashSectionHeader` qui a déjà son bouton Personnaliser. Ce header est maintenant exclu de la réorganisation.
- **Bandeau démo toujours visible** — double `display:` dans le style inline (`display:none` puis `display:flex`). Le navigateur appliquait la dernière valeur. Corrigé.
- **Kanban approbation non à jour** — `_kanbanStateOf()` ignorait le champ `statut`. Mapping correct ajouté.
- **Erreur async hashPassword** — fonctions de sauvegarde des groupes auth désormais `async/await`.
- **Authentification multi-PC** — `initAuthGroups()` : stratégie de fusion localStorage + auth-config.json (hash null du fichier ne remplace pas le hash local).
- **Premier login bloqué** — le verrou anti-brute-force s'appliquait avant le test du hash null, bloquant la première connexion sur un nouveau PC.

### 🔧 Technique
- Renommage "CEA" → "groupe" dans la section "Assigner des formations"
- Renommage "Mouvements stock (FIFO)" → "Mouvements stock"
- Suppression champ redondant "Nombre de palettes atelier"
- Ajout champ "Capacité sous-sol" dans la configuration
- Bouton "Quitter la Formation" déplacé plus bas (top 78→110px)
- Service Worker : cache bumped à `v2.2.0`

---

## [2.26] - 2026-05-05

### ✨ Améliorations
- **Réorganisation sections calculateur** - Nouvel ordre des sections via fonction JavaScript
- **Interface CEA Formation** - Assignation des formations aux apprenants
- **Intégration CEA formations** - Chargement depuis localStorage
- **Quantity input transfer modal** - Modal de transfert avec sélection de quantité

### 🐛 Corrections
- **Null safety renderAccompCards** - Vérifications sûres pour éléments manquants
- **CSP meta tag** - Suppression frame-ancestors (ignoré en meta tag)
- **Password field accessibility** - Ajout username caché pour formulaires
- **Tab visibility** - Suppression display:flex qui cachait les autres onglets
- **Order completion confirmation** - Confirmation quand dernier geste effectué
- **Planning modal buttons** - Boutons fonctionnels pour planification

### 🔧 Technique
- **Logistique CEA submodule** - Conversion en dossier régulier (plus de sous-module)
- **Fixup transfer data loss** - Correction perte données transfert
- **Gesture data fix** - Correction données gestes

### 📚 Documentation
- **STRUCTURE.md** - Guide complet organisation projet
- **CHANGELOG.md** - Ce fichier

---

## [2.25] - 2026-04-28

### ✨ Améliorations
- **Planification Gantt** - Visualisation timeline des prestations
- **Dashboard KPIs** - Métriques clés en temps réel
- **Export PDF** - Génération devis en PDF
- **Mode présentation client** - Masquage coûts internes

### 🐛 Corrections
- **Sync localStorage** - Synchronisation données multi-onglets
- **Date format** - Correction format dates français

---

## [2.24] - 2026-04-20

### ✨ Améliorations
- **Système Formation Admin** - Modules avec quiz
- **Formation Logistique** - Interface apprenant avec progression
- **Kanban approbation** - Pipeline visuel de validation

### 🐛 Corrections
- **Export XLSX** - Correction format colonnes
- **Stock FIFO** - Correction ordre des mouvements

---

## [2.23] - 2026-04-15

### ✨ Améliorations
- **Accompagnement clinique** - Suivi bénéficiaires
- **Analyse comportementale** - Questionnaire structuré
- **Historique actions** - Journal complet avec undo/redo

---

## [2.22] - 2026-04-10

### ✨ Améliorations
- **Authentification groupes** - CEA / ASP / MSP / ADMIN avec mots de passe
- **Permissions RBAC** - Accès par rôle sur chaque onglet
- **auth-config.json** - Partage des hashes entre machines

---

## [2.21] - 2026-04-05

### ✨ Améliorations
- **Calculateur visuel** - Flux de gestes en canvas
- **Procédures** - Comparaison CEA vs client
- **Email webhooks** - Notifications configurables

---

## [2.20] - 2026-03-30

### ✨ Améliorations
- **Clients** - Fiche client avec historique et CA
- **Stats avancées** - Graphiques Chart.js (CA, statuts, top clients)
- **Dark mode** - Thème sombre

---

## [2.10] - 2026-03-15

### ✨ Améliorations
- **Gestion stock FIFO** - Valorisation automatique
- **Emplacements** - Atelier / Sous-sol / Expédition
- **Alertes stock** - Seuils minimum configurables

---

## [2.00] - 2026-02-01

### 🚀 Lancement initial
- Calculateur financier (coût de revient + marge)
- Catalogue des gestes chronométrés
- Catalogue consommables
- Prestations avec statuts
- Export JSON / Import JSON
- PWA offline (Service Worker)
