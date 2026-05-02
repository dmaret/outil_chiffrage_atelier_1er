# v2.0.0 — Outil Complet Atelier - La Pallanterie

**Date :** 15 avril 2026  
**Commit :** 978e9e5  
**Branche :** main

---

## Nouvelles fonctionnalités

- **Génération devis PDF** professionnel (html2pdf.js)
- **Dashboard analytics avancé** — 5 graphiques SVG :
  - Pipeline CA sur 3 mois (confirmé vs potentiel)
  - Évolution CA sur 12 mois (barres + moyenne)
  - Top prestations par rentabilité (marge %)
  - Répartition par statut (camembert)
  - Tendance marge moyenne sur 6 mois (courbe)
- **Système de relances devis** — alertes 7j/14j + badge urgence coloré
- **Analyse rentabilité par client** — marge %, part CA, score dans fiche client
- **Modèles de prestation rapides** — accès visuel + raccourcis
- **Fiche formation imprimable** par apprenant (bouton imprimante)
- **Calculateur avancé** + analyse de sensibilité (10 scénarios what-if)
- **Option "Interface sans icônes"** au login — checkbox pour désactiver tous les emojis
- **Branche `sans-icones`** disponible (version complète sans emojis)

## Améliorations

- **16 onglets** documentés (Formation Admin + Formation Logistique ajoutés)
- **Typographies fonctionnelles** — Google Fonts chargées (Inter, Roboto)
- **Héritage font-family** — tous les éléments (boutons, inputs, selects) respectent la police choisie
- **Drag-and-drop onglets** header (HTML5 natif, mode admin)
- **Bouton réinitialiser onglets** déplacé dans le header (accessible)
- **Bundles** : suppression automatique des gestes vides avant ajout
- **Édition prestation** : switch tab corrigé + scroll vers le haut + feedback toast
- **Comparatif camembert** côte à côte restauré (+ message si 0 CHF)

## Corrections de bugs

- Protection `null/undefined` sur tous les `.toFixed()` (15+ appels)
- Protection `reduce()` sur tableau vide (clients)
- Protection division par zéro (prix/pièce avec `nbPieces||1`)
- SyntaxError ligne 5407 corrigée (artefact de merge sans-icones)
- Affichage "undefined CEA" corrigé (`nbCEA||1`)
- Favicon et code sans-icones retirés de main
- `editPrestation` : try-catch + bypass `_tabDragJustEnded` en mode admin
- Comparatif camembert : `prixRevient` protégé dans tableau et calcul frais généraux

## Documentation

- **README.md** mis à jour (16 onglets, sommaire complet, section logistique fictive supprimée)
- **Documentation in-app** synchronisée (modale 📖)
- Sections 13-15 ajoutées au sommaire
- **RELEASE_v2.0.0.md** créé

---

*© 2025–2026 MARET Davie — Tous droits réservés*
