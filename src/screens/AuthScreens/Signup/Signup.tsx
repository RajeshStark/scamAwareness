import { View, Text, Image, FlatList } from "react-native";
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
import { createStyles } from "./styles";
import CustomHeader from "../../../components/Input/Header/Header";

export default function Signup({ navigation }) {
  const { theme, isDark } = useAppTheme();
  const styles = createStyles(theme);

  const [inputData, setInputData] = useState({
    first: "",
    last: "",
    email: "",
    DOB: "",
    countrycode: "",
    phone: "",
    password: "",
  });

  const onChangeText = (txt, type) => {
    if (type === "countrycode") {
      setInputData({ ...inputData, countrycode: txt.callingCode[0] });
      return;
    }
    setInputData({ ...inputData, [type]: txt });
  };

  const onSignup = () => {
    console.log({ inputData });
  };

  return (
    <LineraBgContainer reverse>
      <Container>
        <View style={styles.mainContainer}>
          <View style={styles.anotherContainer}>
            <CustomHeader canGoback style={{ marginBottom: 10 }} />
            <Typography style={styles.title}>{strings.signup}</Typography>
            <Typography style={styles.txtgrey}>
              {strings.signandcontinue}
            </Typography>

            <CustomInput
              placeholder="First name"
              value={inputData?.first}
              onChangeText={(txt) => onChangeText(txt, "first")}
            />
            <CustomInput
              placeholder="Last name"
              value={inputData?.last}
              onChangeText={(txt) => onChangeText(txt, "last")}
            />
            <CustomInput
              placeholder="Email"
              value={inputData?.email}
              onChangeText={(txt) => onChangeText(txt, "email")}
            />
            <CustomInput
              placeholder="DOB"
              value={inputData?.DOB}
              onChangeText={(txt) => onChangeText(txt, "DOB")}
              isDatePicker
              rightIcon={
                <Ionicons
                  name="calendar-clear-outline"
                  size={20}
                  color={theme.grey}
                  style={styles.mr}
                />
              }
            />
            <CustomInput
              placeholder="Phone"
              value={inputData?.phone}
              onChangeText={(txt) => onChangeText(txt, "phone")}
              onChangeCountry={(txt) => onChangeText(txt, "countrycode")}
              isPhoneNumber
            />

            <CustomInput
              placeholder="Password"
              value={inputData?.password}
              onChangeText={(txt) => onChangeText(txt, "password")}
              rightIcon={
                <Ionicons
                  name="eye-off-outline"
                  size={20}
                  color={theme.grey}
                  style={styles.mr}
                />
              }
            />
          </View>

          <CustomButton
            isLinear
            title="Register"
            onPress={() => onSignup()}
            // isDisabled={}
          />
          <View style={styles.txtcontainer}>
            <Typography style={[styles.txtgrey, { color: theme.white }]}>
              {strings.alreadyhave}
            </Typography>
            <Typography
              style={styles.txtorange}
              onPress={() => navigation.navigate("Signin")}
            >
              {strings.Login}
            </Typography>
          </View>
        </View>
      </Container>
    </LineraBgContainer>
  );
}
