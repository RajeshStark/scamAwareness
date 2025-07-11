import { StyleSheet } from "react-native";
import Fonts from "../../utils/Fonts";
import { height, width } from "../../utils/Dimensions";

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    card: {
      margin: 10,
      padding: 12,
      backgroundColor: theme.cardBg,
      borderRadius: 12,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 10,
    },
    username: {
      fontWeight: "bold",
      fontSize: 14,
    },
    contentContainer: {
      marginTop: -10,
    },
    caption: {
      fontSize: 14,
      marginBottom: 8,
    },
    title: {
      fontSize: 18,
      fontFamily: Fonts.Bold,
    },
    media: {
      width: width - 95,
      borderRadius: 30,
    },
    overlayButtons: {
      position: "absolute",
      top: "40%",
      left: "40%",
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.3)",
      borderRadius: 20,
      padding: 10,
    },
    footer: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingTop: 15,
      width: width - 95,
      alignSelf: "flex-end",
    },
    iconRow: {
      flexDirection: "row",
      alignItems: "center",
    },
    iconText: {
      marginLeft: 4,
      color: theme.postIcons,
      fontSize: 13,
    },
    mediaWrapper: {
      marginRight: 10,
    },
    pagination: {
      flexDirection: "row",
      backgroundColor: "white",
      width: 30,
      marginRight: -8,
      padding: 2,
      position: "absolute",
      right: 5,
      borderBottomLeftRadius: 3,
    },

    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginHorizontal: 3,
    },
    expandIcon: {
      position: "absolute",
      top: 8,
      right: 8,
      backgroundColor: "rgba(0,0,0,0.5)",
      borderRadius: 16,
      padding: 4,
      zIndex: 5,
    },
    modalContainer: {
      width: width,
      height: height,
      backgroundColor: "rgba(0,0,0,1)",
      justifyContent: "center",
      alignItems: "center",
    },

    modalBackdrop: {
      ...StyleSheet.absoluteFillObject,
    },

    modalContent: {
      width: width,
      aspectRatio: 9 / 16,
      backgroundColor: "#000",
      borderRadius: 16,
      overflow: "hidden",
      justifyContent: "center",
      alignItems: "center",
    },

    modalCloseIcon: {
      position: "absolute",
      top: 10,
      right: 10,
      zIndex: 5,
      backgroundColor: "rgba(0,0,0,0.5)",
      padding: 6,
      borderRadius: 20,
    },
    audioContainer: {
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "center",
      backgroundColor: "#128C7E",
      padding: 10,
      borderRadius: 20,
      marginHorizontal: 5,
      width: width - 100,
      height: 50,
      marginTop: 10,
    },

    audioPlayIcon: {
      marginRight: 10,
    },

    audioWaveform: {
      flexDirection: "row",
      flex: 1,
      justifyContent: "space-between",
      alignItems: "center",
    },

    audioLine: {
      width: 2,
      height: Math.random() * 15 + 5,
      backgroundColor: "#fff",
      borderRadius: 1,
      marginHorizontal: 1,
    },

    audioDuration: {
      color: "#fff",
      fontSize: 12,
      marginLeft: 10,
    },
  });
