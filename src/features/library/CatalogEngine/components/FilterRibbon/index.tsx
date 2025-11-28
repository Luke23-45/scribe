import React from 'react';
import {type FilterType } from '@/features/library/hooks/useLibrary';

import { RibbonContainer, FilterItem, ActiveBackdrop } from './styles';

interface FilterRibbonProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const FILTERS: FilterType[] = ['All', 'Phase 1', 'Phase 2', 'Phase 3'];

export const FilterRibbon: React.FC<FilterRibbonProps> = ({ currentFilter, onFilterChange }) => {
  return (
    <RibbonContainer>
      {FILTERS.map((filter) => (
        <FilterItem 
          key={filter} 
          $isActive={currentFilter === filter}
          onClick={() => onFilterChange(filter)}
        >
          {currentFilter === filter && (
            <ActiveBackdrop 
              layoutId="activeFilter" // This magic string connects the animation across items
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          {filter}
        </FilterItem>
      ))}
    </RibbonContainer>
  );
};