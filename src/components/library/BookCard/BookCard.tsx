import React from 'react';
import { StyledBookCard, CoverArt, Monogram, BookMeta, Title, Author, BadgeRow, Badge } from './BookCard.styles';

interface BookCardProps {
  title: string;
  author: string;
  phase: number;
  duration: string;
  onClick: () => void;
}

export const BookCard: React.FC<BookCardProps> = ({ 
  title, 
  author, 
  phase, 
  duration, 
  onClick 
}) => {
  return (
    <StyledBookCard interactive onClick={onClick} whileTap={{ scale: 0.98 }}>
      <div>
        <CoverArt>
          {/* Aesthetic Monogram using first letter */}
          <Monogram>{title.charAt(0)}</Monogram>
        </CoverArt>
        
        <BookMeta style={{ marginTop: '1.5rem' }}>
          <Title>{title}</Title>
          <Author>{author}</Author>
        </BookMeta>

        <BadgeRow>
          <Badge $type="accent">Phase {phase}</Badge>
          <Badge $type="neutral">{duration}</Badge>
        </BadgeRow>
      </div>

      <div style={{ 
        borderTop: '1px solid rgba(0,0,0,0.05)', 
        paddingTop: '1rem', 
        fontSize: '0.875rem', 
        opacity: 0.7,
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        Open Manuscript &rarr;
      </div>
    </StyledBookCard>
  );
};