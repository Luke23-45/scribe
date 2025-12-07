import React from 'react';
import { type FilterType } from '@/core/hooks/useManuscriptDB';

import { RibbonContainer, FilterItem, ActiveBackdrop } from './styles';

interface FilterRibbonProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

// Heart icon for Favorites
const HeartIcon = (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '4px' }}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const FILTERS: { key: FilterType; label: React.ReactNode }[] = [
  { key: 'All', label: 'All' },
  { key: 'Favorites', label: <>{HeartIcon} Favorites</> },
  { key: 'Phase 1', label: 'Beginner' },
  { key: 'Phase 2', label: 'Intermediate' },
  { key: 'Phase 3', label: 'Advanced' },
  { key: 'Personal', label: 'My Texts' },
];

export const FilterRibbon: React.FC<FilterRibbonProps> = ({ currentFilter, onFilterChange }) => {
  return (
    <RibbonContainer>
      {FILTERS.map((filter) => (
        <FilterItem
          key={filter.key}
          $isActive={currentFilter === filter.key}
          onClick={() => onFilterChange(filter.key)}
        >
          {currentFilter === filter.key && (
            <ActiveBackdrop
              layoutId="activeFilter"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          {filter.label}
        </FilterItem>
      ))}
    </RibbonContainer>
  );
};