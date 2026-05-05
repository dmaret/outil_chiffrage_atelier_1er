# 📝 CHANGELOG - Outil Complet Atelier

Tous les changements notables de ce projet sont documentés dans ce fichier.

## Format

Basé sur [Keep a Changelog](https://keepachangelog.com/fr/).

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
- **Accompagnement CEA** - Jalons et observations
- **Historique complet** - Audit trail des actions

### 🐛 Corrections
- **Performance** - Optimisation rendu large datasets
- **Memory leaks** - Nettoyage event listeners

---

## [2.23] - 2026-04-15

### ✨ Améliorations
- **Calculateur Visuel** - Flux canvas drag-drop
- **Bundles gestes** - Groupement gestes par catégories
- **Keyboard shortcuts** - Ctrl+G, Ctrl+S, Ctrl+P, etc.

### 🐛 Corrections
- **Bundle rendering** - Affichage corrects des bundles

---

## [2.22] - 2026-04-10

### ✨ Améliorations
- **Gestion stock FIFO** - Valorisation automatique
- **Palette transfers** - Suivi entrée/sortie
- **Inventory tracking** - Historique mouvements

### 🐛 Corrections
- **FIFO calculation** - Correction ordre prix unitaires

---

## [2.21] - 2026-04-05

### ✨ Améliorations
- **Consommables** - Gestion articles avec prix
- **Devis en attente** - Vue filtrée devis
- **Clients historique** - Tracking CA par client

### 🐛 Corrections
- **Quantité prix** - Calcul correct quantité × prix

---

## [2.20] - 2026-03-30

### ✨ Améliorations
- **Catalogue Gestes** - Chronomètres par geste
- **Modèles prestation** - Sauvegarde/chargement modèles
- **Templates sectoriels** - Pré-remplissage par secteur

### 🐛 Corrections
- **Chronomètre** - Reset et apply corrects

---

## [2.10] - 2026-03-15

### ✨ Améliorations
- **Dashboard complet** - KPIs, alertes, pipeline
- **Calculateur base** - Chiffrage coût + marge
- **Prestations** - Devis, validés, facturés

### 🐛 Corrections
- **Calculs financiers** - Précision 2 décimales
- **Sauvegarde automatique** - Auto-save localStorage

---

## [2.00] - 2026-02-01

### ✨ Première version stable
- **SPA complète** - Application standalone
- **PWA support** - Offline mode
- **LocalStorage persistence** - Données persistantes
- **Responsive design** - Mobile friendly

---

## Notes de Version Antérieures

### [1.0] - 2025-12-01
- **Lancement bêta** - Version initiale testée
- **Architecture SPA** - Vanilla JS sans framework externe
- **Authentification PIN** - Accès sécurisé simple

---

## Statut de Développement

### ✅ Implémenté
- Calculateur financier complet
- Gestion stock FIFO
- Catalogue gestes chronométrés
- Dashboard avec KPIs
- Formation Admin + Logistique
- Planification Gantt
- Export PDF
- PWA offline mode

### 🚧 En cours
- Cloud sync (Phase 2)
- Authentication OAuth (Phase 2)
- Advanced analytics (Phase 3)

### 📋 Prévu
- Mobile app native
- Multi-language support
- Advanced reporting
- Team collaboration real-time

---

## Compatibilité

| Navigateur | Support |
|-----------|---------|
| Chrome 90+ | ✅ Full |
| Firefox 88+ | ✅ Full |
| Safari 14+ | ✅ Full |
| Edge 90+ | ✅ Full |
| Mobile browsers | ✅ Full |

---

## Sécurité

- **Pas de données sensibles** envoyées vers serveur sans consentement
- **LocalStorage unique** par navigateur/profil
- **PIN local** uniquement (pas de hash)
- **HTTPS recommended** pour production

---

## Performance

- **Load time**: < 2s (LTE)
- **Render time**: < 100ms interactions
- **Bundle size**: 2.2 MB (HTML inline)
- **Cache**: Service Worker + LocalStorage

---

## Contribuer

Pour soumettre des changements:
1. Fork le repository
2. Créer feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push branch (`git push origin feature/AmazingFeature`)
5. Ouvrir Pull Request

Voir [CONTRIBUTING.md](CONTRIBUTING.md) pour plus de détails.

---

**Dernière mise à jour**: 5 mai 2026  
**Mainteneur**: Davie MARET  
**Repository**: https://github.com/dmaret/outil_chiffrage_atelier_1er
