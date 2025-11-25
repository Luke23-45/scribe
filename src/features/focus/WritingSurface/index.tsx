import React, { useState } from 'react';
import { SurfaceContainer, EditorArea } from './styles';
import { useMicroSlicer } from './useMicroSlicer';

interface WritingSurfaceProps {
    onActivity: () => void;
}

export const WritingSurface: React.FC<WritingSurfaceProps> = ({ onActivity }) => {
    const [content, setContent] = useState('');
    const { sliceContent } = useMicroSlicer(content);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
        onActivity();
        sliceContent();
    };

    return (
        <SurfaceContainer>
            <EditorArea
                placeholder="Start writing..."
                value={content}
                onChange={handleChange}
                autoFocus
            />
        </SurfaceContainer>
    );
};
