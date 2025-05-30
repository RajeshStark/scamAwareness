import { StyleSheet } from "react-native";
import Fonts from "../../utils/Fonts";
import { width } from "../../utils/Dimensions";

export const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 12,
    backgroundColor: "#fff",
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
    marginTop: 5,
  },
  caption: {
    fontSize: 14,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    marginBottom: 8,
    fontFamily: Fonts.Bold,
  },
  media: {
    width: width - 30,
    height: 200,
    backgroundColor: "#000",
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
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconText: {
    marginLeft: 4,
    color: "#555",
    fontSize: 13,
  },
  mediaWrapper: {
    marginRight: 10,
  },
});
