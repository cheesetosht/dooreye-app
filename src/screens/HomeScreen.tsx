import {DETypography} from '@/components/ui/Typography';
import {useAuth} from '@/contexts/AuthContext';
import React from 'react';
import {View} from 'react-native';

export const HomeScreen = () => {
  const {user} = useAuth();
  return (
    <View>
      <DETypography look={{size: 'lg'}}>{user?.name}</DETypography>
      <DETypography look={{size: 'lg'}}>{user?.society_name}</DETypography>
    </View>
  );
};
