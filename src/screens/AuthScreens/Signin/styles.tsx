import { StyleSheet } from "react-native";
import { height, width } from "../../../utils/Dimensions";
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
      // height: height * 0.65,
      borderRadius: 10,
      overflow: "hidden",
      position: "relative",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.white,
      paddingBottom: 40,
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
      fontFamily: Fonts.Bold,
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
    remmain: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "88%",
      marginVertical: 10,
    },
    rememberContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    mr: {
      marginRight: 10,
    },
    imgContainer: {
      padding: 10,
      backgroundColor: theme.white,
      borderRadius: 10,
      margin: 3,
      height: 50,
      alignItems: "center",
      borderColor: theme.grey,
      borderWidth: 0.2,
      width: "98%",
      flexDirection: "row",
      justifyContent: "center",
    },
    img: { width: 25, height: 25 },
    socialtitle: {
      fontSize: 16,
      fontFamily: Fonts.Medium,
      marginLeft: 10,
    },
  });
