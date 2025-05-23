import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  PermissionsAndroid,
  Platform,
  Linking,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import CustomButton from "../../components/Button/CustomButton";
import CustomHeader from "../../components/Input/Header/Header";
import { styles } from "./styles";
import { PostService } from "../../services/post.service";
import { showToast } from "../../components/Toast";
import { useUploadMedia } from "../../services/hooks/usePost";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import Video from "react-native-video";
import Typography from "../../components/Typography/Typography";
import MediaView from "./MediaView/MediaView";

export default function EditorScreen({ navigation }) {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [localFiles, setLocalFiles] = useState([]);
  const [media, setMedia] = useState([]);

  const { mutate: uploadMedia, isLoading: uploading } = useUploadMedia();

  const checkAndRequestPermissions = async () => {
    if (Platform.OS !== "android") return true;

    try {
      const permissions = [
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ];

      // Handle Android 13+ storage permissions
      const sdkInt =
        Platform.constants?.Release || parseInt(Platform.Version, 10);
      if (sdkInt >= 33) {
        permissions.push(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO
        );
      } else {
        permissions.push(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
      }

      const statuses = await PermissionsAndroid.requestMultiple(permissions);
      const allGranted = Object.values(statuses).every(
        (status) => status === PermissionsAndroid.RESULTS.GRANTED
      );

      // if (!allGranted) {
      //   const permanentlyDenied = Object.values(statuses).some(
      //     (status) => status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
      //   );

      //   if (permanentlyDenied) {
      //     Alert.alert(
      //       "Permissions Required",
      //       "You have permanently denied some permissions. Please enable them from app settings.",
      //       [
      //         {
      //           text: "Cancel",
      //           style: "cancel",
      //         },
      //         {
      //           text: "Open Settings",
      //           onPress: () => Linking.openSettings(),
      //         },
      //       ]
      //     );
      //   } else {
      //     showToast(
      //       "custom",
      //       "Please grant all required permissions."
      //     );
      //   }

      //   return false;
      // }

      return true;
    } catch (err) {
      console.warn("Permission error:", err);
      return false;
    }
  };

  useEffect(() => {
    checkAndRequestPermissions();
  }, []);

  const transformResponse = (res: any) => {
    const raw = res?.data?.output?.imageUrl1;
    if (!raw?.image?.length) return [];
    return raw.image.map((url: string) => ({
      type: raw.type,
      image: url,
    }));
  };

  const handlePick = () => {
    launchImageLibrary({ mediaType: "mixed", selectionLimit: 5 }, (res) => {
      if (res.didCancel || !res.assets) return;

      const files = res.assets.map((asset) => ({
        uri: asset.uri,
        name: asset.fileName,
        type: asset.type,
      }));

      uploadMedia(files, {
        onSuccess: (res) => {
          const transformed = transformResponse(res);
          setMedia((prev) => [...prev, ...transformed]);
        },
        onError: () => {
          showToast("custom", "Upload failed");
        },
      });
    });
  };

  const handleCamera = () => {
    launchCamera({ mediaType: "photo" }, (res) => {
      if (res.didCancel || !res.assets?.length) return;

      const asset = res.assets[0];
      const file = {
        uri: asset.uri,
        name: asset.fileName,
        type: asset.type,
      };

      uploadMedia([file], {
        onSuccess: (res) => {
          const transformed = transformResponse(res);
          setMedia((prev) => [...prev, ...transformed]);
        },
        onError: () => {
          showToast("custom", "Upload failed");
        },
      });
    });
  };

  const handleVideoRecord = () => {
    launchCamera({ mediaType: "video" }, (res) => {
      if (res.didCancel || !res.assets?.length) return;

      const asset = res.assets[0];
      const file = {
        uri: asset.uri,
        name: asset.fileName,
        type: asset.type,
      };

      uploadMedia([file], {
        onSuccess: (res) => {
          const transformed = transformResponse(res);
          setMedia((prev) => [...prev, ...transformed]);
        },
        onError: () => {
          showToast("custom", "Upload failed");
        },
      });
    });
  };

  const handleRemove = (indexToRemove) => {
    setMedia((prev) => prev.filter((_, i) => i !== indexToRemove));
    setLocalFiles((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  const handlePost = () => {
    const body = {
      name: "Post title",
      description: text,
      media,
    };
    console.log("Post body ====> ", body);
    PostService.create(body)
      .then(() => {
        showToast("custom", "Post created!");
        setText("");
        setTitle("");
        setMedia([]);
        setLocalFiles([]);
        navigation.goBack();
      })
      .catch(() => showToast("custom", "Post failed"));
  };

  return (
    <ScrollView style={styles.container}>
      <CustomHeader canGoback />
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

        {/* <View style={styles.inputCard}></View> */}

        <View style={styles.inputCard}>
          <TextInput
            placeholder="Write subject...."
            value={title}
            onChangeText={setTitle}
          />
          <View style={{ height: 1, width: "100%", backgroundColor: "grey" }} />
          <TextInput
            placeholder="Whats happening..."
            value={text}
            onChangeText={setText}
            style={styles.textInput}
          />

          <View style={styles.inputActions}>
            <View style={{ flexDirection: "row", gap: 16 }}>
              <Pressable onPress={handlePick}>
                <Ionicons name="image-outline" size={24} style={styles.icon} />
              </Pressable>
              <Pressable onPress={handleCamera}>
                <Ionicons name="camera-outline" size={24} style={styles.icon} />
              </Pressable>
              <Pressable onPress={handleVideoRecord}>
                <Ionicons
                  name="videocam-outline"
                  size={24}
                  style={styles.icon}
                />
              </Pressable>
            </View>
            <TouchableOpacity style={styles.postBtn} onPress={handlePost}>
              <Text style={styles.postBtnText}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <MediaView media={media} handleRemove={handleRemove} />
    </ScrollView>
  );
}
