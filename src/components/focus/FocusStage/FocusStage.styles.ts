import styled from 'styled-components';

export const StageWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 50vh; /* Takes up substantial screen */
  padding: 0;        /* Edge to edge */
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  align-content: flex-start;
  
  cursor: text;
  user-select: none;
`;

export const GhostInput = styled.input`
  opacity: 0;
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  cursor: default;
  z-index: 50; /* Above text */
`;