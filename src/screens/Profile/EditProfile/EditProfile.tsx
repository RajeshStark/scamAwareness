import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomButton from "../../../components/Button/CustomButton";
import CustomHeader from "../../../components/Input/Header/Header";
import { useAppSelector } from "../../../hooks/useAppselector";
import { styles } from "./styles";
import { useQueryClient } from "@tanstack/react-query";
import {
  useGetProfile,
  useUpdateProfile,
} from "../../../services/hooks/useAuth";

export default function EditProfileScreen({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const queryClient = useQueryClient();
  const { data: userProfile } = useGetProfile();
  const updateMutation = useUpdateProfile();
  console.log(userProfile);

  useEffect(() => {
    if (userProfile) {
      setFirstName(userProfile.firstName || "");
      setLastName(userProfile.lastName || "");
      setPhoneNumber(userProfile.phoneNumber || "");
    }
  }, [userProfile]);

  const handleUpdate = () => {
    updateMutation.mutate(
      { firstName, lastName, phoneNumber },
      {
        onSuccess: (res) => {
          console.log("Updated:", res);
          queryClient.invalidateQueries(["profile"]);
          navigation.goBack();
        },
        onError: (err) => {
          console.error("Update failed", err);
        },
      }
    );
  };

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
              uri: userProfile?.profilePicture,
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

        <View style={{ marginTop: 20 }}>
          <CustomButton title="CONFIRM" onPress={handleUpdate} isLinear />
          <Text style={styles.confirmHint}>confirm to update changes</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
