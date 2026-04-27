# v2.4.0 — Outil Complet Atelier - La Pallanterie

**Date :** 26 avril 2026
**Commit :** a36a887
**Branche :** main

---

## Nouvelles fonctionnalités — Lot 2 robustesse des données

### 🔐 Backup chiffré (Web Crypto AES-GCM 256)

Nouveau bouton **« Export chiffré »** dans Paramétrage → Sauvegarde & Restauration.

- Demande un mot de passe (8 car. minimum, double saisie pour confirmation).
- Dérive une clé AES-GCM 256 bits via **PBKDF2-SHA256, 200 000 itérations**.
- Salt aléatoire 16 octets, IV aléatoire 12 octets — uniques par fichier.
- Format de sortie : enveloppe JSON `{ v, kdf, iter, alg, salt, iv, ct }` en base64.
- Extension de fichier : `.encbackup`.

**Import auto-détecte le format** : si le JSON contient `alg: 'AES-GCM-256'`, il demande le mot de passe et déchiffre. Sinon il délègue au flux d'import existant. Mauvais mot de passe → toast d'erreur sans crash.

Toute opération est tracée dans l'audit log (`logAction`).

### 💾 Sauvegardes automatiques en localStorage

Nouveau bloc « Sauvegarde automatique en arrière-plan » dans Paramétrage :

| Réglage | Options |
|---|---|
| Activer | toggle on/off |
| Intervalle | 1 heure / 6 heures / 24 heures |
| Sauvegarder maintenant | bouton manuel |
| Lister | affiche les snapshots existants |

- **Max 3 snapshots rotatifs** (purge automatique des plus anciens).
- Stockés en clair dans `localStorage` (sécurité = celle de la machine ; pour un transfert, utiliser l'export chiffré).
- Chaque snapshot affiche **date, taille en Ko, et 3 actions** : ↻ Restaurer · 📤 Exporter · 🗑️ Supprimer.
- Échec quota géré via `safeSetItem` — l'utilisateur est notifié sans crash.

### 🔔 Notifications navigateur

Nouvelle section dans Paramétrage avec toggle **Activer**, badge d'état de la permission navigateur, bouton **🧪 Tester**.

- Utilise l'API `Notification` standard.
- Le toggle déclenche `Notification.requestPermission()` à la première activation.
- **Hook dans `checkAndShowAlerts`** : seules les alertes danger (stocks bas, devis expirés, paiements en retard, surcharge capacité) déclenchent une notification — pas les avertissements souples.
- **Anti-spam** : chaque alerte est throttlée à **1 notification par jour par tag** via `localStorage.notifSentHistory`.
- Fonctionnent en arrière-plan tant que le navigateur tourne.

**Détection nouvelle : paiements en retard.** `detectOverduePayments()` repère les prestations facturées sans encaissement enregistré depuis plus de 45 jours.

### ✅ Workflow d'approbation (orthogonal au statut métier)

Nouveau champ `approvalState` sur les prestations, **distinct du `statut` métier** (devis/valide/facture…) :

| État | Badge | Signification |
|---|---|---|
| `approved` | ✅ Validée | Défaut rétro-compatible — opérationnel |
| `draft` | 📝 Brouillon | En cours, pas encore soumise |
| `pending_review` | ⏳ Relecture | Soumise, en attente de validation |
| `rejected` | ❌ Rejetée | Refusée, motif obligatoire |

**Deux nouvelles permissions RBAC :**
- `request_approval` : MSP + ADMIN (passer de draft/rejected → pending_review)
- `approve_prestation` : ADMIN seul (pending → approved ou rejected)

**Trois transitions auditées :**
- `requestPrestationApproval(id)` — demande de validation
- `approvePrestation(id)` — approbation, capture `approvedBy` + `approvedAt`
- `rejectPrestation(id)` — rejet avec motif (`approvalRejectionReason`, max 500 car.)

**Boutons d'action contextuels** dans la liste des prestations :
- État `draft` ou `rejected` + permission → « ✋ Demander validation »
- État `pending_review` + permission ADMIN → « ✅ Approuver » et « ❌ Rejeter »

**Migration zero** : les prestations existantes sans champ `approvalState` sont traitées comme `'approved'`. Aucune action requise sur les données legacy.

## Notes techniques

- **Web Crypto** : utilise `crypto.subtle` (standard W3C, supporté par tous les navigateurs modernes en HTTPS / localhost). Tolère l'absence (toast d'erreur, pas de crash).
- **Auto-backup** : `setInterval` configuré au chargement, redémarré si l'utilisateur change l'intervalle.
- **IndexedDB** : la migration `localStorage` → `IndexedDB` est **délibérément différée** à une session dédiée. Elle toucherait les 162 call-sites de `localStorage` du code et nécessite une stratégie de transition (dual-write, async/await partout) qu'on ne peut pas combiner à d'autres features sans risque de régression silencieuse.

## Documentation

- **README** : nouvelle section 20 « 🛡️ Robustesse des données (v2.4) ».
- **RELEASE_v2.4.0.md** : ce fichier.
- **IMPROVEMENTS.md** : entrée v2.4 ajoutée.

---

*© 2025–2026 MARET Davie — Tous droits réservés*
