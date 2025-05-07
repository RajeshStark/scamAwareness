import { StyleSheet } from "react-native";
import { height, width } from "../../../utils/Dimensions";
import Fonts from "../../../utils/Fonts";

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    mainContainer: {
      //   flex: 1,
      alignItems: "center",
      //   backgroundColor: theme.white,
      //   height: height * 0.5,
    },
    anotherContainer: {
      marginTop: height * 0.06,
    },

    title: {
      fontSize: 28,
      marginVertical: 5,
      fontFamily: Fonts.Bold,
      alignSelf: "flex-start",
      textAlign: "center",
    },
    txtgrey: {
      fontSize: 12,
      fontFamily: Fonts.Medium,
      color: theme.grey,
      alignSelf: "flex-start",
      marginBottom: 20,
    },
    txtorange: {
      fontSize: 12,
      fontFamily: Fonts.Bold,
      color: theme.gradient1,
      marginLeft: 10,
    },
    txtcontainer: {
      flexDirection: "row",
      marginTop: 20,
    },
    mr: {
      marginRight: 10,
    },
    codeFieldRoot: { marginTop: 20 },
    cell: {
      width: 50,
      height: 60,
      lineHeight: 40,
      fontSize: 24,
      textAlign: "center",
      margin: 5,
      borderRadius: 10,
      color: theme.primary,
      backgroundColor: "#eff5fa",
    },
  });
