import React from 'react';
import { ShelfContainer, BookCard, BookTitle, BookMeta } from './styles';

export const CuratedShelf: React.FC = () => {
    const books = [
        { id: 1, title: 'Morning Pages', date: 'Today' },
        { id: 2, title: 'Deep Work', date: 'Yesterday' },
        { id: 3, title: 'Reflections', date: '2 days ago' },
    ];

    return (
        <ShelfContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            {books.map((book, index) => (
                <BookCard
                    key={book.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                >
                    <BookTitle>{book.title}</BookTitle>
                    <BookMeta>{book.date}</BookMeta>
                </BookCard>
            ))}
        </ShelfContainer>
    );
};
