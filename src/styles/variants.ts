import {TextStyle, ViewStyle} from 'react-native';
import {UnistylesTheme} from 'react-native-unistyles/lib/typescript/src/types';

type AllStyleProperties = TextStyle & ViewStyle;

export const generateVariants = <
  T extends Record<string, number | string>,
  K extends keyof AllStyleProperties,
>(
  obj: T,
  styleName: K,
  defaultStyle?: number | string,
): Record<keyof T, Pick<AllStyleProperties, K>> => {
  const defaultObj = defaultStyle ? {default: {[styleName]: defaultStyle}} : {};
  return Object.entries(obj).reduce(
    (curr, [k, v]) => ({
      ...curr,
      [k]: {[styleName]: v} as Pick<AllStyleProperties, K>,
    }),
    defaultObj as Record<keyof T, Pick<AllStyleProperties, K>>,
  );
};

export const generateMarginVariants = (t: UnistylesTheme) => ({
  mt: generateVariants(t.spacing, 'marginTop'),
  mb: generateVariants(t.spacing, 'marginBottom'),
  mr: generateVariants(t.spacing, 'marginRight'),
  ml: generateVariants(t.spacing, 'marginLeft'),
  mx: generateVariants(t.spacing, 'marginHorizontal'),
  my: generateVariants(t.spacing, 'marginVertical'),
});

export const generatePaddingVariants = (t: UnistylesTheme) => ({
  pt: generateVariants(t.spacing, 'paddingTop'),
  pb: generateVariants(t.spacing, 'paddingBottom'),
  pr: generateVariants(t.spacing, 'paddingRight'),
  pl: generateVariants(t.spacing, 'paddingLeft'),
  px: generateVariants(t.spacing, 'paddingHorizontal'),
  py: generateVariants(t.spacing, 'paddingVertical'),
});
