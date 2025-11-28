import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ReviewSurface, Sentence } from './styles';

interface ShockEditorProps {
  fullText: string;
}

export const ShockEditor: React.FC<ShockEditorProps> = ({ fullText }) => {
  
  // Logic: Split text into sentences for individual interaction.
  // We use a RegEx that looks for [.!?] followed by a space.
  const sentences = useMemo(() => {
    // This splits but keeps the punctuation attached to the sentence
    return fullText.match( /[^\.!\?]+[\.!\?]+/g ) || [fullText];
  }, [fullText]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4 }}
    >
      <ReviewSurface>
        {sentences.map((sent, i) => (
          // Add a space after each span to preserve reading flow
          <React.Fragment key={i}>
            <Sentence>{sent}</Sentence>{' '} 
          </React.Fragment>
        ))}
      </ReviewSurface>
    </motion.div>
  );
};