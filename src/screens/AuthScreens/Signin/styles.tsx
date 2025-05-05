import { StyleSheet } from "react-native";
import { height } from "../../../utils/Dimensions";

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
    },
  });
