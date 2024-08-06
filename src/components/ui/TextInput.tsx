import {generateMarginVariants} from '@/styles/variants';
import React, {forwardRef} from 'react';
import {TextInputProps, View} from 'react-native';
import {
  NativeViewGestureHandlerProps,
  TextInput,
} from 'react-native-gesture-handler';
import {
  createStyleSheet,
  UnistylesVariants,
  useStyles,
} from 'react-native-unistyles';
import {DETypography} from './Typography';

type StyleProps = {look?: UnistylesVariants<typeof stylesheet>};
type Props = TextInputProps &
  NativeViewGestureHandlerProps &
  StyleProps & {
    label?: string;
  };

export const DETextInput = forwardRef<TextInput, Props>((props, ref) => {
  const {look, ...rest} = props;
  const {styles, theme} = useStyles(stylesheet, look);
  return (
    <View>
      {props.label && (
        <DETypography
          look={{
            size: 'sm',
            color: 'fg2',
            mb: 2,
          }}>
          {props.label}
        </DETypography>
      )}
      <TextInput
        {...rest}
        ref={ref}
        style={styles.input}
        placeholderTextColor={theme.colors.gray400}
      />
    </View>
  );
});

const stylesheet = createStyleSheet(t => ({
  input: {
    borderWidth: 1,
    borderColor: t.colors.gray300,
    borderRadius: t.borderRadii.default,
    fontSize: t.fontSizes.lg,
    fontWeight: '500',
    variants: {
      ...generateMarginVariants(t),
      size: {
        sm: {
          paddingVertical: 6,
          paddingHorizontal: 12,
        },
        default: {
          paddingVertical: 20,
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
}));
