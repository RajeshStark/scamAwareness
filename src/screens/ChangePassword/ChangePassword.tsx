import { View, Text, Image, FlatList, Alert } from "react-native";
import React, { useState } from "react";
import Container from "../../components/Container/Container";
import LineraBgContainer from "../../components/Container/LineraBgContainer";
import CustomButton from "../../components/Button/CustomButton";
import useAppTheme from "../../hooks/useAppTheme";
import { createStyles } from "../AuthScreens/Signin/styles";
import { Images } from "../../utils/Images";

import CustomInput from "../../components/Input/Input";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch } from "react-redux";
import {
  logIn,
  setUserInfo,
  setuserToken,
} from "../../redux/features/login/loginSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  changePasswordSchema,
  signinSchema,
} from "../../utils/ValidationScemas";
import { useChangePassword, useLogin } from "../../services/hooks/useAuth";
import CustomHeader from "../../components/Input/Header/Header";
import { showToast } from "../../components/Toast";

export default function ChangePassword({ navigation }) {
  const { theme, isDark } = useAppTheme();
  const styles = createStyles(theme, isDark);
  const dispatch = useDispatch();
  const { mutate: changepassword, isPending } = useChangePassword();
  const {
    control,
    watch,
    formState: { errors, isValid },
    getValues,
    handleSubmit,
  } = useForm({
    mode: "all",
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    resolver: yupResolver(changePasswordSchema),
  });

  const loginToApp = (values) => {
    const payload = {
      newPassword: values.newPassword,
      oldPassword: values.oldPassword,
    };
    console.log({ payload });

    // return;
    changepassword(payload, {
      onSuccess: (response) => {
        if (response.status) {
          navigation.goBack();
          showToast("custom", "Password updated successfully!");
        }
      },
      onError: (error: any) => {
        console.log("AT CHANGE", error?.response?.data?.error?.message);

        const message =
          error?.response?.data?.error?.message || "Change password failed";
        showToast("custom", message);
      },
    });
  };

  return (
    <LineraBgContainer>
      <Container>
        <View style={{ marginTop: 30, margin: 10 }}>
          <CustomHeader canGoback />
          <Image
            source={Images.darkLogo}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.cardcontainer}>
            <CustomInput
              label="Old Password"
              placeholder="Old Password"
              control={control}
              error={errors}
              name="oldPassword"
              rightIcon={
                <Ionicons
                  name="eye-off-outline"
                  size={20}
                  color={theme.grey}
                  style={styles.mr}
                />
              }
            />
            <CustomInput
              label="New Password"
              placeholder="New Password"
              control={control}
              error={errors}
              name="newPassword"
              rightIcon={
                <Ionicons
                  name="eye-off-outline"
                  size={20}
                  color={theme.grey}
                  style={styles.mr}
                />
              }
            />
            <CustomInput
              label="Confirm Password"
              placeholder="Confirm Password"
              control={control}
              error={errors}
              name="confirmPassword"
              rightIcon={
                <Ionicons
                  name="eye-off-outline"
                  size={20}
                  color={theme.grey}
                  style={styles.mr}
                />
              }
            />
            <CustomButton
              isLinear
              title="Change Password"
              isDisabled={!isValid}
              onPress={handleSubmit(loginToApp)}
            />
          </View>
        </View>
      </Container>
    </LineraBgContainer>
  );
}
