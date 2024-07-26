import {UnistylesRegistry} from 'react-native-unistyles';
import {darkTheme, lightTheme} from './theme';

type AppThemes = {
  light: typeof lightTheme;
  dark: typeof darkTheme;
};

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
}

export const unistylesInit = () => {
  UnistylesRegistry.addThemes({
    light: lightTheme,
    dark: darkTheme,
  }).addConfig({
    adaptiveThemes: true,
  });
};
