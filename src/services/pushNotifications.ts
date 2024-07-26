import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import notifee, {
  AndroidImportance,
  EventDetail,
  EventType,
} from '@notifee/react-native';

const NOTIFICATION_CHANNEL_IDS = {
  RESIDENCE_VISIT: 'residence_visit',
};

type ResidenceVisitData = {
  type: string;
  visitor_name: string;
  arrival_time: string;
  phone_number: string;
  purpose: string;
  residence_visit_id: string;
};

const onMessage = async (
  remoteMessage: FirebaseMessagingTypes.RemoteMessage,
) => {
  console.log('REMOTE MESSAGE: ', remoteMessage);
  const data = remoteMessage.data as ResidenceVisitData;
  const channelId = data.type;
  switch (data?.type) {
    case NOTIFICATION_CHANNEL_IDS.RESIDENCE_VISIT:
      await notifee.displayNotification({
        title: `${data.visitor_name} has arrived for ${data.purpose} purpose`,
        body: 'Click to review the request',
        android: {
          channelId,
        },
        data,
      });
  }
};

export const onNotifeeEvent = async ({
  type,
  detail,
}: {
  type: EventType;
  detail: EventDetail;
}) => {
  switch (type) {
    case EventType.PRESS:
      console.log('DETAIL: ', detail);
  }
};

export const remoteMessagingInit = async () => {
  await notifee.createChannel({
    id: NOTIFICATION_CHANNEL_IDS.RESIDENCE_VISIT,
    name: 'New visitor',
    vibration: true,
    importance: AndroidImportance.HIGH,
  });
  notifee.onBackgroundEvent(onNotifeeEvent);
  messaging().onMessage(onMessage);
  messaging().setBackgroundMessageHandler(onMessage);
};
