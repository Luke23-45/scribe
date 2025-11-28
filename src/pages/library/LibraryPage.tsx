import React from 'react';
import { PageShell } from '@/components/layout/PageShell';
// import { BookshelfSection } from '@/features/library/BookshelfSection'; // <-- DELETE THIS OLD IMPORT
// import { CatalogEngine } from '@/features/library/CatalogEngine';      // <-- USE THIS NEW ONE
import { DraftingSection } from '@/features/library/DraftingSection';
import { CatalogEngine } from '@/features/library/BookshelfSection';
export const LibraryPage: React.FC = () => {
  return (
    <PageShell>
      {/* 1. The Premium Catalog Engine (Search + Filter + Grid) */}
      <CatalogEngine />
      
      {/* 2. The Custom Input Area */}
      <DraftingSection />
    </PageShell>
  );
};