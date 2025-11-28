import 'styled-components';
import { Theme } from './core/theme/theme.types';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}