import { StatusBar, StyleSheet } from "react-native";
import { width } from "../../utils/Dimensions";
import Fonts from "../../utils/Fonts";

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    flex: { flex: 1, marginTop: StatusBar.currentHeight },
    container: {
      flex: 1,
      paddingTop: 10,
      marginTop: 30,
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.white,
      borderRadius: 40,
      paddingHorizontal: 15,
      paddingVertical: 5,
      marginBottom: 12,
      marginHorizontal: 12,
      marginTop: 30,
    },
    input: {
      marginLeft: 8,
      flex: 1,
      fontSize: 16,
    },
    recentContainer: {
      marginBottom: 20,
      backgroundColor: theme.cardBg,
      width: width,
      padding: 12,
    },
    recentHeader: {
      color: theme.postIcons,
      fontWeight: "bold",
      marginTop: 8,
      marginBottom: 20,
    },
    recentItem: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 12,
      gap: 8,
    },
    recentText: {
      flex: 1,
      fontSize: 16,
      color: theme.txtblack,
      fontFamily: Fonts.Medium,
    },
    recommendedText: {
      fontSize: 12,
      color: theme.white,
      marginVertical: 12,
      fontFamily: Fonts.Medium,
    },
    gridContainer: {
      gap: 6,
    },
    imageTile: {
      width: width * 0.28,
      aspectRatio: 1,
      margin: 3,
      borderRadius: 8,
    },
    mediaWrapper: {
      margin: 4,
    },
    // imageTile: {
    //   width: width / 3.3,
    //   height: width / 3.3,
    //   borderRadius: 8,
    // },
    videoWrapper: {
      position: "relative",
    },
    videoIcon: {
      position: "absolute",
      zIndex: 1,
      top: "40%",
      left: "40%",
      width: 24,
      height: 24,
      tintColor: "white",
    },
    loadingText: {
      textAlign: "center",
      padding: 20,
      color: theme.postIcons,
    },
    emptyText: {
      textAlign: "center",
      padding: 20,
      color: theme.postIcons,
    },
  });
