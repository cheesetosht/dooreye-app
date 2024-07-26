const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
  24: 96,
};

const fontSizes = {
  xs: 12,
  sm: 14,
  default: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
  // ... add more font sizes
} as const;

const lineHeights = {
  none: 1,
  tight: 1.25,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
  // ... add more line heights
};

const BASE_BORDER_RADIUS = 6;
const borderRadii = {
  none: 0,
  sm: BASE_BORDER_RADIUS - 2,
  default: BASE_BORDER_RADIUS,
  lg: BASE_BORDER_RADIUS + 2,
  full: 9999,
};

const colors = {
  barbie: '#ff9ff3',
  oak: '#1dd1a1',
  sky: '#48dbfb',
  fog: '#c8d6e5',
  aloes: '#00d2d3',
  blood: '#ff6b6b',
  gray50: '#fafafa',
  gray100: '#f5f5f5',
  gray200: '#e5e5e5',
  gray300: '#d4d4d4',
  gray400: '#a3a3a3',
  gray500: '#737373',
  gray600: '#525252',
  gray700: '#404040',
  gray800: '#262626',
  gray900: '#171717',
  gray950: '#0a0a0a',
};

const baseTheme = {
  borderRadii,
  spacing,
  fontSizes,
  lineHeights,
};

export const lightTheme = {
  ...baseTheme,
  colors: {
    ...colors,
    bg1: colors.gray50,
    bg2: colors.gray100,
    fg1: colors.gray950,
    fg2: colors.gray900,
    primary: colors.blood,
  },
};

export const darkTheme = {
  ...baseTheme,
  colors: {
    ...colors,
    bg1: colors.gray950,
    bg2: colors.gray900,
    fg1: colors.gray50,
    fg2: colors.gray100,
    primary: colors.barbie,
  },
};
