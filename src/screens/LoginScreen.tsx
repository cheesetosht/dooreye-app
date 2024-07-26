import {fetcher} from '@/adapters';
import {DEButton} from '@/components/ui/Button';
import {DETypography} from '@/components/ui/Typography';
import {darkTheme} from '@/styles/theme';
import React, {useRef, useState} from 'react';
import {Keyboard, KeyboardAvoidingView, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import {useAuth} from '../contexts/AuthContext';
import OTPTextInput from 'react-native-otp-textinput';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {DETextInput} from '@/components/ui/TextInput';

export const LoginScreen = () => {
  const {login} = useAuth();
  const {styles, theme} = useStyles(stylesheet);
  const [phone_number, setPhoneNumber] = useState('');
  let otpInput = useRef(null);

  const clearText = () => {
    otpInput.current.clear();
  };

  const setText = () => {
    otpInput.current.setValue('1234');
  };

  const handleSubmit = () => {
    fetcher
      .post('/auth/request-otp', {phone_number})
      .then(res => {
        console.log('RESPONSE >> ', res);
      })
      .catch(() => {});
  };

  return (
    <>
      <StatusBar
        barStyle="default"
        backgroundColor={darkTheme.colors.gray950}
      />
      <KeyboardAvoidingView enabled style={styles.container}>
        <TouchableWithoutFeedback
          // style={styles.container}
          onPress={Keyboard.dismiss}>
          {/* <SafeAreaView style={{flex: 1}}> */}
          <DETypography
            look={{
              size: '4xl',
              mb: 4,
            }}>
            DOOREYE
          </DETypography>
          <DETextInput
            look={{
              mb: 4,
            }}
            placeholder="Mobile number"
            placeholderTextColor={theme.colors.gray500}
            inputMode="tel"
            value={phone_number}
            onChangeText={setPhoneNumber}
          />
          <OTPTextInput ref={e => (otpInput = e)} />
          <DEButton
            look={{
              size: 'lg',
              fullWidth: true,
              mb: 4,
            }}
            label="Log in"
            onPress={() => login()}
          />
          <DEButton
            look={{
              size: 'lg',
              fullWidth: true,
            }}
            label="Sign in"
            onPress={() => handleSubmit()}
          />
          {/* </SafeAreaView> */}
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};

const stylesheet = createStyleSheet(theme => ({
  container: {
    backgroundColor: theme.colors.gray50,
    flex: 1,
    justifyContent: 'flex-end',
    padding: 16,
  },
  text: {
    fontFamily: 'DMSans.400',
    color: theme.colors.gray50,
    fontSize: 24,
  },
}));
