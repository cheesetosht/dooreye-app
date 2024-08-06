import React from 'react';
import {View, Text, Button} from 'react-native';
import {useAuth} from '../contexts/AuthContext';
import {clearToken} from '@/utils/auth';

export const ProfileScreen = () => {
  const {check} = useAuth();

  return (
    <View>
      <Text>Profile Screen</Text>
      <Button
        title="Logout"
        onPress={() => {
          clearToken();
          check();
        }}
      />
    </View>
  );
};
