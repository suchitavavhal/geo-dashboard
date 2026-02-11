import React, { useRef, useMemo } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

const DataTable = ({ data, selectedId, onRowClick }) => {
  const parentRef = useRef();

  // Virtualizer logic: only renders what's on screen
  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 45, // Height of each row in pixels
    overscan: 5,            // Number of rows to render outside visible area
  });

  return (
    <div 
      ref={parentRef} 
      className="table-viewport"
      style={{ height: `100%`, overflow: 'auto', border: '1px solid #ccc' }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const item = data[virtualRow.index];
          const isSelected = selectedId === item.id;

          return (
            <div
              key={item.id}
              onClick={() => onRowClick(item.id)}
              className={`table-row ${isSelected ? 'selected' : ''}`}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
                backgroundColor: isSelected ? '#d1e9ff' : 'white',
                borderBottom: '1px solid #eee',
                display: 'flex',
                alignItems: 'center',
                padding: '0 15px',
                cursor: 'pointer'
              }}
            >
              <span style={{ flex: 2 }}>{item.projectName}</span>
              <span style={{ flex: 1 }}>{item.status}</span>
              <span style={{ flex: 1, fontSize: '0.8rem', color: '#666' }}>{item.lastUpdated}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DataTable;