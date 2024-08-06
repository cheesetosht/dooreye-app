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
    borderRadius: t.borderRadii.default,
    variants: {
      ...generateMarginVariants(t),
      ...generatePaddingVariants(t),
      variant: {
        default: {
          backgroundColor: t.colors.gray900,
        },
        outline: {
          borderWidth: 1,
          backgroundColor: 'transparent',
          borderColor: t.colors.gray900,
          color: t.colors.gray900,
        },
      },
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
          paddingVertical: 20,
          paddingHorizontal: 36,
        },
      },
    },
  },
  text: {
    color: t.colors.gray50,
    fontWeight: '500',
    textAlign: 'center',
    variants: {
      variant: {
        outline: {
          color: t.colors.gray900,
        },
      },
    },
  },
}));
