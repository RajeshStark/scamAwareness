import { StyleSheet } from "react-native";
import { height, width } from "../../../utils/Dimensions";
import Fonts from "../../../utils/Fonts";

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    headerBackground: {
      height: 160,
      justifyContent: "flex-end",
      padding: 16,
    },
    settingsIcon: {
      position: "absolute",
      top: 40,
      right: 16,
      backgroundColor: "#183878",
      borderRadius: 50,
      padding: 6,
    },
    profileImageWrapper: {
      position: "absolute",
      bottom: -40,
      left: 16,
      borderRadius: 50,
      borderWidth: 3,
      borderColor: "#6e008b",
    },
    profileImage: {
      width: 80,
      height: 80,
      borderRadius: 40,
    },
    editButton: {
      position: "absolute",
      bottom: -30,
      right: 16,
      backgroundColor: "#6e008b",
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 12,
      flexDirection: "row",
      alignItems: "center",
    },
    editText: {
      color: "#fff",
      fontSize: 12,
      marginRight: 4,
    },
    infoSection: {
      marginTop: 50,
      padding: 16,
    },
    name: {
      fontWeight: "bold",
      fontSize: 18,
    },
    bio: {
      color: theme.txtblack,
      marginVertical: 4,
      fontFamily: Fonts.Medium,
    },
    stats: {
      flexDirection: "row",
      gap: 10,
      marginVertical: 6,
    },
    statText: {
      color: theme.txtblack,
      marginVertical: 4,
      fontFamily: Fonts.Medium,
      fontSize: 12,
    },
    tabs: {
      flexDirection: "row",
      marginTop: 12,
      borderBottomWidth: 1,
      borderColor: "#ddd",
    },
    tabItem: {
      paddingVertical: 8,
      paddingHorizontal: 12,
      fontSize: 14,
      color: theme.txtblack,
    },
    activeTab: {
      color: theme.txtblack,
      borderBottomWidth: 2,
      borderColor: "#eb9e3c",
    },
    postCard: {
      padding: 16,
      borderBottomWidth: 1,
      borderColor: "#eee",
    },
    postHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 8,
    },
    avatar: {
      width: 36,
      height: 36,
      borderRadius: 18,
      marginRight: 8,
    },
    username: {
      fontWeight: "bold",
      fontSize: 14,
    },
    handle: {
      fontSize: 12,
      color: "#666",
    },
    moreIcon: {
      marginLeft: "auto",
      color: "#999",
    },
    postText: {
      fontSize: 13,
      marginVertical: 6,
    },
    postImage: {
      width: "100%",
      height: 180,
      borderRadius: 8,
      marginBottom: 8,
    },
    engagement: {
      flexDirection: "row",
      gap: 6,
      alignItems: "center",
    },
    iconSpacing: {
      marginLeft: 12,
    },
    fab: {
      position: "absolute",
      bottom: 80,
      right: 20,
      backgroundColor: "#6e008b",
      width: 48,
      height: 48,
      borderRadius: 24,
      justifyContent: "center",
      alignItems: "center",
      elevation: 5,
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
