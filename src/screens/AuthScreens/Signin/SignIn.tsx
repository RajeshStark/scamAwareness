import { View, Text, Image, FlatList } from "react-native";
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

export default function SignIn({ navigation }) {
  const { theme, isDark } = useAppTheme();
  const styles = createStyles(theme);
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });

  const arr = [
    {
      id: "1",
      uri: Images.google,
      title: "Continue with Google",
    },
    { id: "2", uri: Images.facebook, title: "Continue with Facebook" },
    // { id: "3", uri: Images.apple },
    // { id: "4", uri: Images.mobile },
  ];

  const onChangeText = () => {};
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
              value={inputData?.email}
              onChangeText={onChangeText}
            />
            <CustomInput
              label="Password"
              value={inputData?.email}
              onChangeText={onChangeText}
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
              <Typography style={styles.txtblue}>{strings.forgot}</Typography>
            </View>
            <CustomButton isLinear title={strings.Login} onPress={() => {}} />
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
