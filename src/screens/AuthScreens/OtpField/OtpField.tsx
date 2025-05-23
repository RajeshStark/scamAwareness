import { View, Text, Image, FlatList, Platform, Alert } from "react-native";
import React, { useState } from "react";
import Container from "../../../components/Container/Container";
import LineraBgContainer from "../../../components/Container/LineraBgContainer";
import CustomButton from "../../../components/Button/CustomButton";
import useAppTheme from "../../../hooks/useAppTheme";

import { Images } from "../../../utils/Images";
import { strings } from "../../../utils/Strings";
import Typography from "../../../components/Typography/Typography";
import CustomInput from "../../../components/Input/Input";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import CustomHeader from "../../../components/Input/Header/Header";
import { createStyles } from "./styles";
import { useDispatch } from "react-redux";
import {
  logIn,
  setUserInfo,
  setuserToken,
} from "../../../redux/features/login/loginSlice";
import { useVerify } from "../../../services/hooks/useAuth";
import { showToast } from "../../../components/Toast";

export default function OtpField({ navigation, route }) {
  const email = route?.params?.email;
  const { theme, isDark } = useAppTheme();
  const styles = createStyles(theme);
  const dispatch = useDispatch();
  const { mutate: verify, isPending } = useVerify();

  const [otp, setOtp] = useState("");

  const loginToApp = () => {
    const payload = {
      otp,
    };

    verify(payload, {
      onSuccess: (response) => {
        console.log(response);

        if (response.status) {
          const user = response.output.userDetails;
          const token = response.output.accessToken;
          console.log("OTP FIELD", { user, token });

          dispatch(setUserInfo(user));
          dispatch(setuserToken(token));
          dispatch(logIn());
          navigation.reset({
            index: 0,
            routes: [{ name: "BottomTabs" }],
          });
          showToast("custom", "Account created successfully!");
        } else {
          Alert.alert(
            "Verify failed",
            response.message || "Something went wrong."
          );
        }
      },
      onError: (error: any) => {
        const message = error?.response?.data?.message || "Login failed";
        console.log(message);
        Alert.alert("Error", message);
      },
    });
  };

  return (
    <LineraBgContainer reverse>
      <Container>
        <View style={styles.mainContainer}>
          <CustomHeader
            canGoback
            style={{ marginLeft: 15, marginVertical: 20 }}
          />
          <View style={styles.anotherContainer}>
            <Typography
              style={styles.title}
            >{`OTP\nVerification Code`}</Typography>
            <Typography style={styles.txtgrey}>
              {`We have sent the code to  ${email}`}
            </Typography>
          </View>

          <CodeField
            value={otp}
            onChangeText={setOtp}
            cellCount={6}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            autoComplete={Platform.select({
              android: "sms-otp",
              default: "one-time-code",
            })}
            testID="my-code-input"
            renderCell={({ index, symbol, isFocused }) => (
              <Text key={index} style={[styles.cell]}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />

          <View style={styles.txtcontainer}>
            <Typography style={[styles.txtgrey, { color: theme.white }]}>
              Didn’t recieve a code?
            </Typography>
            <Typography
              style={styles.txtorange}
              onPress={() => navigation.navigate("Signin")}
            >
              Resend code
            </Typography>
          </View>

          <CustomButton isLinear title="Confirm" onPress={() => loginToApp()} />
        </View>
      </Container>
    </LineraBgContainer>
  );
}
