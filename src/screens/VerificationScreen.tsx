import {fetcher} from '@/adapters';
import {DEButton} from '@/components/ui/Button';
import {DETextInput} from '@/components/ui/TextInput';
import {DETypography} from '@/components/ui/Typography';
import React, {useRef, useState} from 'react';
import {KeyboardAvoidingView, StatusBar} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import {useAuth} from '../contexts/AuthContext';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Config from 'react-native-config';

export const VerificationScreen = () => {
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
  console.log('asdfadf>> ', Config.API_BASE_URL);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <SafeAreaView>
        <DETextInput
          look={{
            mb: 4,
          }}
          placeholder="Phone number"
        />
        <DEButton
          look={{
            size: 'lg',
            fullWidth: true,
          }}
          label="Sign in"
          onPress={() => handleSubmit()}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

{
  /* <StatusBar
        barStyle="default"
        backgroundColor={the}
      />
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={60}
        style={{ flex: 1 }}>
        <TouchableWithoutFeedback
          style={styles.container}
          onPress={Keyboard.dismiss}>
      <SafeAreaView style={{ flex: 1 }}>
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
    </SafeAreaView >
    </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
</> */
}

const stylesheet = createStyleSheet(theme => ({
  container: {
    backgroundColor: theme.colors.gray950,
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
