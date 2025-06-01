import React from "react";
import { Image, View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LinearGradient from "react-native-linear-gradient";
import Home from "../screens/Home/Home";
import Explore from "../screens/Explore/Explore";
import Notifications from "../screens/Notifications/Notifications";
import Profile from "../screens/Profile/Profile/Profile";
import Alerts from "../screens/Alerts/Alerts";

const Tab = createBottomTabNavigator();

const CustomTabBarBackground = () => (
  <LinearGradient
    colors={["#861a75", "#2e0828", "#000"]}
    start={{ x: 0, y: 0 }}
    end={{ x: 0, y: 2.3 }}
    style={StyleSheet.absoluteFill}
  />
);

const screenOptions = ({ route }) => ({
  headerShown: false,
  tabBarIcon: ({ focused }) => {
    const icons = {
      Home: {
        active: require("../assets/images/BottomTab/HomeActive.png"),
        inactive: require("../assets/images/BottomTab/HomeInactive.png"),
      },
      Search: {
        active: require("../assets/images/BottomTab/searchactive.png"),
        inactive: require("../assets/images/BottomTab/searchinactive.png"),
      },
      Notifications: {
        active: require("../assets/images/BottomTab/bellactive.png"),
        inactive: require("../assets/images/BottomTab/bellinactive.png"),
      },
      Alerts: {
        active: require("../assets/images/BottomTab/dangeractive.png"),
        inactive: require("../assets/images/BottomTab/Dangerinactive.png"),
      },

      Profile: {
        active: require("../assets/images/BottomTab/Profileactive.png"),
        inactive: require("../assets/images/BottomTab/Profileinactive.png"),
      },
    };

    return (
      <Image
        source={focused ? icons[route.name].active : icons[route.name].inactive}
        style={{ width: 24, height: 24 }}
        resizeMode="contain"
      />
    );
  },
  tabBarShowLabel: false,
  tabBarBackground: () => <CustomTabBarBackground />,
  tabBarStyle: {
    height: 60,
    borderTopWidth: 0,
    backgroundColor: "transparent",
    position: "absolute",
  },
});

export default function App() {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Explore} />
      <Tab.Screen name="Notifications" component={Notifications} />
      <Tab.Screen name="Alerts" component={Alerts} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
