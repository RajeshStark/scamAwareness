import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch } from "react-redux";
import { logOut } from "../../../redux/features/login/loginSlice";
import useAppTheme from "../../../hooks/useAppTheme";
import { toggleTheme } from "../../../redux/features/theme/themeSlice";
import LineraBgContainer from "../../../components/Container/LineraBgContainer";

export default function SettingsScreen({ navigation }: any) {
  const { theme, isDark } = useAppTheme();
  const styles = createStyles(theme, isDark);

  const settingsOptions = [
    {
      label: "Account",
      icon: "person-outline",
      onPress: () => navigation.navigate("EditProfile"),
    },
    { label: "Help & Support", icon: "help-circle-outline", onPress: () => {} },
    {
      label: "About App",
      icon: "information-circle-outline",
      onPress: () => {},
    },
    {
      label: "Change Password",
      icon: "log-out-outline",
      onPress: () => {
        navigation.navigate("ChangePassword");
      },
    },
    {
      label: "Logout",
      icon: "log-out-outline",
      onPress: () => {
        logingOut();
      },
    },
    {
      label: `Switch to ${isDark ? "Light" : "Dark"} Theme`,
      icon: "contrast-outline",
      onPress: () => dispatch(toggleTheme()),
    },
  ];

  const dispatch = useDispatch();

  const logingOut = () => {
    dispatch(logOut());
    navigation.reset({
      index: 0,
      routes: [{ name: "LandingPage" }],
    });
  };

  const renderContent = () => {
    return (
      <>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={theme.black} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settings</Text>
        </View>

        <View style={styles.options}>
          {settingsOptions.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={item.onPress}
              style={styles.optionRow}
            >
              <Ionicons
                name={item.icon as any}
                size={20}
                color={isDark ? "#fff" : "#002060"}
              />
              <Text style={styles.optionText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={theme.white}
        barStyle={isDark ? "light-content" : "dark-content"}
      />
      {isDark ? (
        <LineraBgContainer>{renderContent()}</LineraBgContainer>
      ) : (
        <>{renderContent()}</>
      )}
    </SafeAreaView>
  );
}

export const createStyles = (theme: Theme, isDark) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      marginTop: StatusBar.currentHeight,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingTop: 12,
      paddingBottom: 8,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: "600",
      marginLeft: 12,
      color: theme.black,
    },
    options: {
      padding: 20,
    },
    optionRow: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 16,
      borderBottomWidth: 0.4,
      borderBottomColor: "#ccc",
    },
    optionText: {
      marginLeft: 12,
      fontSize: 16,
      color: theme.txt1,
      fontWeight: "500",
    },
    bottomNav: {
      flexDirection: "row",
      justifyContent: "space-around",
      paddingVertical: 12,
      backgroundColor: isDark ? "#fff" : "#6e008b",
    },
  });
