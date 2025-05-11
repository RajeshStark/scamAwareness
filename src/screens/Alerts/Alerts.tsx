import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function EmergencyScreen() {
  const [text, setText] = useState("");

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="black" />
        <Text style={styles.title}>Emergency</Text>
      </View>

      {/* Description */}
      <Text style={styles.description}>
        Report emergencies instantly. Fast, secure, & trackable
      </Text>
      <Text style={styles.subHeading}>YOUR SAFETY MATTERS</Text>
      <Text style={styles.subText}>
        Submit your complaint now, & we’ll take action immediately!
      </Text>

      {/* Text input */}
      <View style={styles.inputCard}>
        <TextInput
          multiline
          placeholder="What’s Happening?"
          value={text}
          onChangeText={setText}
          style={styles.textInput}
        />
        <View style={styles.inputActions}>
          <Ionicons name="image-outline" size={20} style={styles.icon} />
          <Ionicons name="logo-github" size={20} style={styles.icon} />
          <Ionicons name="happy-outline" size={20} style={styles.icon} />
          <TouchableOpacity style={styles.postBtn}>
            <Text style={styles.postBtnText}>Post</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.line} />

      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>CALL</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>MESSAGE</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.line} />

      <TouchableOpacity style={styles.raiseBtn}>
        <Text style={styles.raiseText}>+ RAISE A COMPLAINT</Text>
        <Text style={styles.raiseSubText}>
          Redirects to the govt complaint website
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
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
    fontSize: 13,
    color: "#666",
    marginBottom: 20,
  },
  inputCard: {
    backgroundColor: "#fdfdfd",
    borderRadius: 12,
    borderColor: "#eee",
    borderWidth: 1,
    padding: 12,
    marginBottom: 20,
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
    borderRadius: 6,
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
    borderWidth: 1,
    borderColor: "#777",
    borderRadius: 8,
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
});
