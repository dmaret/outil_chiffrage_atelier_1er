# 📦 Informations de Version

## Version Actuelle

**Version**: 2.27
**Date**: 6 mai 2026
**Statut**: Stable ✅
**Mainteneur**: Davie MARET

---

## Version Info

### 2.26 (Stable)
- Date: 2026-05-05
- Build: Production
- Size: 2.2 MB
- Status: Ready for production ✅

#### Changements clés
- Réorganisation sections calculateur
- Interface CEA Formation
- Corrections stabilité (console errors, accessibility)
- Documentation complète

#### Features actives
- ✅ Chiffrage financier complet
- ✅ Gestion stock FIFO
- ✅ Dashboard avec KPIs
- ✅ Formation Admin + Logistique
- ✅ Planification Gantt
- ✅ Export PDF
- ✅ Mode PWA offline

#### Browser Support
- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅
- Mobile browsers ✅

---

## Historique de Version

```
v2.26 (2026-05-05) ← ACTUELLE
├── v2.25 (2026-04-28)
├── v2.24 (2026-04-20)
├── v2.23 (2026-04-15)
├── v2.22 (2026-04-10)
├── v2.21 (2026-04-05)
├── v2.20 (2026-03-30)
├── v2.10 (2026-03-15)
└── v2.00 (2026-02-01)
```

---

## Build Info

### Development
- Node.js: 14+ (optionnel)
- Package manager: npm
- Build tool: Aucun (vanilla JS)
- Dev server: `http-server` ou équivalent

### Production
- Hosting: GitHub Pages
- CDN: jsDelivr (dependencies)
- HTTPS: Oui ✅
- Compression: Gzip
- Cache: Service Worker

### Métriques de Build

| Métrique | Valeur |
|----------|--------|
| Bundle size | 2.2 MB |
| Gzipped | 450 KB |
| Parse time | < 200ms |
| Load time | < 2s (LTE) |
| JS size | 1.8 MB |
| CSS size | 350 KB |
| HTML size | 50 KB |

---

## Dépendances Externes

### Intégrées (CDN)
```
📦 Chart.js 3.x
   └─ Graphiques et visualisations
   
📦 Roboto Font (Google Fonts)
   └─ Typographie
   
📦 Material Icons
   └─ Icônes systèmes
```

### Pas de framework
- ❌ React, Vue, Angular
- ✅ Vanilla JavaScript ES6+
- ✅ Pas de bundler (Webpack, Parcel)
- ✅ Pas de transpiler (Babel)

---

## Taille et Performance

### Breakdown
```
├── HTML/CSS/JS: 2.2 MB
│   ├── JavaScript: 1.8 MB (inline)
│   ├── CSS: 350 KB (inline)
│   └── HTML: 50 KB (structure)
│
├── Assets:
│   ├── Icons: Material Icons (CDN)
│   ├── Fonts: Roboto (Google Fonts CDN)
│   └── Charts: Chart.js (CDN)
│
└── PWA:
    ├── Service Worker: 5 KB
    ├── Manifest: 1 KB
    └── Cache: Configurable
```

### Performance Metrics
```
Metric           Target    Current
─────────────────────────────────
First Contentful Paint:  < 1s      ✅ 800ms
Largest Contentful:      < 2.5s    ✅ 1.8s
Cumulative Layout Shift: < 0.1     ✅ 0.08
Speed Index:            < 3s      ✅ 2.2s
```

---

## API & Integration

### Pas d'API externe requise
- ❌ Pas de serveur backend obligatoire
- ✅ LocalStorage pour données
- ✅ IndexedDB pour volumes
- ✅ Webhooks optionnels (Phase 2)

### Service Worker
- Offline mode supporté
- Cache First strategy
- Auto-update disponible

---

## Compatibilité de Version

### Forward Compatibility
- LocalStorage format: Stable v1
- URL schemes: Stables
- API interne: Extensible

### Backward Compatibility
- Données v2.20+: Supportées ✅
- Données v2.00: Compatibles ✅
- Données v1.0: Avec migration

---

## Notes de Sécurité

### Current Version (2.26)
- ✅ Pas de données sensibles transmises
- ✅ LocalStorage encryption ready (Phase 2)
- ✅ PIN local only (no hashing v2.26)
- ✅ HTTPS recommended
- ✅ No external API calls by default

### Planned (Phase 2)
- 🚧 OAuth authentication
- 🚧 Cloud sync encryption
- 🚧 Advanced ACLs

---

## Statut des Features

### ✅ Implémenté et Stable
- [x] Dashboard complet
- [x] Calculateur financier
- [x] Gestion stock FIFO
- [x] Catalogue gestes
- [x] Consommables
- [x] Prestations (devis/factures)
- [x] Clients
- [x] Statistiques
- [x] Configuration
- [x] Calculateur visuel
- [x] Planification Gantt
- [x] Procédures
- [x] Formation Admin
- [x] Formation Logistique
- [x] Accompagnement CEA
- [x] Historique
- [x] Guide utilisateur
- [x] Mode presentation
- [x] Keyboard shortcuts
- [x] PWA offline mode
- [x] Export PDF

### 🚧 En Développement
- [ ] Cloud sync
- [ ] OAuth authentication
- [ ] Advanced reporting
- [ ] Team collaboration

### 📋 Prévu (Roadmap)
- [ ] Mobile app native
- [ ] Multi-language (EN, DE, IT)
- [ ] Machine learning pricing
- [ ] Advanced analytics
- [ ] Real-time collaboration

---

## Mise à Jour et Upgrade

### Depuis v2.20 → v2.26
```bash
# Aucune action requise
# Données sauvegardées automatiquement
# App se met à jour via cache
```

### Vers futures versions
- Backward compatible maintenu
- Migration data automatique si nécessaire
- Notes de breaking changes dans CHANGELOG

---

## Support et Maintenance

### Maintenance
- Fixes de bugs: Rapidement
- Features: Selon roadmap
- Support: Communauté GitHub

### Reporting
- Bugs: GitHub Issues
- Questions: GitHub Discussions
- Suggestions: GitHub Discussions

---

## License

**MIT License**

See [LICENSE](LICENSE) for full details.

---

## Changelog Complet

Voir [CHANGELOG.md](CHANGELOG.md) pour l'historique détaillé.

---

**Dernière mise à jour**: 5 mai 2026  
**Vérification**: Version 2.26 actuelle et stable  
**Contact**: Davie MARET
