import React, { useState, useRef, useEffect } from 'react';
import {
  StyledBookCard,
  CoverArt,
  Monogram,
  FavoriteButton,
  ActionButton,
  ActionMenu,
  ActionMenuItem,
  BookMeta,
  Title,
  Author,
  BadgeRow,
  Badge,
  CardFooter,
  OpenLink
} from './BookCard.styles';

// --- ICONS ---
const HeartIcon = (
  <svg viewBox="0 0 24 24">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const MoreIcon = (
  <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="1" />
    <circle cx="12" cy="5" r="1" />
    <circle cx="12" cy="19" r="1" />
  </svg>
);

const EditIcon = (
  <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const TrashIcon = (
  <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

const ArrowIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

// --- PROPS ---
interface BookCardProps {
  id: number;
  title: string;
  author: string;
  phase: number;
  duration: string;
  isFavorite: boolean;
  isUserCreated?: boolean;
  onClick: () => void;
  onFavoriteToggle: (id: number) => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

// --- COMPONENT ---
export const BookCard: React.FC<BookCardProps> = ({
  id,
  title,
  author,
  phase,
  duration,
  isFavorite,
  isUserCreated = false,
  onClick,
  onFavoriteToggle,
  onEdit,
  onDelete
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavoriteToggle(id);
  };

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen(!menuOpen);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen(false);
    onEdit?.(id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen(false);
    onDelete?.(id);
  };

  return (
    <StyledBookCard
      $interactive
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      layout
    >
      {/* Favorite Button */}
      <FavoriteButton
        $isFavorite={isFavorite}
        onClick={handleFavoriteClick}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {HeartIcon}
      </FavoriteButton>

      {/* Action Menu (Edit/Delete) */}
      <div ref={menuRef}>
        <ActionButton onClick={handleActionClick} aria-label="More actions">
          {MoreIcon}
        </ActionButton>

        <ActionMenu $visible={menuOpen}>
          <ActionMenuItem onClick={handleEdit}>
            {EditIcon}
            Edit
          </ActionMenuItem>
          <ActionMenuItem $danger onClick={handleDelete}>
            {TrashIcon}
            Delete
          </ActionMenuItem>
        </ActionMenu>
      </div>

      {/* Cover Art with Monogram */}
      <CoverArt>
        <Monogram>{title.charAt(0)}</Monogram>
      </CoverArt>

      {/* Book Info */}
      <BookMeta>
        <Title>{title}</Title>
        <Author>{author}</Author>

        <BadgeRow>
          <Badge $type="accent">Phase {phase}</Badge>
          <Badge $type="neutral">{duration}</Badge>
          {isUserCreated && <Badge $type="success">Personal</Badge>}
        </BadgeRow>
      </BookMeta>

      {/* Footer */}
      <CardFooter>
        <span>{isFavorite ? '★ Favorited' : ''}</span>
        <OpenLink>
          Open Manuscript {ArrowIcon}
        </OpenLink>
      </CardFooter>
    </StyledBookCard>
  );
};