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
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignupSchema } from "../../../utils/ValidationScemas";

export default function Signup({ navigation }) {
  const { theme, isDark } = useAppTheme();
  const styles = createStyles(theme);

  const {
    control,
    watch,
    formState: { errors, isValid },
    getValues,
  } = useForm({
    mode: "all",
    defaultValues: {
      first: "",
      last: "",
      email: "",
      DOB: "",
      countrycode: "",
      phone: "",
      password: "",
    },
    resolver: yupResolver(SignupSchema),
  });

  // const [inputData, setInputData] = useState({
  //   first: "",
  //   last: "",
  //   email: "",
  //   DOB: "",
  //   countrycode: "",
  //   phone: "",
  //   password: "",
  // });

  // const onChangeText = (txt, type) => {
  //   if (type === "countrycode") {
  //     setInputData({ ...inputData, countrycode: txt.callingCode[0] });
  //     return;
  //   }
  //   setInputData({ ...inputData, [type]: txt });
  // };

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
              placeholder="First Name"
              control={control}
              name="first"
              error={errors}
            />
            <CustomInput
              placeholder="Last name"
              control={control}
              name="email"
              error={errors}
            />
            <CustomInput
              placeholder="Enter email"
              control={control}
              name="email"
              error={errors}
            />
            <CustomInput
              placeholder="DOB"
              control={control}
              error={errors}
              name="DOB"
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
              control={control}
              error={errors}
              name="phone"
              onChangeCountry={(txt) => onChangeText(txt, "countrycode")}
              isPhoneNumber
            />

            <CustomInput
              placeholder="Password"
              control={control}
              error={errors}
              name="password"
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
            isDisabled={!isValid}
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
