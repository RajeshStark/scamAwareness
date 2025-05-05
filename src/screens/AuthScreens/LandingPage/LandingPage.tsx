import { View, Text, Image, FlatList } from "react-native";
import React from "react";
import Container from "../../../components/Container/Container";
import LineraBgContainer from "../../../components/Container/LineraBgContainer";
import CustomButton from "../../../components/Button/CustomButton";
import useAppTheme from "../../../hooks/useAppTheme";
import { Images } from "../../../utils/Images";
import { createStyles } from "./styles";
import Typography from "../../../components/Typography/Typography";
import { strings } from "../../../utils/Strings";

export default function LandingPage({ navigation }) {
  const { theme, isDark } = useAppTheme();
  const styles = createStyles(theme);

  const arr = [
    {
      id: "1",
      uri: Images.google,
    },
    { id: "2", uri: Images.facebook },
    { id: "3", uri: Images.apple },
    { id: "4", uri: Images.mobile },
  ];
  return (
    <LineraBgContainer reverse>
      <Container>
        <View style={styles.mainContainer}>
          <View style={styles.cardcontainer}>
            <View style={styles.cardBackground} />
            <Image
              source={isDark ? Images.darkLogo : Images.whiteLogo}
              style={styles.logo}
              resizeMode="contain"
            />
            <Typography style={styles.title}>
              {strings.signuporlogin}
            </Typography>
            <CustomButton
              isLinear
              title={strings.signup}
              onPress={() => navigation.navigate("Signup")}
            />
            <Typography style={styles.or}>{strings.or}</Typography>
            <CustomButton
              isLinear
              title={strings.Login}
              onPress={() => navigation.navigate("Signin")}
            />
            <Typography style={styles.or}>{strings.signloginwith}</Typography>
            <FlatList
              data={arr}
              horizontal
              renderItem={({ item }) => (
                <View style={styles.imgContainer}>
                  <Image
                    source={item.uri}
                    style={styles.img}
                    resizeMode="contain"
                  />
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
