import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "../screens/AuthScreens/Signin/SignIn";
import Signup from "../screens/AuthScreens/Signup/Signup";
import Home from "../screens/Home/Home";
import { useAppSelector } from "../hooks/useAppselector";
import LandingPage from "../screens/AuthScreens/LandingPage/LandingPage";
import OtpField from "../screens/AuthScreens/OtpField/OtpField";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  const isLoggedIn = useAppSelector((state) => state.login.isLoggedIn);

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={isLoggedIn ? "Home" : "LandingPage"}
    >
      <Stack.Screen name="LandingPage" component={LandingPage} />
      <Stack.Screen name="Signin" component={SignIn} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="OtpField" component={OtpField} />
    </Stack.Navigator>
  );
}
