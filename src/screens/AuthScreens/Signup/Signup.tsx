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
    email: "",
    password: "",
  });

  const onChangeText = () => {};

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
              value={inputData?.email}
              onChangeText={onChangeText}
            />
            <CustomInput
              placeholder="Last name"
              value={inputData?.email}
              onChangeText={onChangeText}
            />
            <CustomInput
              placeholder="Email"
              value={inputData?.email}
              onChangeText={onChangeText}
            />
            <CustomInput
              placeholder="DOB"
              value={inputData?.email}
              onChangeText={onChangeText}
            />
            <CustomInput
              placeholder="Phone"
              value={inputData?.email}
              onChangeText={onChangeText}
            />

            <CustomInput
              placeholder="Password"
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
          </View>

          <CustomButton isLinear title="Register" onPress={() => {}} />
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
