# RELEASE v2.25 — Intégrations avancées (Module I)

> Date : 2026-04-30 — Détection de corrélations entre modules cliniques et comparateur.

## 🎯 Objectif

Lier les **données du Comparateur (Module B - déviations)** avec les **inputs cliniques** pour identifier les patterns causaux.

## 🔍 Fonctionnalités principales

- **Fonction `_findCorrelations()`** : Analyse les prestations d'un bénéficiaire
  - Récupère les déviations (Module B)
  - Récupère les inputs cliniques (émotions, doubles contraintes)
  - Détecte les corrélations : écarts + réactions négatives simultanées
- **Insight généré** : Si une prestation a N écarts ET M émotions négatives + K doubles contraintes
  - Exemple : "Écarts observés (3) + Émotions négatives (2) + Doubles contraintes (1)"
- **Intégration dans les rapports** (Module H)
  - Section **🔗 Corrélations détectées**
  - Liste des prestations problématiques avec détails

## 🔗 Interconnexions

- **Module A** (Inputs) + **Module B** (Déviations) → Corrélations
- **Rapports** enrichis avec données cross-modules
- **Patterns à risque** identifiés de façon multi-dimensionnelle

## 🎓 Exemple

Prestation "Conditionnement" :
- 3 étapes déviées du modèle
- 2 émotions négatives saisies (Frustration, Colère)
- 1 double contrainte documentée
→ Risque identifié, à investiguer lors du prochain débriefing
