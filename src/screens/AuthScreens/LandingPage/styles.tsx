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
      marginTop: 40,
    },
    title: {
      fontSize: 28,
      margin: 15,
    },
    or: {
      fontSize: 8,
      color: theme.grey,
      marginVertical: 8,
    },
    imgContainer: {
      padding: 10,
      backgroundColor: theme.white,
      borderRadius: 10,
      margin: 10,
      width: 60,
      height: 50,
      alignItems: "center",
    },
    img: { width: 25, height: 25 },
  });
