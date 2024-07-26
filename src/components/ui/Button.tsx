import {
  generateMarginVariants,
  generatePaddingVariants,
} from '@/styles/variants';
import React, {forwardRef} from 'react';
import {Pressable, PressableProps, Text, View} from 'react-native';
import {
  createStyleSheet,
  UnistylesVariants,
  useStyles,
} from 'react-native-unistyles';

type StyleProps = {look?: UnistylesVariants<typeof stylesheet>};
type Props = PressableProps &
  StyleProps & {
    label: string;
  };

export const DEButton = forwardRef<View, Props>((props, ref) => {
  const {look, label, ...rest} = props;
  const {styles} = useStyles(stylesheet, look);

  return (
    <Pressable ref={ref} style={styles.button} {...rest}>
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
});

const stylesheet = createStyleSheet(t => ({
  button: {
    backgroundColor: t.colors.gray700,
    borderRadius: t.borderRadii.default,
    variants: {
      ...generateMarginVariants(t),
      ...generatePaddingVariants(t),
      fullWidth: {
        true: {
          alignSelf: 'stretch',
        },
        false: {
          alignSelf: 'flex-start',
        },
      },
      size: {
        sm: {
          paddingVertical: 6,
          paddingHorizontal: 12,
        },
        default: {
          paddingVertical: 8,
          paddingHorizontal: 16,
        },
        lg: {
          paddingVertical: 12,
          paddingHorizontal: 24,
        },
      },
    },
  },
  text: {
    color: t.colors.gray50,
    fontSize: t.fontSizes.default,
    textAlign: 'center',
  },
}));
