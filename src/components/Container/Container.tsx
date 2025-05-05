import React, { ReactNode, useMemo } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  SafeAreaView,
  SafeAreaViewProps,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import useAppTheme from "../../hooks/useAppTheme";
import styles from "./styles";

interface ContainerProps {
  children: ReactNode;
  isStatusBarhidden?: boolean;
  statusBgClr?: string;
  edges?: SafeAreaViewProps["edges"];
  withScroll?: boolean;
  enableKeyboardAvoiding?: boolean;
  enableBar?: boolean;
}

const Container: React.FC<ContainerProps> = ({
  children,
  isStatusBarhidden = false,
  statusBgClr,
  edges,
  withScroll = true,
  enableKeyboardAvoiding = true,
  enableBar = false,
}) => {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useAppTheme();

  const containerStyle = useMemo(
    () => ({
      backgroundColor: theme.white,
    }),
    [theme.white]
  );

  const dismissKeyboard = () => Keyboard.dismiss();

  return (
    <SafeAreaView edges={edges} style={[styles.headingcontainer]}>
      {enableBar &&
        (Platform.OS === "ios" ? (
          <View
            style={[
              styles.iosCustomStatusBar,
              {
                backgroundColor: statusBgClr ? statusBgClr : theme.white,
                height: insets.top,
              },
            ]}
          />
        ) : (
          <StatusBar
            barStyle={isDark ? "light-content" : "dark-content"}
            backgroundColor={statusBgClr ? statusBgClr : theme.white}
            hidden={isStatusBarhidden}
            translucent
          />
        ))}
      <KeyboardAvoidingView
        enabled={enableKeyboardAvoiding}
        style={styles.headingcontainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          {withScroll ? (
            <ScrollView
              scrollEnabled={withScroll}
              contentContainerStyle={styles.scrollcontainer}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              {children}
            </ScrollView>
          ) : (
            <>{children}</>
          )}
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Container;
