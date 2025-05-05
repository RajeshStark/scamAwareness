import { View, Text, Image } from "react-native";
import React from "react";
import Container from "../../../components/Container/Container";
import LineraBgContainer from "../../../components/Container/LineraBgContainer";
import CustomButton from "../../../components/Button/CustomButton";
import useAppTheme from "../../../hooks/useAppTheme";
import { Images } from "../../../utils/Images";
import { createStyles } from "./styles";
import Typography from "../../../components/Typography/Typography";
import { strings } from "../../../utils/Strings";

export default function LandingPage() {
  const { theme, isDark } = useAppTheme();
  const styles = createStyles(theme);
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
            <CustomButton isLinear title={strings.signup} onPress={() => {}} />
            <Typography style={styles.or}>{strings.or}</Typography>
            <CustomButton isLinear title={strings.Login} onPress={() => {}} />
            <Typography style={styles.or}>{strings.signloginwith}</Typography>
          </View>
        </View>
      </Container>
    </LineraBgContainer>
  );
}
