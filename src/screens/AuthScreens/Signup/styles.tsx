import { StyleSheet } from "react-native";
import { height, width } from "../../../utils/Dimensions";
import Fonts from "../../../utils/Fonts";

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      alignItems: "center",
    },
    anotherContainer: {
      marginTop: height * 0.02,
    },
    cardcontainer: {
      width: "90%",
      borderRadius: 10,
      overflow: "hidden",
      position: "relative",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.white,
      paddingBottom: 40,
    },
    logo: {
      width: 130,
      height: 80,
      margin: 10,
      alignSelf: "center",
    },
    title: {
      fontSize: 28,
      marginVertical: 5,
      fontFamily: Fonts.Bold,
      alignSelf: "flex-start",
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
    img: {
      width: 100,
      height: 100,
      borderRadius: 100,
      alignSelf: "center",
    },
    greyimg: {
      width: 100,
      height: 100,
      borderRadius: 100,
      backgroundColor: "grey",
      alignSelf: "center",
    },
  });
