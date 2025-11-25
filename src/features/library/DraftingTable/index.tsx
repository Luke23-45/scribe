import React from 'react';
import { TableContainer, TableHeader } from './styles';
import { UnderlinedInput } from '../../../components/common/Input/UnderlinedInput';
import { InkButton } from '../../../components/common/Button/InkButton';

export const DraftingTable: React.FC = () => {
    return (
        <TableContainer
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
        >
            <TableHeader>Start a New Manuscript</TableHeader>
            <UnderlinedInput placeholder="Untitled Draft..." />
            <div style={{ alignSelf: 'flex-end' }}>
                <InkButton>Create</InkButton>
            </div>
        </TableContainer>
    );
};
