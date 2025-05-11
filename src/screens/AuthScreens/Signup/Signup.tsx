import React from "react";
import { View } from "react-native";
import CustomButton from "../../../components/Button/CustomButton";
import Container from "../../../components/Container/Container";
import LineraBgContainer from "../../../components/Container/LineraBgContainer";
import useAppTheme from "../../../hooks/useAppTheme";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomHeader from "../../../components/Input/Header/Header";
import CustomInput from "../../../components/Input/Input";
import Typography from "../../../components/Typography/Typography";
import { strings } from "../../../utils/Strings";
import { SignupSchema } from "../../../utils/ValidationScemas";
import { createStyles } from "./styles";

export default function Signup({ navigation }) {
  const { theme, isDark } = useAppTheme();
  const styles = createStyles(theme);

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setValue,
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

  const onSignup = (values) => {
    console.log({ values });
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
              name="last"
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
              isPhoneNumber
              onChangeCountry={(code) => {
                setValue("countrycode", code);
                console.log({ code });
              }} // ✅ update here
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
            onPress={handleSubmit(onSignup)}
            // onPress={() => navigation.navigate("OtpField")}
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
