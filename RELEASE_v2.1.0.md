# v2.1.0 — Outil Complet Atelier - La Pallanterie

**Date :** 16 avril 2026  
**Commit :** 7471770  
**Branche :** main

---

## Nouvelles fonctionnalités

- **Exclusion des weekends** — le tableau de capacité calcule uniquement sur les jours ouvrés (Lun–Ven), les prestations tombant un samedi/dimanche sont ignorées
- **Gantt sans weekends** — les barres de prestations ne s'affichent plus le samedi/dimanche ; les colonnes weekends sont marquées par un motif hachuré
- **Noms des prestations dans les barres de charge** — le tableau capacitaire affiche le nom et les heures de chaque prestation dans la barre
- **Devis PDF compact** — optimisé pour tenir sur une seule page A4 (taille réduite, marges compactes)
- **Bouton Quitter le quiz** — possibilité de sortir du quiz Formation Logistique avant la fin
- **Séparation visuelle des onglets** — bordure entre chaque onglet pour meilleure lisibilité

## Améliorations

- **Header icônes** — repositionnées en flexbox, plus de chevauchement avec le titre
- **Mode sans icônes** — préserve les boutons fonctionnels du header (doc, raccourcis, recherche, plein écran, dark mode, présentation)
- **Mode admin (PIN)** — donne désormais toutes les permissions (`isSuperUser`)
- **Capacité** — filtrage sur statuts Accepté et En cours uniquement (Soumis retiré)

## Documentation

- **Documentation in-app complète** — les 16 sections sont maintenant dans le modal (sections 13-16 ajoutées : Authentification, Webhooks, Formation, Conditions)
- **Tableau RBAC** dans la doc in-app — permissions par groupe sous forme de tableau croisé
- **Technologies** mises à jour — Google Fonts, CSS Custom Properties, HTML5 Drag and Drop API, Langue
- **Structure projet** corrigée — README.md (au lieu de DOCUMENTATION.md) + RELEASE_v2.0.0.md
- **Glossaire** aligné — CEA = Collaborateur en Emploi Adapté, MSP = Maître SocioProfessionnel
- **Permissions RBAC** corrigées dans le README (CEA, ASP, MSP)
- **README** — mode sans icônes, PDF compact, quiz quitter, séparation onglets

## Corrections de bugs

- **Tableau capacité** — semaines Lun–Ven au lieu de Lun–Dim
- **Statuts capacité** — "Soumis" retiré, seuls Accepté et En cours comptent

---

*© 2025–2026 MARET Davie — Tous droits réservés*
