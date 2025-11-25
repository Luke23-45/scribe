import React from 'react';
import styled from 'styled-components';
import { CuratedShelf } from '../../features/library/CuratedShelf';
import { DraftingTable } from '../../features/library/DraftingTable';

const PageContainer = styled.div`
  min-height: 100vh;
  padding: 80px 24px;
  max-width: 1200px;
  margin: 0 auto;
`;

const PageHeader = styled.h1`
  font-size: ${({ theme }) => theme.typography.sizes.h1};
  margin-bottom: 48px;
  color: ${({ theme }) => theme.colors.ink};
`;

export const LibraryPage: React.FC = () => {
  return (
    <PageContainer>
      <PageHeader>Your Library</PageHeader>
      <CuratedShelf />
      <DraftingTable />
    </PageContainer>
  );
};