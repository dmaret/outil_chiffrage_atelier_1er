# v2.11.0 — Import · Export · Modèle CSV uniformisés

**Date :** 28 avril 2026
**Branche :** main

---

## Nouvelles fonctionnalités

### 📦 Triplet Modèle · Import · Export sur tous les onglets base de données

Chaque onglet qui gère une base de données dispose désormais d'un bloc uniforme
avec trois panneaux côte à côte (bleu / gris / vert) :

| Onglet | Était | Maintenant |
|---|---|---|
| Catalogue gestes | ✅ Triplet complet (v2.3) | — inchangé |
| Consommables | ✅ Triplet complet (v2.3) | — inchangé |
| **Stock** | Export seul (bouton inline) | ✅ Triplet complet |
| **Clients** | Aucun CSV | ✅ Triplet complet |
| **Bénéficiaires** | Aucun CSV | ✅ Triplet complet |

---

### 📦 Stock — Import CSV

Nouveau `importStockCSV()` :

- Format CSV : `reference, quantite, prix_unitaire, emplacement`
- Chaque ligne crée un **mouvement « entrée »** daté d'aujourd'hui, injecté dans `mouvements[]` et mis à jour dans `stockActuel{}` (FIFO).
- Glisser-déposer ou sélection de fichier.
- Modèle téléchargeable avec deux exemples.

### 👥 Clients — Export + Import CSV

Nouveau `exportClientsCSV()` + `importClientsCSV()` :

- Format : `nom, tel, email, adresse, notes, tarif_special`
- Import : **ajout** si le nom n'existe pas encore, **mise à jour** des coordonnées si le client existe déjà.
- Export : toute la map `clientsData` avec BOM UTF-8 pour Excel.

### 👤 Bénéficiaires — Export + Import CSV

Nouveau `exportBeneficiairesCSV()` + `importBeneficiairesCSV()` :

- Format : `prenom, nom, date_entree, statut, objectifs, notes`
- Import : skip silencieux si le couple prénom+nom existe déjà (pas de doublon).
- Export : liste complète avec statut et objectifs.

---

## Documentation

- **IMPROVEMENTS.md** : entrée v2.11 ajoutée.
- **RELEASE_v2.11.md** : ce fichier.

---

*© 2025–2026 MARET Davie — Tous droits réservés*
