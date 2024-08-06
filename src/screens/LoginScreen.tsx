import {fetcher} from '@/adapters';
import {DEButton} from '@/components/ui/Button';
import {DETextInput} from '@/components/ui/TextInput';
import {DETypography} from '@/components/ui/Typography';
import {setToken} from '@/utils/auth';
import React, {useRef, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  Text,
  View,
} from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
import {SafeAreaView} from 'react-native-safe-area-context';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import {useAuth} from '../contexts/AuthContext';

export const LoginScreen = () => {
  const {check} = useAuth();
  const {styles, theme: t} = useStyles(stylesheet);
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const phoneNumberInputRef = useRef<any>('');
  let otpInputRef = useRef<any>('');

  const handlePhoneNumberSubmit = () => {
    console.log('phone number:\n> ', phoneNumberInputRef.current?.value);
    fetcher
      .post('/auth/request-otp', {
        phone_number: phoneNumberInputRef.current?.value,
      })
      .then(res => {
        Keyboard.dismiss();
        setPhoneNumber(phoneNumberInputRef.current?.value);
        console.log('request otp:\n> ', JSON.stringify(res.data));
      })
      .catch(err => {
        console.debug(
          'request otp error:\n> ',
          JSON.stringify(err.response?.data, undefined, 2),
        );
      });
  };
  const handleOTPSubmit = () => {
    console.log('otp:\n> ', otpInputRef.current.value);
    fetcher
      .post('/auth/verify-otp', {
        phone_number: phoneNumber,
        otp: otpInputRef.current?.value,
      })
      .then(res => {
        Keyboard.dismiss();
        setToken(res.data.token);
        check();
        console.log('verify otp:\n> ', JSON.stringify(res.data));
      })
      .catch(err => {
        console.debug(
          'verify otp error:\n> ',
          JSON.stringify(err.response.data, undefined, 2),
        );
      });
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
      <SafeAreaView style={styles.container}>
        <Text
          style={{
            fontSize: 240,
            textAlign: 'center',
            marginBottom: t.spacing[10],
          }}>
          🧿
        </Text>
        <DETypography
          look={{
            color: 'fg1',
            size: '3xl',
            fontWeight: 'md',
            mb: 2,
          }}>
          Intoducing DOOREYE
        </DETypography>
        <DETypography
          look={{
            color: 'fg2',
            mb: 8,
          }}>
          Truly private, in all ways
        </DETypography>
        {phoneNumber ? (
          <>
            <DETypography
              look={{
                color: 'fg2',
                mb: 4,
              }}>
              Verification code sent to{' '}
              <DETypography
                look={{
                  fontWeight: 'md',
                }}>
                {phoneNumber}
              </DETypography>{' '}
              <DETypography
                look={{
                  color: 'primary',
                  fontWeight: 'md',
                }}
                onPress={() => setPhoneNumber('')}>
                Change
              </DETypography>
            </DETypography>
            <OTPTextInput
              autoFocus={!!phoneNumber}
              tintColor={t.colors.gray400}
              textInputStyle={{
                borderWidth: 1,
                borderBottomWidth: 1,
                borderColor: t.colors.gray300,
                borderRadius: t.borderRadii.default,
                paddingVertical: 24,
                width: '20%',
                height: 'auto',
                marginBottom: t.spacing[4],
              }}
              ref={otpInputRef}
              handleTextChange={text => (otpInputRef.current.value = text)}
            />
          </>
        ) : (
          <DETextInput
            label="Phone number"
            placeholder="98989 87676"
            inputMode="tel"
            keyboardType="number-pad"
            look={{
              mb: 4,
            }}
            ref={phoneNumberInputRef}
            onChangeText={text => (phoneNumberInputRef.current.value = text)}
            onSubmitEditing={() => handlePhoneNumberSubmit()}
          />
        )}

        <DEButton
          look={{
            size: 'lg',
            fullWidth: true,
          }}
          label={phoneNumber ? 'Submit' : 'Sign in'}
          onPress={() =>
            phoneNumber ? handleOTPSubmit() : handlePhoneNumberSubmit()
          }
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const stylesheet = createStyleSheet(theme => ({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  text: {
    fontFamily: 'DMSans.400',
    color: theme.colors.gray50,
    fontSize: 24,
  },
}));
