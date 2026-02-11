import { useState, useMemo } from 'react';
import projectsData from '../data/projects.json';

// MUST start with 'use' and be a function
export const useProjectData = () => {
  const [selectedId, setSelectedId] = useState(null);

  // This is allowed here because useProjectData is a custom hook
  const data = useMemo(() => projectsData, []);

  return {
    data,
    selectedId,
    setSelectedId
  };
};