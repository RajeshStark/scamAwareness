import React, { useState } from "react";
import { Alert, Image, Pressable, View } from "react-native";
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
import { launchImageLibrary } from "react-native-image-picker";
import { useUploadMedia } from "../../../services/hooks/usePost";
import { transformResponse } from "../../../utils/Constants";

export default function Signup({ navigation }) {
  const { theme, isDark } = useAppTheme();
  const styles = createStyles(theme);
  const [profilepic, setProfilePic] = useState("");
  const dispatch = useDispatch();
  const { mutate: login, isPending } = useSignup();
  const { mutate: uploadMedia } = useUploadMedia();

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
      profilePicture: profilepic,
      userType: 2,
    };

    login(payload, {
      onSuccess: (response) => {
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
        Alert.alert("Error", message);
      },
    });
  };

  const handlePick = () => {
    launchImageLibrary({ mediaType: "photo", selectionLimit: 1 }, (res) => {
      if (res.didCancel || !res.assets) return;

      const files = res.assets.map((asset) => ({
        uri: asset.uri,
        name: asset.fileName,
        type: asset.type,
      }));

      uploadMedia(files, {
        onSuccess: (res) => {
          const transformed = transformResponse(res);
          setProfilePic(transformed[0]?.url);
        },
        onError: () => {
          showToast("custom", "Upload failed");
        },
      });
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

            <Pressable onPress={handlePick} style={styles.imgContainer}>
              {profilepic === "" ? (
                <View style={styles.greyimg} />
              ) : (
                <Image style={styles.img} source={{ uri: profilepic }} />
              )}
              <Ionicons name="pencil" size={15} style={styles.pencil} />
            </Pressable>

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
