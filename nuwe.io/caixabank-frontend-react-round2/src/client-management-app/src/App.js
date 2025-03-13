import React, { Suspense, useState, useEffect } from 'react';
import { DataProvider } from './context/DataContext';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load components
const DataGrid = React.lazy(() => import('./components/DataGrid'));
const FilterPanel = React.lazy(() => import('./components/FilterPanel'));
const ChartView = React.lazy(() => import('./components/ChartView'));

function App() {
  const [sortConfig, setSortConfig] = useState(null);
  const [filterConfig, setFilterConfig] = useState({ type: 'All' });

  return (
    <ErrorBoundary>
      <DataProvider>
        <div className="app">
          <h1>Investment Management Dashboard</h1>
          <Suspense fallback={<LoadingSpinner />}>
            <FilterPanel 
              onFilterChange={setFilterConfig}
              onSortChange={setSortConfig}
            />
            <div className="dashboard-grid">
              <DataGrid 
                sortConfig={sortConfig}
                filterConfig={filterConfig}
              />
              <ChartView />
            </div>
          </Suspense>
        </div>
      </DataProvider>
    </ErrorBoundary>
  );
}

export default App;
