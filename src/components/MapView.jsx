import React, { useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import 'leaflet/dist/leaflet.css';

/**
 * Sub-component to handle programmatic map movement.
 * Leaflet maps must be manipulated via the useMap hook.
 */
const MapController = ({ activeProject }) => {
  const map = useMap();

  useEffect(() => {
    if (activeProject) {
      map.flyTo([activeProject.lat, activeProject.lng], 12, {
        duration: 1.5,
        easeLinearity: 0.25,
      });
    }
  }, [activeProject, map]);

  return null;
};

const MapView = ({ data, activeProject, onMarkerClick }) => {
  // const centerUSA = [39.8283, -98.5795];

  return (
    <div className="map-wrapper" style={{ height: '100%', width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
      <MapContainer
       center={[39.82, -98.57]}
        zoom={4}
        scrollWheelZoom={true}
        preferCanvas={true} // Performance: Renders markers on Canvas instead of DOM nodes
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Syncs map position when a table row is clicked */}
        <MapController activeProject={activeProject} />

        <MarkerClusterGroup
          chunkedLoading // Performance: Prevents UI freeze during cluster calculations
          maxClusterRadius={50}
        >
          {data.map((project) => (
            <CircleMarker
              key={project.id}
              center={[project.lat, project.lng]}
              radius={project.id === activeProject?.id ? 10 : 6}
              pathOptions={{
                fillColor: project.id === activeProject?.id ? '#ff5722' : '#2196f3',
                fillOpacity: 0.8,
                color: '#fff',
                weight: project.id === activeProject?.id ? 3 : 1,
              }}
              eventHandlers={{
                click: () => onMarkerClick(project.id),
              }}
            >
              <Popup>
                <div className="popup-card">
                  <h3>{project.projectName}</h3>
                  <p><strong>Status:</strong> {project.status}</p>
                  <p><strong>Updated:</strong> {project.lastUpdated}</p>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default MapView;