# RELEASE v2.20 — Glossaire clinique (Module D)

> Date : 2026-04-30 — Module D de la suite clinique du travail.

## 🎯 Objectif

Fournir une **ressource d'apprentissage intégrée** pour les termes cliniques utilisés tout au long de la saisie et relecture des inputs cliniques. Les utilisateurs peuvent cliquer sur des termes pour consulter des définitions, exemples, et accéder à des termes liés.

---

## 🔍 Fonctionnalités principales

### 📖 Glossaire interactif complet
Le glossaire couvre 9 termes clés + variantes :
- **Double contrainte** 🌀 — Demandes contradictoires (injonction paradoxale)
- **Ressenti corporel** 🤝 — Sensations physiques et émotionnelles
- **Charge mentale** 🧠 — Efforts cognitifs et décisionnels
- **Émotion** 😊 — État affectif momentané
- **Observation** 👁️ — Fait objectif noté
- **Message reçu** 📨 — Communication reçue
- **Intensité** ⭐ — Niveau d'amplitude (1–5)
- **Pattern** 🔄 — Motif récurrent
- **Timeline clinique** 📊 — Historique chronologique

### 💬 Tooltips contextuels
- **Activation** : Cliquer sur les termes mots-clés dans la Timeline clinique (Module C)
- **Affichage** : Tooltip flottant avec bordure terracotta, iconographie, définition claire
- **Navigation** : Chaque tooltip inclut des liens vers les **termes liés** pour explorer les connexions
- **Fermeture** : Bouton ✕ ou clic en dehors du tooltip

### 🎨 Intégration visuelle
- Termes identifiés par **underline pointillé** terracotta dans la Timeline
- Curseur `help` au survol
- Dark mode : couleurs adaptées (`var(--terra-light)`, `var(--terra-accent)`)
- Animations fluides (opacité + translate)

### 📚 Contenu structuré
Chaque entrée du glossaire contient :
- **Terme** et icône associée
- **Définition** claire et non-technique
- **Exemples** concrets (liste)
- **Termes liés** cliquables (sauf pour les références de types)

---

## 🔗 Intégrations

### Module A (v2.17)
Les types d'inputs cliniques sont définis dans le glossaire avec références rapides.

### Module C (v2.19)
Les termes affichés dans la Timeline deviennent cliquables → tooltip glossaire instantanée.

### Modules B & E (à venir)
Les déviations (Module B) et débriefings (Module E) pourront enrichir les patterns et proposer des termes pertinents à consulter.

---

## 🛠️ Implémentation technique

- **Stockage** : Glossaire stocké en constante JS `CLINICAL_GLOSSARY` (15+ entrées)
- **DOM** : Tooltips générés dynamiquement (pas de préchargement HTML)
- **Événements** : Event delegation via `click` sur `.glossary-term`
- **Positionnement** : Fixed, aligné sous le terme cliqué
- **Accessibilité** : 
  - Termes identifiés par `data-term` pour sémantique
  - `aria-label` sur boutons de fermeture
  - Contrastes WCAG AA (dark mode inclus)
- **Performance** : Lazy tooltip creation, cleanup automatique au clic externe

---

## 🎓 Exemple d'usage

1. Utilisateur consulte la **Timeline clinique** d'un bénéficiaire (Module C)
2. Remarque un terme en terracotta souligné : « Double contrainte »
3. Clique dessus → Tooltip s'affiche avec définition + exemples
4. Clique sur le terme lié « Charge mentale » → Nouveau tooltip
5. Ferme via bouton ✕ ou clic ailleurs

---

## ✅ Tests validés

- ✅ Tooltip s'affiche/disparaît correctement
- ✅ Navigation entre termes liés fluide
- ✅ Dark mode appliqué correctement
- ✅ Fermeture au clic externe
- ✅ Pas de duplication de tooltips
- ✅ Responsive (positionnement adapté sur petit écran)

---

## 📝 Notes

- Le glossaire est **extensible** : ajouter des entrées dans `CLINICAL_GLOSSARY` suffit
- Les références de type (`clinical-type-*`) renvoient aux défintions complètes pour éviter la duplication
- Aucune dépendance externe (vanilla JS)
