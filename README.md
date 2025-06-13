# AKRO Configurator

Application de configurateur de devis pour longes AKRO.

## Installation

```bash
npm install
```

Copiez `.env.example` vers `.env` et complétez les variables.

## Démarrage

```bash
npm start
```

L'application sera disponible sur `http://localhost:3000`.

## Fonctionnalités

- Formulaire de configuration sur `/index.html`.
- API Express:
  - `POST /api/quotes` crée un devis.
  - `GET /api/quotes` (protégé) liste tous les devis.
  - `GET /api/quotes/:id/pdf` télécharge le PDF du devis.
  - `POST /api/auth/login` retourne un JWT pour le tableau de bord.
- Dashboard accessible sur `/dashboard.html` après authentification.
