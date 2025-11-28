import {type Token } from '@/features/transcription/hooks/useTranscriptionEngine';

export const chunkTokens = (tokens: Token[], size: number): Token[][] => {
  const chunks: Token[][] = [];
  for (let i = 0; i < tokens.length; i += size) {
    chunks.push(tokens.slice(i, i + size));
  }
  return chunks;
};