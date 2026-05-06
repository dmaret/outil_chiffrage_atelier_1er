# 🤝 Guide de Contribution

Merci de votre intérêt pour contribuer à **Outil Complet Atelier - La Pallanterie**!

---

## 📋 Avant de Commencer

### Prerequisites
- Git configuré localement
- Node.js 14+ (optionnel, pour serveur)
- Connaissance HTML5, CSS3, JavaScript vanilla

### Conventions
- **Langue**: Français pour documentation et comments
- **Commits**: Messages en français, descriptifs
- **Code style**: 2 espaces indentation, semicolons obligatoires
- **Branches**: `feature/`, `bugfix/`, `docs/`, `refactor/`

---

## 🔄 Workflow de Contribution

### 1️⃣ Fork et Clone

```bash
# Forker le projet sur GitHub
# Puis cloner votre fork
git clone https://github.com/VOTRE-USERNAME/outil_chiffrage_atelier_1er.git
cd outil_chiffrage_atelier_1er

# Ajouter remote upstream
git remote add upstream https://github.com/dmaret/outil_chiffrage_atelier_1er.git
```

### 2️⃣ Créer une Branche Feature

```bash
# Mettre à jour main depuis upstream
git fetch upstream
git checkout main
git merge upstream/main

# Créer branche feature
git checkout -b feature/ma-fonctionnalite

# Ou bugfix
git checkout -b bugfix/correction-bug

# Ou documentation
git checkout -b docs/amelioration-docs
```

### 3️⃣ Effectuer les Changements

```bash
# Développer votre fonctionnalité
# Tester localement
# Commits réguliers

git add .
git commit -m "feat: ajouter nouvelle fonctionnalité"
git commit -m "fix: corriger bug spécifique"
git commit -m "docs: améliorer documentation"
```

### 4️⃣ Pousser et Pull Request

```bash
# Pousser votre branche
git push origin feature/ma-fonctionnalite

# Créer Pull Request sur GitHub
# Title: "feat: description courte"
# Body: Décrire changements, motivations, tests
```

---

## 💻 Développement Local

### Serveur de développement

```bash
# Avec Python
python -m http.server 8000

# Avec Node.js / npm
npx http-server

# Puis accéder
http://localhost:8000
```

### Tester dans navigateur

- **Chrome DevTools**: F12 → Console pour vérifier erreurs
- **Performance**: Onglet Network pour bundle size
- **Mobile**: Responsive Design Mode (Ctrl+Shift+M)

---

## ✅ Checklist avant Commit

- [ ] Code testé localement (console sans erreurs)
- [ ] Fonctionnalité testée sur mobile
- [ ] Pas de données de test laissées
- [ ] Comments ajoutés si code complexe
- [ ] Pas de console.log() de debug
- [ ] Commit message descriptif
- [ ] Branche à jour avec main

---

## 📝 Règles de Commits

### Format obligatoire

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types acceptés

- `feat`: Nouvelle fonctionnalité
- `fix`: Correction bug
- `docs`: Mise à jour documentation
- `style`: Formatage (pas de changement logique)
- `refactor`: Restructuration code
- `perf`: Amélioration performance
- `test`: Ajout tests
- `chore`: Tâches maintenance

### Exemples

```
feat(calculateur): ajouter simulation volumes
fix(stock): corriger calcul FIFO avec transferts
docs(readme): améliorer guide démarrage
refactor(dashboard): simplifier rendu KPIs
```

---

## 🧪 Tests Avant PR

### Tests manuels requis

```
✅ Dashboard
  - [ ] KPIs affichés correctement
  - [ ] Alertes visibles si devis en attente
  - [ ] Graphiques rendus

✅ Calculateur
  - [ ] Sections dans le bon ordre
  - [ ] Calculs corrects (coût + marge)
  - [ ] Sauvegarde fonctionne

✅ Stock
  - [ ] Mouvements FIFO corrects
  - [ ] Valorisation correcte
  - [ ] Transferts possibles

✅ Mobile
  - [ ] Layout responsive
  - [ ] Pas de débordement
  - [ ] Touch events fonctionnent

✅ Performance
  - [ ] Pas de lag lors interactions
  - [ ] Load time acceptable (< 2s)
  - [ ] Pas de memory leaks
```

### Console sans erreurs

```javascript
// Avant de PR, vérifier:
// 1. Pas d'erreurs dans Console
// 2. Pas de warnings critiques
// 3. Network tab - pas de 404
```

---

## 📖 Améliorer la Documentation

### Documentation importante à mettre à jour

- **README.md** - Si changement de features
- **STRUCTURE.md** - Si changement architecture
- **CHANGELOG.md** - Nouvelles versions
- **Commentaires code** - Pour logique complexe

### Format documentation

```markdown
# Titre descriptif

## Contexte
Expliquer pourquoi ce changement

## Changements
- Point 1
- Point 2

## Impact
- Sur quel(les) module(s)
- Comportement attendu
```

---

## 🐛 Signaler un Bug

### Créer une Issue GitHub

```markdown
**Description**
Décrire le bug clairement

**Étapes pour reproduire**
1. Aller à...
2. Cliquer sur...
3. Observer...

**Comportement attendu**
Ce qui devrait se passer

**Comportement actuel**
Ce qui se passe réellement

**Environnement**
- Navigateur: Chrome 90
- Système: Windows 10
- Version: 2.26
```

---

## 💡 Suggestions de Fonctionnalités

### Créer une Discussion ou Issue

```markdown
**Description**
Décrire la fonctionnalité souhaitée

**Bénéfices**
- Améliore...
- Permet...

**Alternatives envisagées**
Autres approches possibles

**Contexte**
Pourquoi c'est important
```

---

## 🎯 Bonnes Pratiques

### Code
- Utiliser noms explicites (variables, fonctions)
- Garder fonctions courtes (< 50 lignes)
- DRY - Ne pas répéter code
- Comments pour "pourquoi", pas "quoi"

### Git
- Commits atomiques (un changement = un commit)
- Messages clairs et descriptifs
- Pas de commits merge
- Rebase avant PR si nécessaire

### Tests
- Tester sur vrais données
- Tester sur mobile
- Tester offline (PWA)
- Vérifier console sans erreurs

---

## 📋 Process de Review

Après PR créée:

1. **Vérification automatique** - Linter, build
2. **Review code** - Feedback sur changements
3. **Approbation** - Minimum 1 approval
4. **Merge** - Merge automatique si CI passe

### Répondre aux commentaires

```bash
# Modifier code selon feedback
git add .
git commit -m "Review feedback: correction points X et Y"
git push origin feature/ma-fonctionnalite

# PR se met à jour automatiquement
```

---

## 🚀 Après Merge

Après merge dans main:

- PR auto-fermée
- Branche feature peut être supprimée
- Changements visibles en production dans 2-5 min (GitHub Pages)

```bash
# Cleanup local
git checkout main
git pull upstream main
git branch -d feature/ma-fonctionnalite
```

---

## 🆘 Besoin d'Aide?

- **Questions techniques**: Ouvrir Discussion
- **Bug signalé**: Créer Issue avec `bug` label
- **Feature request**: Créer Discussion avec idée
- **Direct contact**: Contacter mainteneur

---

## 📞 Contacts

- **Mainteneur**: Davie MARET
- **Email**: [contact info]
- **GitHub**: @dmaret

---

## 📄 Licence

En contribuant, vous acceptez que votre code soit publié sous licence MIT.

---

**Merci pour votre contribution!** 🎉

Vos améliorations rendent cet outil meilleur pour tous.
