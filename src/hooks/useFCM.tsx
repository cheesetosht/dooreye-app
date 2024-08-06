import {useEffect, useState} from 'react';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function requestUserPermission() {
  const permissionStatus = await messaging().requestPermission();
  const enabled =
    permissionStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    permissionStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
  }
}

export const useFCM = (userId: number) => {
  const [fcmToken, setFCMToken] = useState<string | null>(null);

  useEffect(() => {
    // https://rnfirebase.io/messaging/server-integration#saving-tokens
    const setupToken = async () => {
      try {
        requestUserPermission();
        const storedToken = await AsyncStorage.getItem('fcmToken');
        if (storedToken) {
          setFCMToken(storedToken);
        } else {
          const newToken = await messaging().getToken();
          // const newToken = await FirebaseService.getToken();
          setFCMToken(newToken);
          await AsyncStorage.setItem('fcmToken', newToken);
        }

        if (fcmToken) {
          // await ApiService.storeToken(userId, fcmToken);
        }

        const unsubscribe = messaging().onTokenRefresh(async refreshedToken => {
          console.log('Token refreshed:', refreshedToken);
          setFCMToken(refreshedToken);
          await AsyncStorage.setItem('fcmToken', refreshedToken);
          // await ApiService.storeToken(userId, refreshedToken);
        });
        return unsubscribe;
      } catch (err) {
        console.debug('Error setting up FCM token:', err);
      }
    };

    const unsubscribe = setupToken();

    return () => {
      // eslint-disable-next-line curly
      if (unsubscribe) unsubscribe.then(f => f?.());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return fcmToken;
};
