import { StyleSheet, Dimensions, Platform } from "react-native";
import Fonts from "../../utils/Fonts";

const { height, width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  verticalLine: {
    width: 12,
    height: "100%",
  },
  toastStyle: {
    width: width - 70,
    backgroundColor: "#171C1B",
    borderRadius: 10,
    padding: 10,
    borderColor: "#171C1B",
    shadowColor: "#171C1B",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 1, height: 2 },
    elevation: 4,
    flexDirection: "row",
    overflow: "hidden",
    marginTop: Platform.OS == "ios" ? 20 : 0,
  },
  toastIcon: { alignSelf: "center", marginLeft: 5 },
  successView: {
    marginLeft: 5,
    width: width * 0.9,
    justifyContent: "center",
    marginVertical: 10,
    alignItems: "flex-start",
  },
  errorView: {
    width: width * 0.9,
    justifyContent: "center",
    alignItems: "flex-start",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  infoView: {
    marginLeft: 10,
    width: width * 0.9,
    justifyContent: "center",
    alignItems: "flex-start",
    marginVertical: 10,
  },
  titleText: {
    fontFamily: Fonts.Bold,
    color: "#000",
    fontSize: 13,
  },
  messageText: {
    fontFamily: Fonts.Medium,
    fontSize: 11,
    color: "#000",
    marginTop: 5,
    width: width * 0.65,
  },
});
