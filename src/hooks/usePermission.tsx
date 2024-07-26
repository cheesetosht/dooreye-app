import {
  checkPermission,
  PermissionType,
  requestPermission,
} from '@/utils/permissions';
import {useEffect, useState} from 'react';
import {PermissionStatus, RESULTS} from 'react-native-permissions';

interface PermissionHookResult {
  status: PermissionStatus;
  isGranted: boolean;
  request: () => Promise<void>;
}

export const usePermission = (
  permissionType: PermissionType,
): PermissionHookResult => {
  const [status, setStatus] = useState<PermissionStatus>(RESULTS.UNAVAILABLE);

  useEffect(() => {
    checkPermissionStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkPermissionStatus = async () => {
    const result = await checkPermission(permissionType);
    setStatus(result);
  };

  const request = async () => {
    const result = await requestPermission(permissionType);
    setStatus(result);
  };

  return {
    status,
    isGranted: status === RESULTS.GRANTED,
    request,
  };
};
