# RELEASE v2.24 — Rapports & Exports (Module H)

> Date : 2026-04-30 — Génération de rapports PDF détaillés par bénéficiaire.

## 🎯 Objectif

Permettre **l'export de synthèses cliniques professionnelles en PDF** pour documentation, partage ou archivage.

## 🔍 Fonctionnalités principales

- **Fonction `exportClinicalReportPDF()`** : Génère un PDF complet d'un bénéficiaire
- **Contenu du rapport** :
  - Infos bénéficiaire + date du rapport
  - Résumé : Total inputs, débriefings, émotions, doubles contraintes
  - Tableaux : Top émotions + top zones corporelles
  - Alertes détectées (si existantes)
  - Historique détaillé (10 dernières entrées)
- **Nommage automatique** : `rapport_[nom]_[date].pdf`
- **Utilise html2pdf** : Déjà en CDN, zéro dépendance supplémentaire
- **Toast utilisateur** : Feedback succès/erreur

## 📄 Accès

- Bouton **📄 Exporter PDF** dans la modale des Statistiques cliniques
- Génération asynchrone, fichier téléchargé automatiquement
