import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  Pressable,
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
import { launchImageLibrary } from "react-native-image-picker";
import { DEFAULT_AVATAR, transformResponse } from "../../../utils/Constants";
import { showToast } from "../../../components/Toast";
import { useUploadMedia } from "../../../services/hooks/usePost";

export default function EditProfileScreen({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profilepic, setProfilePic] = useState("");
  const [coverPic, setCoverPic] = useState("");
  const { mutate: uploadMedia } = useUploadMedia();
  const queryClient = useQueryClient();
  const { data: userProfile } = useGetProfile();
  const updateMutation = useUpdateProfile();

  useEffect(() => {
    if (userProfile) {
      setFirstName(userProfile.firstName || "");
      setLastName(userProfile.lastName || "");
      setPhoneNumber(userProfile.phoneNumber || "");
      setProfilePic(userProfile?.profilePicture || "");
      setCoverPic(userProfile?.coverPicture || "");
    }
  }, [userProfile]);

  const handleUpdate = () => {
    updateMutation.mutate(
      {
        id: userProfile?._id,
        firstName,
        lastName,
        phoneNumber,
        coverPicture: coverPic,
        profilePicture: profilepic,
      },
      {
        onSuccess: (res) => {
          queryClient.invalidateQueries(["profile"]);
          navigation.goBack();
        },
        onError: (err) => {
          console.error("Update failed", err);
        },
      }
    );
  };

  const handlePick = (type = "pic") => {
    launchImageLibrary({ mediaType: "photo", selectionLimit: 1 }, (res) => {
      if (res.didCancel || !res.assets) return;

      const files = res.assets.map((asset) => ({
        uri: asset.uri,
        name: asset.fileName,
        type: asset.type,
      }));

      uploadMedia(files, {
        onSuccess: (res) => {
          const transformed = transformResponse(res);
          if (type === "cover") {
            setCoverPic(transformed[0]?.url);
          } else {
            setProfilePic(transformed[0]?.url);
          }
        },
        onError: () => {
          showToast("custom", "Upload failed");
        },
      });
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingTop: 20 }}>
        <CustomHeader
          canGoback
          style={{
            backgroundColor: `rgba(0,0,0,0.4)`,
            width: "100%",
            padding: 10,
          }}
          right={
            <TouchableOpacity
              style={styles.changeCoverBtn}
              onPress={() => handlePick("cover")}
            >
              <Text style={styles.changeCoverText}>Change Cover</Text>
              <Ionicons name="pencil" size={14} color="#333" />
            </TouchableOpacity>
          }
        />
      </View>
      {coverPic !== "" ? (
        <ImageBackground
          style={styles.coverWrapperimg}
          source={{ uri: coverPic }}
        >
          <View style={styles.profilePicWrapper}>
            <Image
              source={{
                uri: profilepic !== "" ? profilepic : DEFAULT_AVATAR,
              }}
              style={styles.profilePic}
            />
          </View>
        </ImageBackground>
      ) : (
        <View style={styles.coverWrapper}>
          <Pressable style={styles.profilePicWrapper} onPress={handlePick}>
            <Image
              source={{
                uri: profilepic !== "" ? profilepic : DEFAULT_AVATAR,
              }}
              style={styles.profilePic}
            />
            <Ionicons name="pencil" size={15} style={styles.pencil} />
          </Pressable>
        </View>
      )}

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
