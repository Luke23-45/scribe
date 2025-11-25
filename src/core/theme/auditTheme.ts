import { draftTheme } from './draftTheme';

export const auditTheme = {
    ...draftTheme,
    colors: {
        ...draftTheme.colors,
        background: '#FFFFFF',
        ink: '#000000',
    }
};
