import { StyleSheet } from "react-native";
import Fonts from "../../utils/Fonts";
import { height, width } from "../../utils/Dimensions";

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
    width: width - 80,
    height: 200,
    backgroundColor: "#000",
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
});
