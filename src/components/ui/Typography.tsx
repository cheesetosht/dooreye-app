import {
  generateMarginVariants,
  generatePaddingVariants,
  generateVariants,
} from '@/styles/variants';
import React, {forwardRef} from 'react';
import {Text, TextProps} from 'react-native';
import {
  createStyleSheet,
  UnistylesVariants,
  useStyles,
} from 'react-native-unistyles';

type StyleProps = {look?: UnistylesVariants<typeof stylesheet>};
type Props = TextProps & StyleProps;

export const DETypography = forwardRef<Text, Props>((props, ref) => {
  const {look, children, ...rest} = props;
  const {styles} = useStyles(stylesheet, {...look});

  return (
    <Text ref={ref} style={styles.text} {...rest}>
      {children}
    </Text>
  );
});

const stylesheet = createStyleSheet(t => {
  return {
    text: {
      variants: {
        ...generateMarginVariants(t),
        ...generatePaddingVariants(t),
        size: generateVariants(t.fontSizes, 'fontSize'),
        fontWeight: generateVariants(t.fontWeights, 'fontWeight'),
        color: generateVariants(t.colors, 'color'),
      },
    },
  };
});
