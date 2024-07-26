import React from 'react';
import {View, Text, Button} from 'react-native';
import {useAuth} from '../contexts/AuthContext';

export const ProfileScreen = () => {
  const {logout} = useAuth();

  return (
    <View>
      <Text>Profile Screen</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
};
