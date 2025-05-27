import { PermissionsAndroid, Platform } from "react-native";

export const checkAndRequestPermissions = async () => {
  if (Platform.OS !== "android") return true;

  try {
    const permissions = [
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    ];

    const sdkInt =
      Platform.constants?.Release || parseInt(Platform.Version, 10);
    if (sdkInt >= 33) {
      permissions.push(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO // ⚠️ new
      );
    } else {
      permissions.push(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
    }

    const statuses = await PermissionsAndroid.requestMultiple(permissions);
    const allGranted = Object.values(statuses).every(
      (status) => status === PermissionsAndroid.RESULTS.GRANTED
    );

    return allGranted;
  } catch (err) {
    console.warn("Permission error:", err);
    return false;
  }
};
