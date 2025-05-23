import React from "react";
import { Alert, View } from "react-native";
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
import { useDispatch } from "react-redux";
import { useSignup } from "../../../services/hooks/useAuth";
import { showToast } from "../../../components/Toast";

export default function Signup({ navigation }) {
  const { theme, isDark } = useAppTheme();
  const styles = createStyles(theme);
  const dispatch = useDispatch();
  const { mutate: login, isPending } = useSignup();

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
      firstName: "",
      lastName: "",
      email: "",
      dob: "",
      countryCode: "",
      phoneNumber: "",
      password: "",
    },
    resolver: yupResolver(SignupSchema),
  });

  const onSignup = (values) => {
    const payload = {
      ...values,
      userType: 2,
    };
    console.log({ payload });

    login(payload, {
      onSuccess: (response) => {
        console.log(response);

        if (response.status) {
          navigation.navigate("OtpField", {
            email: values?.email,
          });
          showToast("custom", response.output);
        } else {
          Alert.alert(
            "Login failed",
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
          <View style={styles.anotherContainer}>
            <CustomHeader canGoback style={{ marginBottom: 10 }} />
            <Typography style={styles.title}>{strings.signup}</Typography>
            <Typography style={styles.txtgrey}>
              {strings.signandcontinue}
            </Typography>

            <CustomInput
              placeholder="First Name"
              control={control}
              name="firstName"
              error={errors}
            />
            <CustomInput
              placeholder="Last name"
              control={control}
              name="lastName"
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
              name="dob"
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
              name="phoneNumber"
              isPhoneNumber
              onChangeCountry={(code) => {
                setValue("countryCode", code);
                console.log({ code });
              }}
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
