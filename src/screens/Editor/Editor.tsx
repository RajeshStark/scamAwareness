import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import CustomButton from "../../components/Button/CustomButton";
import { width } from "../../utils/Dimensions";
import { Image } from "react-native";
import CustomHeader from "../../components/Input/Header/Header";

export default function EditorScreen() {
  const [text, setText] = useState("");

  return (
    <ScrollView style={styles.container}>
      <CustomHeader canGoback />
      <View style={styles.inputCard}>
        <View>
          <View style={styles.header}>
            <Image
              source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
              style={styles.avatar}
            />

            <View>
              <Text style={styles.username}>{"username"}</Text>
              <Text style={styles.handle}>@{"handle"}</Text>
            </View>
          </View>
        </View>

        <TextInput
          multiline
          placeholder="What’s Happening?"
          value={text}
          onChangeText={setText}
          style={styles.textInput}
        />
        <View style={styles.inputActions}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Ionicons name="image-outline" size={20} style={styles.icon} />
            <MaterialCommunityIcons
              name="file-gif-box"
              size={20}
              style={styles.icon}
            />
            <Ionicons name="happy-outline" size={20} style={styles.icon} />
          </View>
          <TouchableOpacity style={styles.postBtn}>
            <Text style={styles.postBtnText}>Post</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
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
    marginTop: 30,
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
    marginRight: 12,
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
