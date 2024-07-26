import {generateMarginVariants} from '@/styles/variants';
import React, {forwardRef} from 'react';
import {TextInputProps} from 'react-native';
import {
  NativeViewGestureHandlerProps,
  TextInput,
} from 'react-native-gesture-handler';
import {
  createStyleSheet,
  UnistylesVariants,
  useStyles,
} from 'react-native-unistyles';

type StyleProps = {look?: UnistylesVariants<typeof stylesheet>};
type Props = TextInputProps & NativeViewGestureHandlerProps & StyleProps;

export const DETextInput = forwardRef<TextInput, Props>((props, ref) => {
  const {look, ...rest} = props;
  const {styles} = useStyles(stylesheet, look);
  return <TextInput ref={ref} style={styles.input} {...rest} />;
});

const stylesheet = createStyleSheet(t => ({
  input: {
    borderWidth: 1,
    backgroundColor: t.colors.gray700,
    borderRadius: t.borderRadii.default,
    fontSize: t.fontSizes.default,
    variants: {
      ...generateMarginVariants(t),
      size: {
        sm: {
          paddingVertical: 6,
          paddingHorizontal: 12,
        },
        default: {
          paddingVertical: 16,
          paddingHorizontal: 20,
        },
        lg: {
          paddingVertical: 12,
          paddingHorizontal: 24,
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
      border: {
        none: {borderWidth: 0},
        thin: {borderWidth: 1},
        thick: {borderWidth: 2},
      },
    },
  },
  text: {
    color: t.colors.gray50,
    fontSize: t.fontSizes.default,
    textAlign: 'center',
  },
}));
