# v2.12.0 — Style "carte illustrée" sur Parcours, Guide & Gantt

**Date :** 28 avril 2026
**Branche :** main

---

## Inspiration

Carte touristique dessinée à la main : **lignes ondulées**, **cercles numérotés rouges** type marqueur de carte, **pictogrammes gras**, fond blanc épuré.

---

## Vues retravaillées

### 🌊 Parcours bénéficiaires (onglet Accompagnement → Parcours)

- **Cercle rouge numéroté** (`.map-marker`, 28px, fond `#e74c3c`, bordure blanche 3px) en haut de chaque carte → le numéro indique la position chronologique.
- **Connecteurs SVG ondulés** colorés (couleur du jalon ou bleu pour les prestations) entre les cartes, avec une petite tête de flèche au bout.
- **Pictogramme central** grand format par type de jalon :
  - ⚡ progression
  - ⚠️ difficulté
  - 🔵 bilan
  - 🌀 transition
  - 🏅 reconnaissance
  - 📋 prestation
- **Badge état coloré** sous chaque carte : PASSÉ (vert), AUJOURD'HUI (orange), À VENIR (bleu).
- Cartes style "ligne épaisse 2px + ombre décalée" pour évoquer le dessin à la main.

### 📖 Guide (onglet Guide)

- `.guide-num` toujours **rouge `#e74c3c` en 32px** avec bordure blanche 3px → cohérent avec le style carte.
- Flèches `→` remplacées par des **SVG ondulés bleus** en `background-image` CSS.
- **Aucun changement HTML** nécessaire grâce à `font-size:0` qui masque le texte original.

### 📅 Gantt — Vue carte (onglet Planification)

- Nouveau bouton **🗺️ Vue carte** dans la barre de contrôle Gantt.
- Chaque prestation = un **rail SVG ondulé** proportionnel à sa durée dans la période visible.
- **Cercle rouge numéroté** au départ (index ordinal du projet), **flag coloré** à l'arrivée.
- Labels de date sous chaque marqueur.
- **Pointillés** sur les rails pour les statuts provisoires (devis/brouillon/soumis).
- Toggle aller-retour vue tableau / vue carte sans perte d'état.

---

## Notes techniques

- Tous les SVG sont **inline** (parcours, gantt) ou en **data URL CSS** (guide) — aucune image externe, aucun CDN.
- La classe `.map-marker` est réutilisable pour de futurs visuels.
- `body.dark-mode` couvre les nouvelles cartes (fond `#1e2530`, bordure `#7a9db1`).

## Documentation

- **IMPROVEMENTS.md** : entrée v2.12 ajoutée.
- **RELEASE_v2.12.md** : ce fichier.

---

*© 2025–2026 MARET Davie — Tous droits réservés*
