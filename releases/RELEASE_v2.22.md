# RELEASE v2.22 — Statistiques cliniques (Module F)

> Date : 2026-04-30 — Agrégation et analyse des patterns cliniques par bénéficiaire.

## 🎯 Objectif

Fournir une **vue statistique complète** des inputs cliniques d'un bénéficiaire avec détection automatique de patterns à risque.

## 🔍 Fonctionnalités principales

- **Statistiques agrégées** : Total inputs, décomposition par type, débriefings
- **Top 3 émotions** : Fréquence de chaque émotion observée
- **Top 3 zones corporelles** : Zones sensibles identifiées
- **Détection automatique de risques** :
  - Émotions négatives récurrentes (3+ fois/semaine → alerte)
  - Doubles contraintes fréquentes (2+ fois/semaine → alerte haute)
- **Indicateurs de sévérité** : Medium / High selon la fréquence

## 📊 Modale accessible

- Bouton **📊 Stats** dans la Timeline clinique (Module C)
- Affichage détaillé avec code couleur terracotta
- Dark mode supporté
