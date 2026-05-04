# v2.2.0 — Outil Complet Atelier - La Pallanterie

**Date :** 26 avril 2026
**Commit :** ac88125
**Branche :** main

---

## Nouvelles fonctionnalités

### Accessibilité (ARIA)
- **Modales accessibles** — `role="dialog"` + `aria-modal="true"` + `aria-labelledby` sur 15 modales (PIN, création geste, options PDF, lecture flux d'apprentissage, raccourcis clavier, comparateur, suivi paiement…). Les lecteurs d'écran annoncent l'ouverture et le titre de chaque modale.
- **Boutons-icône labellés** — `aria-label` sur les boutons de fermeture qui n'avaient que `&times;`.
- **Labels formulaire** — `<label for=...>` + `aria-describedby` (hint visuel) sur les champs de création de geste.

### Validation des inputs
- **Création rapide de geste** — `qg-code` (`pattern="[A-Za-z]{2,4}-[0-9]{1,3}"`, `maxlength="10"`, `required`), `qg-desc` (`required`, 3–200 car.), `qg-notes` (`maxlength="500"`). Plus aucun code mal formé n'arrive en localStorage.

### Performance
- **Lazy loading** — `loading="lazy"` sur les previews d'images d'attachements (PR #81).

## Améliorations

### CSS
- **Échelle d'espacement canonique** dans `:root` — `--space-xs` (4px) → `--space-2xl` (28px).
- **Tokens visuels** ajoutés — `--shadow-card`, `--shadow-modal`, `--border-radius-pill`, `--color-success-alt`, `--color-on-primary`, `--color-overlay`.
- Les valeurs en dur (`10px`, `8px`, `rgba(0,0,0,0.5)`…) sont conservées telles quelles pour éviter toute régression visuelle ; les variables sont prêtes pour les futurs call-sites.

### JavaScript — Helpers de déduplication
Six fonctions ajoutées à côté de `safeSetItem`, sans réécriture des call-sites existants :

| Helper | Rôle |
|---|---|
| `safeJSONSet(key, value)` | Sérialise + persiste avec gestion quota |
| `safeJSONGet(key, fallback)` | Lit + parse JSON, fallback si corrompu |
| `openModal(id, display)` | Affiche une modale par id |
| `closeModal(id)` | Masque une modale par id |
| `getInputValue(id, default)` | Lit + trim une valeur de champ |
| `isValidPattern(value, regex)` | Validation regex |

## Documentation

- **JSDoc** — `@param`/`@returns` sur les 5 fonctions critiques de l'app : `migrateLocalStorage`, `loadFromStorage`, `saveToStorage`, `calculateTotal`, `genererDevis`.
- **README** — nouvelle section 18 « ♿ Accessibilité & qualité du code » avec tables des helpers et des contraintes de validation.
- **IMPROVEMENTS.md** — étendu avec le détail du refactor.

## Notes techniques

- **Réconciliation avec PR #81** — la PR #81 a minifié `index.html` en une seule ligne, rendant le merge automatique de cette branche impossible (conflit total). Le `loading="lazy"` introduit par #81 a été cherry-picked sur la version pretty-printed, et le merge a été réalisé en gardant la version lisible (stratégie `-X ours`). La maintenance et la lecture du code restent ainsi possibles.

---

*© 2025–2026 MARET Davie — Tous droits réservés*
