import React from "react";
import { Text, View } from "react-native";
import Toast, { BaseToastProps, ToastType } from "react-native-toast-message";

import Icons from "react-native-vector-icons/AntDesign";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
// import { store } from "../../redux/store/store.ts";
import { width } from "../../utils/Dimensions.tsx";
import { styles } from "./styles";
import { store } from "../../redux/store/store.ts";

interface CustomToastProps extends BaseToastProps {
  text1?: string;
}

export const toastConfig = {
  success: ({ text1, props, ...rest }) => (
    <View style={styles.toastStyle}>
      <View style={{ ...styles.verticalLine, backgroundColor: "green" }} />
      <Icons
        name="checkcircleo"
        size={15}
        color={"green"}
        style={styles.toastIcon}
        onPress={() => {
          Toast.hide();
        }}
      />
      <View style={styles.successView}>
        <Text style={styles.titleText}>Success</Text>
        <Text style={styles.messageText}>{text1}</Text>
      </View>
    </View>
  ),
  error: ({ text1, props, ...rest }) => (
    <View style={styles.toastStyle}>
      <View style={{ ...styles.verticalLine, backgroundColor: "#fff" }} />
      <Icons
        name="closecircleo"
        size={15}
        color={"red"}
        style={styles.toastIcon}
        onPress={() => {
          Toast.hide();
        }}
      />
      <View style={styles.errorView}>
        <Text style={styles.titleText}>Error</Text>
        <Text style={styles.messageText}>{text1}</Text>
      </View>
    </View>
  ),
  info: ({ text1, props, ...rest }) => (
    <View style={styles.toastStyle}>
      <View style={{ ...styles.verticalLine, backgroundColor: "yellow" }} />
      <IoniconsIcon
        name="alert-circle-outline"
        size={15}
        color={"yellow"}
        style={styles.toastIcon}
        onPress={() => {
          Toast.hide();
        }}
      />
      <View style={styles.infoView}>
        <Text style={styles.titleText}>Information</Text>
        <Text style={styles.messageText}>{text1}</Text>
      </View>
    </View>
  ),
  custom: ({ text1 }: CustomToastProps) => (
    <View
      style={[
        styles.toastStyle,
        {
          backgroundColor: store?.getState()?.theme?.isDark
            ? "#576664"
            : "#000",
          minHeight: 52,
          alignItems: "center",
          width: width - 70,
        },
      ]}
    >
      <Text style={[styles.titleText, { color: "#F1F4F3", flex: 1 }]}>
        {text1}
      </Text>
    </View>
  ),
};

// this function is for show toast message
export const showToast = (type: ToastType | "custom", message: string) => {
  Toast.show({
    type: type,
    text1: message,
    // visibilityTime: au,
    autoHide: true,
    bottomOffset: 30,
    position: "bottom",
    onPress: () => {
      Toast.hide();
    },
    swipeable: false,
  });
};
