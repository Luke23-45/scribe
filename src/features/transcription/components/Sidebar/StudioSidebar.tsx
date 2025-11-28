import React from 'react';
import { SidebarContainer, ControlGroup, Label, RangeSlider } from './styles';

interface SidebarProps {
  chunkSize: number;
  setChunkSize: (n: number) => void;
  // Add font size controls here later
}

export const StudioSidebar: React.FC<SidebarProps> = ({ chunkSize, setChunkSize }) => {
  return (
    <SidebarContainer>
      
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem' }}>Studio Controls</h3>
      </div>

      <ControlGroup>
        <Label>Chunk Size ({chunkSize} words)</Label>
        <RangeSlider 
          type="range" 
          min="1" max="6" 
          value={chunkSize}
          onChange={(e) => setChunkSize(Number(e.target.value))}
        />
        <small style={{ color: '#888', lineHeight: 1.4 }}>
          Adjust how many words stay highlighted. 
          Lower this if you feel overwhelmed.
        </small>
      </ControlGroup>

      <ControlGroup>
        <Label>Font Scale</Label>
        {/* Placeholder for future functionality */}
        <RangeSlider type="range" min="16" max="32" disabled />
      </ControlGroup>

    </SidebarContainer>
  );
};