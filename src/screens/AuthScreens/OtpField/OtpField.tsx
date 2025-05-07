import { View, Text, Image, FlatList, Platform } from "react-native";
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
import { logIn } from "../../../redux/features/login/loginSlice";

export default function OtpField({ navigation }) {
  const { theme, isDark } = useAppTheme();
  const styles = createStyles(theme);
  const dispatch = useDispatch();
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });
  const [otp, setOtp] = useState("");

  const onChangeText = () => {};

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
              {"We have sent the code to nyandoonotex@gmail.com "}
            </Typography>
          </View>

          <CodeField
            // ref={ref}
            // {...props}
            // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
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
              <Text
                key={index}
                style={[styles.cell]}
                // onLayout={getCellOnLayoutHandler(index)}
              >
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

          <CustomButton
            isLinear
            title="Confirm"
            onPress={() => dispatch(logIn())}
          />
        </View>
      </Container>
    </LineraBgContainer>
  );
}
