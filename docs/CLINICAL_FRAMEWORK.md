# 🎭 Framework Clinique — Outil de Chiffrage comme Dispositif d'Évaluation

**Version**: 2.25  
**Philosophie**: L'atelier devient un dispositif d'évaluation clinique du développement psychique et de la santé mentale au travail.

---

## 🎯 Principe Directeur

> **L'atelier ne sert pas la production. La production sert le développement de la personne.**

Le chiffrage et les procédures techniques sont le **prétexte reconnu par l'institution** pour observer :
- La construction mentale
- La capacité d'adaptation  
- Les réactions émotionnelles et psychosomatiques
- La gestion des contradictions et des doubles contraintes
- La trajectoire d'apprentissage

### Fondements théoriques
- **Clinique du travail** (Christophe Dejours) : lien entre travail, identité et santé psychique
- **Psychodynamique du travail** : observation des marges de manœuvre et des stratégies défensives
- **Théorie de l'activité** (Youri Engeström) : écart prescrit ↔ réel révèle les processus cognitifs et émotionnels

---

## 📊 Flux Pivot

```
Prestation chiffrée
    ↓
    ├─→ Client valide l'offre (contrat institutionnel)
    │
    ├─→ Prescrit client (procédure attendue)
    │
    ├─→ CEA crée sa propre procédure (version mentale du travail)
    │
    ├─→ Exécution réelle (gestes, temps, adaptations)
    │
    └─→ Observation clinique (3 niveaux de lecture)
         • Émotions ressenties
         • Doubles contraintes rencontrées
         • Observations comportementales
         • Ressentis corporels
         • Messages reçus (feedback implicite)
```

### Les 3 niveaux de lecture
| Niveau | Description | Exemple |
|--------|-------------|---------|
| **Prescrit client** | Procédure demandée, spécifications attendues | "Assembler 50 pièces en 2h, sans erreur" |
| **Procédure CEA** | Stratégie mentale développée par le participant | "Je fais un test rapide sur 5, puis les 45 autres par lot" |
| **Réel exécuté** | Ce qui s'est effectivement passé + contexte | Temps réel + ajustements, interactions avec l'équipe |

---

## 🔧 Modules Cliniques Implémentés

### **Module A** — Outils Cliniques Flottants ⚡
**Statut**: ✅ Opérationnel (v2.17)  
**Valeur**: Premier impact visible — transforme l'UX immédiatement  
**Effort**: ~3h (implémenté)

#### Outils disponibles
- 🎭 **Émotions** — palette (frustration, colère, fatigue, satisfaction, etc.)
- 👁️ **Observations** — notes libres sur le comportement
- 💬 **Message reçu** — feedback implicite ou direct reçu
- 🌀 **Double contrainte** — injonctions contradictoires repérées
- 🤝 **Ressenti corporel** — manifestations physiques (tension, fatigue, énergie)

#### Caractéristiques
✅ Bouton 🎭 toujours visible sur prestation active  
✅ Horodatés automatiquement  
✅ Liés à prestation + bénéficiaire  
✅ Sauvegarde en localStorage  
✅ Accessible sans formation clinique préalable

---

### **Module B** — Comparateur 3 Niveaux 📊
**Statut**: ✅ Opérationnel (v2.18)  
**Valeur**: Cœur du dispositif — structure l'évaluation  
**Effort**: ~4h (implémenté)

#### Fonctionnalité
Affiche côte à côte :
- Prescrit client (colonnes spécification)
- Procédure CEA (colonnes stratégie mentale)
- Réel exécuté (colonnes résultat)

#### Analyse des écarts
- Diff visuel : ▲ (sur-performance), ▼ (sous-performance), = (conforme)
- Calcul auto du delta en % et en valeur
- Couleurs : vert (conforme), orange (caution), rouge (critique)

#### Espace de réflexivité
> "Pourquoi cet écart entre le prescrit et ma stratégie ?"  
> "Pourquoi le réel diffère de ma procédure ?"

- Questions guidées intégrées
- Espace pour saisir la réflexion
- Archivé avec la prestation

---

### **Module C** — Timeline Clinique 📈
**Statut**: ✅ Opérationnel (v2.19)  
**Valeur**: Vue longitudinale — alimente le suivi de personne  
**Effort**: ~3h (implémenté)

#### Fonctionnalité
Affiche chronologiquement :
- Tous les inputs cliniques d'un bénéficiaire
- Codés par type (émotion, observation, double contrainte, etc.)
- Icônes visuelles pour lecture rapide

#### Détection de patterns
- **Top émotions** — émotions dominantes sur la période
- **Double contraintes récurrentes** — injonctions qui reviennent
- **Ressentis corporels** — tendances physiques
- **Messages reçus** — feedback patterns

#### Cas d'usage
✅ Suivi de progression du bénéficiaire  
✅ Identification des phases critiques  
✅ Alimente le dossier clinique  
✅ Base pour débriefing et ajustements pédagogiques

---

### **Module D** — Glossaire Clinique 📚
**Statut**: ✅ Opérationnel (v2.20)  
**Valeur**: Démocratise les outils — accessible aux non-cliniciens  
**Effort**: ~2h (implémenté)

#### Concepts intégrés
| Concept | Définition rapide | Exemple atelier |
|---------|------------------|-----------------|
| **Double contrainte** | Injonctions contradictoires sans échappatoire | "Sois rapide" + "pas d'erreur tolérée" |
| **Souffrance au travail** | Écart prescrit ↔ réel non géré | Procédure impossible à suivre → blocage |
| **Stratégies défensives** | Adaptations psychiques face au stress | Perfectionnisme pour contrôler l'anxiété |
| **Marge de manœuvre** | Liberté d'adaptation dans la tâche | Possibilité de demander de l'aide |
| **Ressenti corporel** | Manifestations physiques de l'état psychique | Tension aux épaules = stress/concentration |

#### Implémentation
✅ Cliquable partout en tooltip  
✅ Exemples spécifiques à l'atelier  
✅ Pas de jargon inutile  
✅ Lié aux modules A-C

---

### **Module E** — Débriefing Prestation 📋
**Statut**: ✅ Opérationnel (v2.25)  
**Valeur**: Boucle de retour — crée la réflexivité  
**Effort**: ~2h (implémenté)

#### Fonctionnalité
Bouton 📋 sur prestation marquée "terminée" :

Questions guidées :
- ✅ Qu'as-tu ressenti pendant la prestation ?
- ✅ Y a-t-il eu des moments difficiles ? Pourquoi ?
- ✅ Comment as-tu adapté ta stratégie face aux obstacles ?
- ✅ Qu'as-tu appris sur toi-même ?
- ✅ Conseil à toi-même pour la prochaine fois ?

#### Archivage
✅ Réponses sauvegardées dans dossier bénéficiaire  
✅ Historique accessible en Timeline (Module C)  
✅ Alimente les patterns de réflexivité

---

## 🎯 Utilisation Intégrée : Cas Concret

### Scénario : Prestation d'assemblage électronique
**Participant** : Pierre, apprenant en formation CEA  
**Durée** : 2h  
**Prescrit** : Assembler 50 pièces sans erreur en 1h30

#### Phase 1 — Prestation active
- Pierre ouvre la prestation (Module A : outils cliniques visibles)
- À t+15min : frustration face à la complexité → saisit 🎭 Émotion = frustration
- À t+45min : douleur dans le poignet → saisit 🤝 Ressenti corporel
- À t+90min : Encadrant intervient → saisit 💬 Message = "Tu vas trop vite"
- Pierre adapte sa stratégie (reconnaissance de double contrainte : rapidité + qualité)

#### Phase 2 — Comparaison
- Module B affiche :
  - Prescrit : 50 pièces/1h30 (spec qualité 100%)
  - Procédure CEA : Pierre a fait par lot (5+5+...) = plus de contrôle mental
  - Réel : 48 pièces/2h10 (2 pièces défectueuses détectées)
  - ➜ Écart visible : marge de manœuvre insuffisante vs spécification

#### Phase 3 — Débriefing
- Pierre clique sur "Débriefing" (Module E)
- Répond aux 5 questions guidées
- Identifie seul : "J'ai préféré la qualité à la vitesse, c'est ma stratégie"

#### Phase 4 — Suivi
- Encadrant consulte Timeline (Module C) de Pierre
- Sur les 10 dernières prestations : frustration → amélioration progressive
- Pattern : frustration initiale, adaptation rapide, auto-régulation efficace
- Conclusion clinique : Excellente capacité d'adaptation + besoin de cadre clair

---

## 🛠️ Intégration dans l'Interface

### Points d'activation
| Écran | Action | Module |
|-------|--------|--------|
| Calculateur (prestation active) | Bouton 🎭 en FAB | A |
| Prestations (vue comparaison) | Onglet "Analyse 3-niveaux" | B |
| Accompagnement > Bénéficiaires | Bouton 📊 Timeline | C |
| Partout (Aide) | Glossaire cliquable | D |
| Prestation marquée "terminée" | Bouton 📋 Débriefing | E |

### Principe d'accessibilité
✅ Un encadrant sans formation Dejours doit pouvoir utiliser tous les modules  
✅ Les questions guidées et exemples font le travail théorique  
✅ Les icônes et couleurs facilitent la lecture rapide  
✅ Le glossaire explique en langage simple

---

## 📈 Roadmap de Déploiement

| Version | Focus | Modules |
|---------|-------|---------|
| v2.17 | Flottants cliniques | A |
| v2.18 | Comparateur 3-niveaux | B |
| v2.19 | Timeline clinique | C |
| v2.20 | Glossaire clinique | D |
| v2.21 | Débriefing prestation | E |
| v2.22-v2.25 | Intégrations cross-modules + Analytics |  |

**Statut actuel**: ✅ Tous les modules A-E opérationnels en v2.25

---

## 🔍 Validation Utilisateur

### Pour les encadrants
- ✅ Interface intuitive sans prérequis théorique
- ✅ Raccourcis clavier et FAB pour rapidité
- ✅ Export des observations pour dossier

### Pour l'institution
- ✅ Traçabilité complète des observations
- ✅ Dossier clinique structuré par bénéficiaire
- ✅ Base de données pour évaluation d'impact

### Pour le bénéficiaire
- ✅ Espace de réflexivité clairement nommé
- ✅ Reconnaissance de sa stratégie mentale
- ✅ Progression visible (Timeline)

---

## 📚 Ressources

- **RELEASE_v2.25.md** — Vue d'ensemble technique
- **README.md** — Guide utilisateur complet (25 sections)
- **Aide intégrée** — Section Accompagnement → Aide interactive
- **Glossaire** — Concepts expliqués dans l'app (Module D)

---

*Framework clinique v2.25 — Outil d'évaluation du développement psychique au travail*  
*Dernière mise à jour : 30 avril 2026*
