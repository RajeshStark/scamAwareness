import { View, Text, Image } from "react-native";
import React from "react";
import Container from "../../../components/Container/Container";
import LineraBgContainer from "../../../components/Container/LineraBgContainer";
import CustomButton from "../../../components/Button/CustomButton";
import useAppTheme from "../../../hooks/useAppTheme";
import { createStyles } from "./styles";
import { Images } from "../../../utils/Images";
import { strings } from "../../../utils/Strings";
import Typography from "../../../components/Typography/Typography";

export default function SignIn() {
  const { theme, isDark } = useAppTheme();
  const styles = createStyles(theme);
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
              <Typography style={styles.txtblue}>{strings.sign}</Typography>
            </View>
            <CustomButton isLinear title={strings.Login} onPress={() => {}} />
            <Typography style={styles.or}>{strings.or}</Typography>
          </View>
        </View>
      </Container>
    </LineraBgContainer>
  );
}
