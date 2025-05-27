import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import CustomButton from "../../../components/Button/CustomButton";
import { width } from "../../../utils/Dimensions";
import { useAppSelector } from "../../../hooks/useAppselector";
import CustomHeader from "../../../components/Input/Header/Header";

export default function EditProfileScreen() {
  const usserInfo = useAppSelector((state) => state?.login?.usserInfo);
  const [secure, setSecure] = useState(true);
  const toggleSecure = () => setSecure(!secure);

  // Editable state fields
  const [firstName, setFirstName] = useState(usserInfo?.firstName || "");
  const [lastName, setLastName] = useState(usserInfo?.lastName || "");
  const [email, setEmail] = useState(usserInfo?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(usserInfo?.phoneNumber || "");
  const [password, setPassword] = useState(""); // not returned, optional

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingTop: 20 }}>
        <CustomHeader
          canGoback
          style={{
            backgroundColor: "#eee",
            width: "100%",
            padding: 10,
          }}
          right={
            <TouchableOpacity style={styles.changeCoverBtn}>
              <Text style={styles.changeCoverText}>Change Cover</Text>
              <Ionicons name="pencil" size={14} color="#333" />
            </TouchableOpacity>
          }
        />
      </View>
      <View style={styles.coverWrapper}>
        <View style={styles.profilePicWrapper}>
          <Image
            source={{
              uri: usserInfo?.profilePicture,
            }}
            style={styles.profilePic}
          />
        </View>
      </View>

      <Text style={styles.changePhotoText}>Change Profile Photo</Text>

      <View style={styles.form}>
        <View style={styles.row}>
          <View style={styles.inputBox}>
            <Ionicons name="person-outline" size={16} style={styles.icon} />
            <TextInput
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
              style={styles.input}
            />
          </View>
          <View style={styles.inputBox}>
            <Ionicons name="person-outline" size={16} style={styles.icon} />
            <TextInput
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
              style={styles.input}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.inputBox}>
            <Feather name="lock" size={16} style={styles.icon} />
            <TextInput
              placeholder="Password"
              style={styles.input}
              secureTextEntry={secure}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={toggleSecure}>
              <Ionicons
                name={secure ? "eye-off-outline" : "eye-outline"}
                size={16}
                color="#555"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.inputBox}>
            <Ionicons name="mail-outline" size={16} style={styles.icon} />
            <TextInput
              placeholder="Email Id"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.inputBox}>
            <Ionicons name="call-outline" size={16} style={styles.icon} />
            <TextInput
              placeholder="Phone Number"
              keyboardType="phone-pad"
              style={styles.input}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>
        </View>

        <View style={styles.otpRow}>
          <TextInput placeholder="Enter OTP Here" style={[{ flex: 1 }]} />
          <CustomButton
            title="Submit"
            onPress={() => {}}
            isLinear
            width={width * 0.3}
            nomargin
            borderRadius={7}
          />
        </View>

        <Text style={styles.otpHint}>Send OTP via email</Text>

        <View style={{ marginTop: 20 }}>
          <CustomButton
            title="CONFIRM"
            onPress={() => {
              // handle update logic here
              console.log({
                firstName,
                lastName,
                email,
                phoneNumber,
                password,
              });
            }}
            isLinear
          />
          <Text style={styles.confirmHint}>confirm to update changes</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  coverWrapper: {
    position: "relative",
    height: 160,
    backgroundColor: "#eee",
  },
  coverImage: {
    width: "100%",
    height: "100%",
  },
  changeCoverBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#eee",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  changeCoverText: {
    fontSize: 12,
    color: "#333",
    marginLeft: 4,
  },
  profilePicWrapper: {
    position: "absolute",
    bottom: -40,
    left: "50%",
    transform: [{ translateX: -40 }],
    borderWidth: 3,
    borderColor: "#fff",
    borderRadius: 50,
    overflow: "hidden",
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  changePhotoText: {
    marginTop: 50,
    textAlign: "center",
    color: "#6e008b",
    fontWeight: "500",
  },
  form: {
    padding: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#6e008b",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    flex: 1,
    marginHorizontal: 4,
    height: 44,
  },
  icon: {
    marginRight: 6,
    color: "#6e008b",
  },
  input: {
    flex: 1,
    fontSize: 14,
  },
  otpRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 4,
    borderColor: "#6e008b",
    borderWidth: 1,
    borderRadius: 8,
  },
  otpBtn: {
    backgroundColor: "#d88d2c",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginLeft: 8,
  },
  otpBtnText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",
  },
  otpHint: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
    marginLeft: 4,
  },
  confirmBtn: {
    backgroundColor: "#d88d2c",
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  confirmText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  confirmHint: {
    textAlign: "center",
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    backgroundColor: "#6e008b",
  },
});
