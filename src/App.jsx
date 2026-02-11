import React, { useState, useMemo } from 'react';
// Components
import MapView from './components/MapView';
import DataTable from './components/DataTable';
// Data
import projectsData from './data/projects.json';
// Styles
import './App.css';

/**
 * Main Application Component
 */
function App() {
  // 1. STATE HOOKS (Top level only)
  const [selectedId, setSelectedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // 2. MEMOIZED LOGIC
  // We filter here so both Map and Table use the same subset of data
  const filteredData = useMemo(() => {
    if (!searchQuery) return projectsData;
    return projectsData.filter((item) =>
      item.projectName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Find the specific object to fly to on the map
  const activeProject = useMemo(() => {
    return filteredData.find((p) => p.id === selectedId) || null;
  }, [filteredData, selectedId]);

  // 3. HANDLERS
  const handleSelectProject = (id) => {
    setSelectedId(id);
  };

  return (
    <div className="dashboard-layout">
      {/* SIDEBAR SECTION */}
      <aside className="table-section">
        <header className="table-header">
          <h2>Geo Projects</h2>
          <input
            type="text"
            placeholder="Search by project name..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="stats-bar">
            Displaying <strong>{filteredData.length}</strong> items
          </div>
        </header>

        <div className="table-viewport">
          <DataTable
            data={filteredData}
            selectedId={selectedId}
            onRowClick={handleSelectProject}
          />
        </div>
      </aside>

      {/* MAP SECTION */}
      <main className="map-section">
        <MapView
          data={filteredData}
          activeProject={activeProject}
          onMarkerClick={handleSelectProject}
        />
      </main>
    </div>
  );
}

export default App;