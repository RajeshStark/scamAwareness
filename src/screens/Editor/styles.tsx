import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    paddingTop: 35,
    paddingHorizontal: 16,
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 22,
  },
  description: {
    fontSize: 14,
    color: "#333",
    marginBottom: 6,
  },
  subHeading: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#000",
  },
  subText: {
    fontSize: 8,
    color: "#000",
    marginBottom: 20,
  },
  inputCard: {
    marginTop: 40,
    backgroundColor: "#fdfdfd",
    borderRadius: 12,
    borderColor: "#eee",
    borderWidth: 1,
    padding: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  textInput: {
    height: 100,
    textAlignVertical: "top",
  },
  inputActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  icon: {
    color: "#555",
  },
  postBtn: {
    backgroundColor: "#a22184",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 20,
  },
  postBtnText: {
    color: "#fff",
    fontWeight: "bold",
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginVertical: 20,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    backgroundColor: "#d88b15",
    flex: 0.48,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    elevation: 2,
  },
  actionText: {
    color: "#fff",
    fontWeight: "bold",
  },
  raiseBtn: {
    marginTop: 20,
    paddingVertical: 14,
    alignItems: "center",
  },
  raiseText: {
    color: "#1b3b6f",
    fontWeight: "bold",
  },
  raiseSubText: {
    fontSize: 10,
    color: "#555",
    marginTop: 4,
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
  handle: {
    fontSize: 12,
    color: "#666",
  },
});
