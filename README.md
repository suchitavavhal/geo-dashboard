# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Installation

# Clone the repository
git clone (https://github.com/suchitavavhal/geo-dashboard.git)

# Install dependencies
npm install

# Generate the mock data (5,000 records)
npm run seed

## Development
npm run dev

## Folder Structure
src/
├── components/
│   ├── DataTable.jsx   # Virtualized list logic
│   ├── MapView.jsx     # Leaflet & Cluster logic
|___hooks/
| └── useProjectData.js 
├── data/
│   └── projects.json   # Generated 5k records
├── scripts/
│   └── generateData.js # Node.js ESM seeding script
├── App.jsx             # State orchestration
└── App.css             # Flexbox/Dashboard layout