import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch } from "react-redux";
import { logOut } from "../../../redux/features/login/loginSlice";

export default function SettingsScreen({ navigation }: any) {
  const settingsOptions = [
    { label: "Account", icon: "person-outline", onPress: () => {} },
    { label: "Help & Support", icon: "help-circle-outline", onPress: () => {} },
    {
      label: "About App",
      icon: "information-circle-outline",
      onPress: () => {},
    },
    {
      label: "Logout",
      icon: "log-out-outline",
      onPress: () => {
        logingOut();
      },
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

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      {/* Options */}
      <View style={styles.options}>
        {settingsOptions.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={item.onPress}
            style={styles.optionRow}
          >
            <Ionicons name={item.icon as any} size={20} color="#002060" />
            <Text style={styles.optionText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
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
    color: "#002060",
    fontWeight: "500",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    backgroundColor: "#6e008b",
  },
});
