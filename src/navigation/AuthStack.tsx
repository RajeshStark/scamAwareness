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

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  const isLoggedIn = useAppSelector((state) => state.login.isLoggedIn);

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
