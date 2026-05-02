# 💻 Utilisation locale sur Mac (sans GitHub)

Ce document explique comment **récupérer l'application sur ton Mac et travailler dessus indépendamment de GitHub**, par exemple si tu décides de fermer ton compte ou simplement de ne plus dépendre d'un service externe.

> 🔑 **À retenir** : `index.html` est un fichier autonome. Une fois sur ton Mac, tu peux double-cliquer dessus → ça s'ouvre dans ton navigateur → toutes les fonctionnalités marchent (localStorage côté client, aucun serveur requis).

---

## Étape 1 — Cloner le repo une fois

Ouvre **Terminal** (Applications → Utilitaires → Terminal) et copie-colle :

```bash
cd ~/Documents
git clone https://github.com/dmaret/outil_chiffrage_atelier_1er.git
cd outil_chiffrage_atelier_1er
```

Tu obtiens un dossier `~/Documents/outil_chiffrage_atelier_1er/` qui contient **tout** : code, historique des 580+ commits, toutes les branches, tous les tags. C'est une copie strictement complète.

> Si tu n'as pas `git` installé, le Mac te le proposera. Sinon : `xcode-select --install`.

## Étape 2 — Vérifier que ça marche en local

Toujours dans Terminal :

```bash
open index.html
```

Ton navigateur par défaut s'ouvre sur l'application. **Aucun serveur, aucune connexion internet nécessaire.** Tu peux fermer le Wifi, ça continue de fonctionner.

---

## Trois scénarios d'usage

### A. Mac uniquement, sans plus jamais toucher à GitHub

Tu peux supprimer le lien vers GitHub :

```bash
git remote remove origin
```

À partir de là, `git push` ne fait plus rien (pas de remote configuré). Tu continues à committer en local, ton historique reste intact, mais rien n'est envoyé ailleurs. **Aucune action automatique vers GitHub n'est possible.**

Pour annuler ce changement plus tard : `git remote add origin https://github.com/dmaret/outil_chiffrage_atelier_1er.git`

### B. Mac + sauvegarde sur disque externe / iCloud

Mets le dossier cloné dans un emplacement déjà sauvegardé :

```bash
# Option iCloud Drive
mv ~/Documents/outil_chiffrage_atelier_1er ~/Library/Mobile\ Documents/com~apple~CloudDocs/

# Option Dropbox
mv ~/Documents/outil_chiffrage_atelier_1er ~/Dropbox/

# Option disque externe (remplace VOLUME par le nom de ton disque)
mv ~/Documents/outil_chiffrage_atelier_1er /Volumes/VOLUME/
```

**Time Machine** sauvegarde déjà tout `~/Documents/` automatiquement si tu l'as activé.

### C. Mac + autre hébergeur git (ni GitHub ni service américain)

Tu peux pointer vers GitLab, Codeberg, un Gitea/Forgejo auto-hébergé, ou même un NAS. Exemple avec [Codeberg](https://codeberg.org) (associatif, basé en Allemagne) :

```bash
# Après avoir créé un repo vide sur Codeberg
git remote remove origin
git remote add origin https://codeberg.org/TON_USER/outil_chiffrage_atelier_1er.git
git push -u origin main
```

---

## Travailler en local au quotidien

| Action | Commande |
|---|---|
| Ouvrir l'app | `open index.html` |
| Voir les modifs en cours | `git status` |
| Sauvegarder une modif | `git add -A && git commit -m "ma modif"` |
| Voir l'historique | `git log --oneline` |
| Revenir à une version précédente d'un fichier | `git checkout HEAD~1 -- index.html` |
| Lister les versions taggées | `git tag` |

---

## Si tu veux travailler sans git du tout

Tu peux supprimer le dossier `.git/` et garder uniquement les fichiers :

```bash
rm -rf .git
```

⚠️ **Tu perds l'historique** (impossible de revenir en arrière). Garde au moins une copie zippée des `RELEASE_v*.md` qui résument chaque version. À ne faire que si tu es certain de ne plus toucher au code.

---

## Conserver l'app utilisable même sans aucun outil

L'application est une page HTML statique. Au minimum absolu, tu n'as besoin que de :

- `index.html`
- `manifest.json` (pour le mode PWA)
- `sw.js` (pour le mode hors-ligne du navigateur)

Tu peux mettre ces 3 fichiers sur une **clé USB**, sur **n'importe quel hébergement statique gratuit** (Netlify, Vercel, GitHub Pages, ton hébergeur perso…), ou même les envoyer en pièce jointe par email. Tant que quelqu'un peut ouvrir `index.html` dans un navigateur récent (Safari/Chrome/Firefox 2022+), l'app fonctionne intégralement.

---

## Sauvegarde des données utilisateur

Important à connaître : **les prestations, le catalogue, le stock, les clients sont stockés dans le `localStorage` du navigateur**, pas dans les fichiers. Ces données sont **liées à ton navigateur sur ta machine**, pas au repo.

Pour les sauvegarder :
- L'app dispose d'un export JSON (Paramétrage → Exporter les données).
- Tu peux aussi les copier manuellement via la console DevTools : `copy(JSON.stringify(localStorage))`.

Si tu changes d'ordinateur ou de navigateur, **importe ce JSON** sur la nouvelle machine sinon tu repars d'une base vide.

---

*© 2025–2026 MARET Davie — Tous droits réservés*
