import { View, Text, Image, FlatList, Alert } from "react-native";
import React, { useState } from "react";
import Container from "../../../components/Container/Container";
import LineraBgContainer from "../../../components/Container/LineraBgContainer";
import CustomButton from "../../../components/Button/CustomButton";
import useAppTheme from "../../../hooks/useAppTheme";
import { createStyles } from "./styles";
import { Images } from "../../../utils/Images";
import { strings } from "../../../utils/Strings";
import Typography from "../../../components/Typography/Typography";
import CustomInput from "../../../components/Input/Input";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch } from "react-redux";
import {
  logIn,
  setUserInfo,
  setuserToken,
} from "../../../redux/features/login/loginSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signinSchema } from "../../../utils/ValidationScemas";
import { useLogin } from "../../../services/hooks/useAuth";

export default function SignIn({ navigation }) {
  const { theme, isDark } = useAppTheme();
  const styles = createStyles(theme);
  const dispatch = useDispatch();
  const { mutate: login, isPending } = useLogin();
  const {
    control,
    watch,
    formState: { errors, isValid },
    getValues,
    handleSubmit,
  } = useForm({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(signinSchema),
  });

  const arr = [
    {
      id: "1",
      uri: Images.google,
      title: "Continue with Google",
    },
    { id: "2", uri: Images.facebook, title: "Continue with Facebook" },
  ];

  const loginToApp = (values) => {
    const payload = {
      ...values,
      userType: 2,
      fcmToken: "",
    };
    login(payload, {
      onSuccess: (response) => {
        if (response.status) {
          const user = response.output.userDetails;
          const token = response.output.accessToken;
          dispatch(setUserInfo(user));
          dispatch(setuserToken(token));
          dispatch(logIn());
          navigation.reset({
            index: 0,
            routes: [{ name: "BottomTabs" }],
          });
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
    <LineraBgContainer>
      <Container>
        <Image
          source={Images.darkLogo}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.mainContainer}>
          <View style={styles.cardcontainer}>
            <Typography style={styles.title}>{strings.Login}</Typography>
            <View style={styles.txtcontainer}>
              <Typography style={styles.txtgrey}>{strings.dont}</Typography>
              <Typography
                style={styles.txtblue}
                onPress={() => navigation.navigate("Signup")}
              >
                {strings.sign}
              </Typography>
            </View>
            <CustomInput
              label="Email"
              placeholder="email"
              control={control}
              name="email"
              error={errors}
            />
            <CustomInput
              label="Password"
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
            <View style={styles.remmain}>
              <View style={styles.rememberContainer}>
                <Ionicons name={"square-outline"} size={15} style={styles.mr} />
                <Typography style={styles.txtgrey}>
                  {strings.remember}
                </Typography>
              </View>
              <Typography
                onPress={() => navigation.navigate("ForgotPassword")}
                style={styles.txtblue}
              >
                {strings.forgot}
              </Typography>
            </View>
            <CustomButton
              isLinear
              title={strings.Login}
              // isDisabled={!isValid}
              onPress={handleSubmit(loginToApp)}
            />
            <Typography style={styles.or}>{strings.or}</Typography>
            <FlatList
              data={arr}
              style={{ width: "90%" }}
              renderItem={({ item }) => (
                <View style={styles.imgContainer}>
                  <Image
                    source={item.uri}
                    style={styles.img}
                    resizeMode="contain"
                  />
                  <Typography style={styles.socialtitle}>
                    {item.title}
                  </Typography>
                </View>
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
      </Container>
    </LineraBgContainer>
  );
}
