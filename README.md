# Projet Yapla

## À Propos du Projet

Bonjour Thibaut, voici l'application web basée sur React.

## Construit Avec

- **React** - Bibliothèque frontend
- **TypeScript** - Pour un code typé sécurisé
- **Tailwind CSS** - Pour le style
- **Cypress** - Pour les tests E2E et composants
- **React Context** - Pour la gestion d'état
- **PostCSS** - Pour le traitement CSS

## Vidéo de Démonstration des Tests

Regardez l'exécution des tests en action :

[Voir la Démo des Tests E2E et Composants](public/assets/cypress_test_e2e_component.webm)

## Pour Commencer

### Prérequis

- Node.js (v14 ou supérieur)
- npm

### Installation

1. Cloner le dépôt
```bash
git clone [https://github.com/ozi3ozi/yapla.git]
```

2. Installer les dépendances
```bash
npm install
```

3. Démarrer le serveur de développement
```bash
npm start
```
L'application sera disponible sur [http://localhost:3000](http://localhost:3000)

## Exécution des Tests

### Tests E2E
```bash
# Ouvrir Cypress Test Runner
npx cypress open

# Exécuter les tests en mode headless
npx cypress run
```

### Tests des Composants
```bash
# Ouvrir Cypress Test Runner
npx cypress open

# Exécuter les tests en mode headless
npx cypress run --component
```
