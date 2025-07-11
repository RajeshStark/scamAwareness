import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomButton from "../../../components/Button/CustomButton";
import CustomHeader from "../../../components/Input/Header/Header";
import { createStyles } from "./styles";
import { useQueryClient } from "@tanstack/react-query";
import {
  useGetProfile,
  useUpdateProfile,
} from "../../../services/hooks/useAuth";
import { launchImageLibrary } from "react-native-image-picker";
import { DEFAULT_AVATAR, transformResponse } from "../../../utils/Constants";
import { showToast } from "../../../components/Toast";
import { useUploadMedia } from "../../../services/hooks/usePost";
import useAppTheme from "../../../hooks/useAppTheme";
import { width } from "../../../utils/Dimensions";
import LineraBgContainer from "../../../components/Container/LineraBgContainer";

export default function EditProfileScreen({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [profilepic, setProfilePic] = useState("");
  const [coverPic, setCoverPic] = useState("");
  const { mutate: uploadMedia } = useUploadMedia();
  const queryClient = useQueryClient();
  const { data: userProfile } = useGetProfile();
  const updateMutation = useUpdateProfile();
  const { theme, isDark } = useAppTheme();
  const styles = createStyles(theme, isDark);

  useEffect(() => {
    if (userProfile) {
      setFirstName(userProfile.firstName || "");
      setLastName(userProfile.lastName || "");
      setPhoneNumber(userProfile.phoneNumber || "");
      setProfilePic(userProfile?.profilePicture || "");
      setCoverPic(userProfile?.coverPicture || "");
      setEmail(userProfile?.email);
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

  const renderContent = () => {
    return (
      <>
        {coverPic !== "" ? (
          <ImageBackground
            style={styles.coverWrapperimg}
            source={{ uri: coverPic }}
          >
            <CustomHeader
              canGoback
              color={theme?.white}
              style={{
                width: width,
                padding: 10,
                paddingTop: StatusBar.currentHeight,
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
            <Pressable style={styles.profilePicWrapper} onPress={handlePick}>
              <Image
                source={{
                  uri: profilepic !== "" ? profilepic : DEFAULT_AVATAR,
                }}
                style={styles.profilePic}
              />
              <Ionicons name="pencil" size={15} style={styles.pencil} />
            </Pressable>
          </ImageBackground>
        ) : (
          <View style={styles.coverWrapper}>
            <CustomHeader
              canGoback
              style={{
                width: width,
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
            <View style={[styles.inputBox, { borderColor: "grey" }]}>
              <Ionicons
                name="mail-outline"
                size={16}
                style={[styles.icon, { color: "grey" }]}
              />
              <TextInput
                placeholder="Email"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                editable={false}
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
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={theme.white}
        barStyle={isDark ? "light-content" : "dark-content"}
      />
      {isDark ? (
        <LineraBgContainer>{renderContent()}</LineraBgContainer>
      ) : (
        <>{renderContent()}</>
      )}
    </SafeAreaView>
  );
}
