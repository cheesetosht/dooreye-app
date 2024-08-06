import {Platform} from 'react-native';
import {
  PERMISSIONS,
  Permission,
  PermissionStatus,
  request,
  check,
  RESULTS,
} from 'react-native-permissions';

export type PermissionType = 'camera' | 'notifications';

const PLATFORM_PERMISSIONS: Record<PermissionType, Permission> = {
  camera: Platform.select({
    android: PERMISSIONS.ANDROID.CAMERA,
    ios: PERMISSIONS.IOS.CAMERA,
  }) as Permission,
  notifications: Platform.select({
    android: PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
  }) as Permission,
};

export const checkPermission = async (
  permissionType: PermissionType,
): Promise<PermissionStatus> => {
  const permission = PLATFORM_PERMISSIONS[permissionType];
  if (!permission) {
    throw new Error(`Permission type '${permissionType}' is not supported`);
  }

  try {
    const result = await check(permission);
    return result;
  } catch (error) {
    console.debug('Error checking permission:', error);
    return RESULTS.DENIED;
  }
};

export const requestPermission = async (
  permissionType: PermissionType,
): Promise<PermissionStatus> => {
  const permission = PLATFORM_PERMISSIONS[permissionType];
  if (!permission) {
    throw new Error(`Permission type '${permissionType}' is not supported`);
  }

  try {
    const result = await request(permission);
    return result;
  } catch (error) {
    console.debug('Error requesting permission:', error);
    return RESULTS.DENIED;
  }
};

class PermissionsManager {
  async ensurePermission(permissionType: PermissionType): Promise<boolean> {
    let result: PermissionStatus = await checkPermission(permissionType);

    if (result === RESULTS.DENIED) {
      result = await requestPermission(permissionType);
    }

    return result === RESULTS.GRANTED;
  }

  // Add other permission management methods as needed
}

export default new PermissionsManager();
