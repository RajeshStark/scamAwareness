import NetInfo from "@react-native-community/netinfo";
import { useEffect, useRef } from "react";
import { showToast } from "../components/Toast";

export const useNetworkChange = () => {
  const isFirstRun = useRef(true);
  const previousConnection = useRef(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const { isConnected } = state;

      if (isFirstRun.current) {
        isFirstRun.current = false;
        previousConnection.current = isConnected;
        return;
      }

      if (isConnected !== previousConnection.current) {
        if (isConnected) {
          showToast("custom", "Internet is back!");
        } else {
          showToast("custom", "Check your Internet Connection & Retry");
        }
        previousConnection.current = isConnected;
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
};
