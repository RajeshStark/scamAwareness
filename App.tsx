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
