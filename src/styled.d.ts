import 'styled-components';
import { ThemeType } from './core/theme/draftTheme';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType { }
}