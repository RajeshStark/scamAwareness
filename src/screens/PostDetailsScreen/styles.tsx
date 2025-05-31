import { StyleSheet } from "react-native";
import { height, width } from "../../utils/Dimensions";
import Fonts from "../../utils/Fonts";

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    safeAreview: { paddingTop: 30 },
    pt: { padding: 10 },
    mv: { marginVertical: 12 },
    commentstitle: { fontWeight: "bold", marginBottom: 8 },
    mb: { marginBottom: 8 },
    cUsertxt: {
      fontFamily: Fonts.Medium,
      marginLeft: 10,
    },
    commentContainer: {
      padding: 10,
      backgroundColor: theme.white,
      margin: 10,
      borderRadius: 10,
    },
    commentDes: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 12,
      borderColor: "#ccc",
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
    },
    commentinput: {
      flex: 1,
      borderRadius: 8,
      paddingHorizontal: 12,
      maxHeight: 120,
    },
    commentTxt: {
      margin: 5,
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
    },
    imgrow: {
      flexDirection: "row",
      alignItems: "center",
    },
  });
