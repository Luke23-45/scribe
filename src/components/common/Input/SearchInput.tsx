import React from 'react';
import { SearchWrapper, SearchIconWrapper, StyledSearchInput } from './SearchInput.styles';

const SearchIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const SearchInput: React.FC<SearchInputProps> = (props) => {
  return (
    <SearchWrapper>
      <SearchIconWrapper>{SearchIcon}</SearchIconWrapper>
      <StyledSearchInput {...props} />
    </SearchWrapper>
  );
};