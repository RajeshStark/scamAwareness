import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { toastConfig } from "./src/components/Toast";
import { useNetworkChange } from "./src/hooks/useNetworkChange.tsx";
import AuthStack from "./src/navigation/AuthStack.tsx";
import { persistor, store } from "./src/redux/store/store.ts";

export const queryClient = new QueryClient();

export default function App() {
  useNetworkChange();
  // useEffect(() => {
  //   setTimeout(() => {
  //     SplashScreen.hide();
  //   }, 3000);
  // }, []);

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
