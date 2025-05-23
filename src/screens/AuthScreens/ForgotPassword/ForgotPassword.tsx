import { View, Image, Alert } from "react-native";
import React from "react";
import Container from "../../../components/Container/Container";
import LineraBgContainer from "../../../components/Container/LineraBgContainer";
import CustomButton from "../../../components/Button/CustomButton";
import useAppTheme from "../../../hooks/useAppTheme";
import { Images } from "../../../utils/Images";
import { strings } from "../../../utils/Strings";
import Typography from "../../../components/Typography/Typography";
import CustomInput from "../../../components/Input/Input";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForgotPassword } from "../../../services/hooks/useAuth";
import { createStyles } from "./styles";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
});

export default function ForgotPassword({ navigation }) {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);
  const { mutate: forgotPassword, isPending } = useForgotPassword();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (values) => {
    const payload = {
      userType: 2,
      email: values.email,
    };

    forgotPassword(payload, {
      onSuccess: (res) => {
        if (res.status) {
          Alert.alert(
            "Success",
            res.message || "Check your email for reset instructions."
          );
          navigation.goBack();
        } else {
          Alert.alert("Failed", res.message || "Something went wrong.");
        }
      },
      onError: (err) => {
        const msg = err?.response?.data?.message || "Request failed";
        Alert.alert("Error", msg);
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
            <Typography style={styles.title}>Forgot Password</Typography>
            <Typography style={styles.txtgrey}>
              Enter your email to reset your password.
            </Typography>
            <CustomInput
              label="Email"
              placeholder="Enter your email"
              name="email"
              control={control}
              error={errors}
              keyboardType="email-address"
              autoCapitalize="none"
              rightIcon={
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color={theme.grey}
                  style={styles.mr}
                />
              }
            />
            <CustomButton
              isLinear
              title="Submit"
              onPress={handleSubmit(onSubmit)}
              isLoading={isPending}
            />
          </View>
        </View>
      </Container>
    </LineraBgContainer>
  );
}
