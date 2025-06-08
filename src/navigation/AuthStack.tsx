import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "../screens/AuthScreens/Signin/SignIn";
import Signup from "../screens/AuthScreens/Signup/Signup";
import Home from "../screens/Home/Home";
import { useAppSelector } from "../hooks/useAppselector";
import LandingPage from "../screens/AuthScreens/LandingPage/LandingPage";
import OtpField from "../screens/AuthScreens/OtpField/OtpField";
import BottomTabs from "./BottomTabs";
import Settings from "../screens/Profile/Settings/Settings";
import EditProfile from "../screens/Profile/EditProfile/EditProfile";
import EditorScreen from "../screens/Editor/Editor";
import ForgotPassword from "../screens/AuthScreens/ForgotPassword/ForgotPassword";
import { PostDetailScreen } from "../screens/PostDetailsScreen/PostDetailScreen";
import ChangePassword from "../screens/ChangePassword/ChangePassword";
import { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
import notifee, { AndroidImportance } from "@notifee/react-native";
import { useDispatch } from "react-redux";
import { setFCMToken } from "../redux/features/login/loginSlice";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  const dispatch = useDispatch();
  const isLoggedIn = useAppSelector((state) => state.login.isLoggedIn);
  useEffect(() => {
    async function setup() {
      const authStatus = await messaging().requestPermission();
      const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED;

      if (enabled) {
        const token = await messaging().getToken();
        dispatch(setFCMToken(token));
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
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={isLoggedIn ? "BottomTabs" : "LandingPage"}
    >
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="EditorScreen" component={EditorScreen} />
      <Stack.Screen name="LandingPage" component={LandingPage} />
      <Stack.Screen name="Signin" component={SignIn} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="OtpField" component={OtpField} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="PostDetailScreen" component={PostDetailScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
    </Stack.Navigator>
  );
}
