# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Money Tracker is a React-based web application for tracking financial transactions (earnings and spending). The app features transaction management, data visualization via Chart.js, and a responsive dark-themed UI with gradient backgrounds and animations.

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Chart.js + react-chartjs-2** - Data visualization
- **ESLint** - Code linting with React-specific rules

## Development Commands

### Development
```powershell
npm run dev
```
Starts the Vite development server (typically at http://localhost:5173)

### Build
```powershell
npm run build
```
Creates production build in `dist/` directory

### Preview Production Build
```powershell
npm run preview
```
Serves the production build locally for testing

### Linting
```powershell
npm run lint
```
Runs ESLint on all .js and .jsx files with max-warnings set to 0

## Architecture

### State Management
The app uses **React local state** (useState) with no external state management library. All state lives in `App.jsx` and is passed down via props:
- `transactions` array - stored in App.jsx, contains all transaction objects
- `activePage` string - controls which view is currently displayed (add/history/chart)

### Application Flow
1. **App.jsx** - Root component that:
   - Maintains the transactions state array
   - Controls page navigation via sidebar
   - Passes `addTransaction` and `removeTransaction` functions to child components
   
2. **TransactionForm.jsx** - Handles adding new transactions:
   - Generates random IDs using `Math.random()`
   - Creates transaction objects: `{id, description, amount, date}`
   - Uses controlled inputs with local state

3. **TransactionList.jsx** - Displays transaction history:
   - Renders transactions with conditional styling (positive/negative amounts)
   - Provides delete functionality via `removeTransaction` prop

4. **TransactionChart.jsx** - Visualizes transaction data:
   - Uses Chart.js Line chart with manual registration of required components
   - Aggregates transactions by date using a transaction map
   - Recalculates chart data via useEffect when transactions change

### Component Structure
```
src/
├── App.jsx                    # Root component with state and navigation
├── main.jsx                   # React entry point
├── components/
│   ├── Balance.jsx           # Displays total balance calculation
│   ├── Header.jsx            # App title header
│   ├── TransactionForm.jsx   # Form for adding transactions
│   ├── TransactionList.jsx   # List view of all transactions
│   └── TransactionChart.jsx  # Chart.js line chart visualization
└── styles/
    └── styles.css            # Main stylesheet
```

## Key Implementation Details

### Transaction Object Structure
```javascript
{
  id: Number,          // Random ID (Math.floor(Math.random() * 100000000))
  description: String, // Transaction description
  amount: Number,      // Positive for income, negative for expenses
  date: String         // ISO date string from date input
}
```

### Chart Data Aggregation
`TransactionChart.jsx` aggregates transactions by date:
- Creates a map where keys are dates and values are accumulated amounts
- Sorts dates chronologically for x-axis labels
- Updates chart when transactions array changes

### Styling Approach
- Transactions are styled with `.positive` and `.negative` classes based on amount
- Main styles in `src/styles/styles.css`
- Dark theme with gradient backgrounds

## Important Notes

### ID Generation
Transaction IDs use `Math.random()` which may cause collisions. For production, consider:
- Using `Date.now()` combined with a counter
- Using UUID library
- Backend-generated IDs

### Data Persistence
**No data persistence** - transactions are lost on page refresh. State exists only in memory. To persist data, implement:
- localStorage
- Backend API integration
- IndexedDB

### ESLint Configuration
- Uses React 18.2 settings
- Enforces React Hooks rules
- React Refresh plugin for fast refresh during development
- JSX runtime automatically imports React (no manual React imports needed in JSX files)

### Chart.js Registration
Chart.js v4+ requires manual registration of components. `TransactionChart.jsx` registers:
- CategoryScale, LinearScale
- PointElement, LineElement
- Title, Tooltip, Legend

If adding new chart types or features, ensure required Chart.js components are registered.
