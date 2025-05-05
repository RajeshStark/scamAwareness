import { StyleSheet } from "react-native";
import { height } from "../../../utils/Dimensions";
import Fonts from "../../../utils/Fonts";

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    mainContainer: {
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
    },
    cardcontainer: {
      width: "90%",
      height: height * 0.6,
      borderRadius: 10,
      overflow: "hidden",
      position: "relative",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.white,
    },

    cardBackground: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: theme.white,
      opacity: 0.5,
      zIndex: -1,
    },
    logo: {
      width: 130,
      height: 80,
      margin: 10,
      alignSelf: "center",
    },
    title: {
      fontSize: 28,
      margin: 15,
    },
    txtgrey: {
      fontSize: 12,
      fontFamily: Fonts.Medium,
      color: theme.grey,
    },
    txtblue: {
      fontSize: 12,
      fontFamily: Fonts.Medium,
      color: theme.info,
      marginLeft: 5,
    },
    txtcontainer: {
      flexDirection: "row",
    },
    or: {
      fontSize: 12,
      color: theme.grey,
      marginVertical: 8,
    },
  });
