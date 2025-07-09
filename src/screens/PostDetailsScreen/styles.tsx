import { StyleSheet } from "react-native";
import { height, width } from "../../utils/Dimensions";
import Fonts from "../../utils/Fonts";

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    safeAreview: { paddingTop: 30, flex: 1 },
    pt: { padding: 10 },
    mv: { marginVertical: 12 },
    commentstitle: { fontWeight: "bold", marginBottom: 8 },
    mb: { marginBottom: 8 },
    cUsertxt: {
      fontFamily: Fonts.Medium,
      marginLeft: 10,
      color: "#000",
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
      borderColor: theme.postIcons,
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
    },
    commentinput: {
      flex: 1,
      borderRadius: 8,
      paddingHorizontal: 12,
      maxHeight: 120,
      color: theme.black,
    },
    commentTxt: {
      margin: 5,
      color: "#000",
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
    replyContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 8,
      paddingHorizontal: 10,
      backgroundColor: "#f5f5f5",
      borderRadius: 8,
    },
    replyInput: {
      flex: 1,
      minHeight: 40,
      paddingHorizontal: 10,
      paddingVertical: 8,
    },
    sendReplyIcon: {
      marginLeft: 8,
    },
    replyIcon: {
      marginTop: 4,
      alignSelf: "flex-end",
      color: theme.postIcons,
    },
    loadMoreText: {
      fontSize: 16,
      color: theme.black,
    },
    replyIconContainer: {
      flexDirection: "row",
      marginLeft: 10,
      marginTop: -5,
    },

    repliesWrapper: {
      marginTop: 10,
      paddingLeft: 20,
      borderLeftWidth: 1,
      borderLeftColor: theme.postIcons,
      width: "90%",
      alignSelf: "flex-end",
    },
    replyItem: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 8,
    },
    replyAvatar: {
      width: 28,
      height: 28,
      borderRadius: 14,
      marginRight: 8,
    },
    replyTextWrapper: {
      flex: 1,
    },
    replyUserName: {
      fontWeight: "bold",
      fontSize: 14,
      flexDirection: "row",
      flexWrap: "wrap",
      color: theme.black,
    },
    replyToText: {
      fontWeight: "normal",
      color: theme.postIcons,
      fontSize: 13,
    },
    replyContent: {
      fontSize: 14,
      marginTop: 2,
      color: theme.black,
    },
  });
