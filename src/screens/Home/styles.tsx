import { StyleSheet } from "react-native";
import { height, width } from "../../utils/Dimensions";

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    fabWrapper: {
      position: "absolute",
      bottom: 30,
      right: 20,
      alignItems: "center",
    },
    fabMain: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: theme.secondary,
      justifyContent: "center",
      alignItems: "center",
      elevation: 4,
      marginBottom: 50,
    },
    fabOption: {
      position: "absolute",
      right: 0,
    },
    optionBtn: {
      backgroundColor: "#333",
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 20,
      marginBottom: 8,
    },
    fabIconBtn: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: "#F5A623",
      justifyContent: "center",
      alignItems: "center",
      elevation: 5,
      marginBottom: 10,
    },
    mainContainer: {
      paddingBottom: 100,
      height: height,
      width: width,
    },
    center: {
      justifyContent: "center",
      alignItems: "center",
    },
  });
