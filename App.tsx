import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useEffect } from "react";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { toastConfig } from "./src/components/Toast";
import { useNetworkChange } from "./src/hooks/useNetworkChange.tsx";
import AuthStack from "./src/navigation/AuthStack.tsx";
import { persistor, store } from "./src/redux/store/store.ts";
import messaging from "@react-native-firebase/messaging";
import notifee, { AndroidImportance } from "@notifee/react-native";
import { Alert } from "react-native";
import { PermissionsAndroid, Platform } from "react-native";

export const queryClient = new QueryClient();

export default function App() {
  useNetworkChange();
  // useEffect(() => {
  //   setTimeout(() => {
  //     SplashScreen.hide();
  //   }, 3000);
  // }, []);

  useEffect(() => {
    const requestPermission = async () => {
      if (Platform.OS === "android" && Platform.Version >= 33) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );
        console.log("Notification permission:", granted);
      }
    };

    requestPermission();
  }, []);

  useEffect(() => {
    async function setup() {
      const authStatus = await messaging().requestPermission();
      const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED;

      if (enabled) {
        const token = await messaging().getToken();
        console.log("FCM Token:", token);
      }

      // Create a channel (Android)
      await notifee.createChannel({
        id: "default",
        name: "Default Channel",
        importance: AndroidImportance.HIGH,
      });

      // Foreground listener
      messaging().onMessage(async (remoteMessage) => {
        const { title, body } = remoteMessage.notification;
        console.log({ title, body });

        showLocalNotification(title, body);
      });
    }

    setup();
  }, []);

  const showLocalNotification = async (title, body) => {
    await notifee.displayNotification({
      title,
      body,
      android: {
        channelId: "default",
        smallIcon: "ic_launcher", // Ensure this exists in `res/drawable`
        pressAction: {
          id: "default",
        },
      },
    });
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <AuthStack />
          </NavigationContainer>
          <Toast config={toastConfig} />
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}
