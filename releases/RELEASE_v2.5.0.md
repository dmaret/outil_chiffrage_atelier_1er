# v2.5.0 — Outil Complet Atelier - La Pallanterie

**Date :** 26 avril 2026
**Branche :** main

---

## Nouvelles fonctionnalités

### 🎓 Carte « Formation CEA » sur l'écran de connexion (PR #90)

Quatrième widget configurable dans **Paramétrage → Écran d'accueil ADMIN**.

- Icône 🎓, badge vert
- Bouton « 🚀 Accéder à la formation » qui ferme l'overlay d'authentification et ouvre directement l'onglet `formation-logistique` avec focus sur le sélecteur de formation
- Conçu pour les apprenants : accès rapide sans avoir besoin de credentials admin

### 📊 Carte « Statistiques rapides » entièrement configurable (PR #90)

Six métriques disponibles, l'admin coche celles à afficher :

| Métrique | Source | Couleur |
|---|---|---|
| Prestations | `prestationsSauvegardees.length` | 🔵 #4e9af1 |
| Clients | `Object.keys(clientsData).length` | 🟢 #27ae60 |
| CA ce mois (CHF) | somme `prixVente` du mois (statut `valide`/`facture`) | 🟠 #f39c12 |
| Devis en attente | filter `statut === 'devis'` | 🟣 #9a70b8 |
| Gestes au catalogue | `catalogueGestes.length` | 🔵 #3498db |
| Consommables | `catalogueConsommables.length` | 🟠 #e67e22 |

**Bug corrigé au passage** : l'ancien rendu lisait des variables inexistantes (`prestations`, `clients`, `offres`) — la carte affichait toujours `0/0/0`. Désormais branchée sur les vraies sources.

Sub-config UI dans Paramétrage : grille de toggles colorés, fallback aux 3 métriques par défaut si aucune sélection.

### ⏳ Widget Dashboard — Approbations en attente (PR #91)

Nouvelle section visible sur le tableau de bord qui liste :
- Les prestations en `pending_review` (avec boutons **✅ Approuver** / **❌ Rejeter** si l'utilisateur a la permission `approve_prestation`)
- Les prestations `rejected` à retravailler (avec bouton **↻ Resoumettre** si la permission `request_approval` est accordée)

Pour chaque ligne : titre, client, date de demande, montant, motif de rejet (si applicable). Les boutons d'action déclenchent les transitions du workflow (audit log + notification + re-render).

Le widget est **inscrit dans `DASHBOARD_WIDGETS`** — donc visible/masquable par groupe via le système de permissions widgets existant.

### 🔍 Filtre rapide « Approbation » dans la liste des prestations (PR #91)

Nouveau `<select>` dans les filtres de l'onglet Prestations :
- ⏳ En attente de validation
- 📝 Brouillon
- ❌ Rejetée
- ✅ Validée
- (vide) Toutes approbations

Combinable avec les filtres existants (texte, statut, client, dates).

## Documentation

- **README** : nouvelle section 21 « 🚦 Workflow & écran d'accueil avancé (v2.5) ».
- **RELEASE_v2.5.0.md** : ce fichier (couvre rétroactivement la PR #90 qui n'avait pas de doc).
- **IMPROVEMENTS.md** : entrée v2.5 ajoutée.

---

*© 2025–2026 MARET Davie — Tous droits réservés*
