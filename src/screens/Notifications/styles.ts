import { StatusBar, StyleSheet } from "react-native";

export const createStyles = (theme: Theme, isDark: boolean) =>
  StyleSheet.create({
    container: {
      backgroundColor: "#fff",
      flex: 1,
      marginTop: StatusBar.currentHeight,
    },
    content: {
      paddingTop: 20,
      flex: 1,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
      gap: 10,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: theme.white,
    },
    sectionHeader: {
      fontWeight: "bold",
      fontSize: 16,
      marginVertical: 12,
    },
    card: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 14,
    },
    avatarContainer: {
      position: "relative",
    },
    avatar: {
      width: 44,
      height: 44,
      borderRadius: 22,
    },
    badge: {
      position: "absolute",
      top: -6,
      left: -6,
      backgroundColor: "#f28b02",
      borderRadius: 10,
      paddingHorizontal: 6,
      paddingVertical: 2,
    },
    badgeText: {
      fontSize: 10,
      color: "#fff",
      fontWeight: "bold",
    },
    textContainer: {
      flex: 1,
      marginLeft: 10,
    },
    title: {
      fontWeight: "bold",
      color: "#0E3173",
    },
    desc: {
      fontSize: 12,
      color: "#0E3173",
    },
    thumbnail: {
      width: 44,
      height: 44,
      borderRadius: 6,
    },
    divider: {
      borderBottomColor: "#ccc",
      borderBottomWidth: 1,
      marginVertical: 10,
    },
    showMore: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginVertical: 20,
    },
    showMoreText: {
      color: "#1b3b6f",
      fontWeight: "bold",
    },
  });
