import React, { useEffect, useState } from "react";
import {
  Image,
  PermissionsAndroid,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomHeader from "../../components/Input/Header/Header";
import { showToast } from "../../components/Toast";
import { useAppSelector } from "../../hooks/useAppselector";
import useAppTheme from "../../hooks/useAppTheme";
import { useUploadMedia } from "../../services/hooks/usePost";
import { PostService } from "../../services/post.service";
import { transformResponse } from "../../utils/Constants";
import MediaView from "./MediaView/MediaView";
import { styles } from "./styles";
import { checkAndRequestPermissions } from "./Constants";
import AudioRecorderPlayer from "react-native-audio-recorder-player";

export default function EditorScreen({ navigation }) {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [media, setMedia] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const audioRecorderPlayer = new AudioRecorderPlayer();
  const { theme } = useAppTheme();
  const { usserInfo } = useAppSelector((state) => state.login);

  const { mutate: uploadMedia } = useUploadMedia();

  useEffect(() => {
    checkAndRequestPermissions();
  }, []);

  const handlePick = () => {
    launchImageLibrary({ mediaType: "mixed", selectionLimit: 3 }, (res) => {
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

  const handleAudioRecord = async () => {
    try {
      if (isRecording) {
        const result = await audioRecorderPlayer.stopRecorder();
        audioRecorderPlayer.removeRecordBackListener();
        setIsRecording(false);

        const file = {
          uri: result,
          name: `audio_${Date.now()}.mp4`,
          type: "audio/mp4",
        };

        uploadMedia([file], {
          onSuccess: (res) => {
            const transformed = transformResponse(res);
            setMedia((prev) => [...prev, ...transformed]);
          },
          onError: () => {
            showToast("custom", "Audio upload failed");
          },
        });
      } else {
        await audioRecorderPlayer.startRecorder();
        setIsRecording(true);
      }
    } catch (err) {
      showToast("custom", "Audio record failed");
    }
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
      console.log({ asset });
      console.log({ file });

      uploadMedia([file], {
        onSuccess: (res) => {
          console.log(res);
          const transformed = transformResponse(res);
          setMedia((prev) => [...prev, ...transformed]);
        },
        onError: (err) => {
          console.log(err);

          showToast("custom", "Upload failed");
        },
      });
    });
  };

  const handleRemove = (indexToRemove) => {
    setMedia((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  const handlePost = () => {
    const body = {
      name: "Post title",
      description: text,
      media,
    };

    PostService.create(body)
      .then(() => {
        showToast("custom", "Post created!");
        setText("");
        setTitle("");
        setMedia([]);
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
            source={{
              uri:
                usserInfo?.profilePicture.length !== 0
                  ? usserInfo?.profilePicture
                  : "https://randomuser.me/api/portraits/men/32.jpg",
            }}
            style={styles.avatar}
          />
          <View>
            {usserInfo?.firstName.length !== 0 ? (
              <Text style={styles.username}>
                {usserInfo?.firstName} {usserInfo?.lastName}
              </Text>
            ) : (
              <Text style={styles.username}>Unknown</Text>
            )}
          </View>
        </View>

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
              <Pressable onPress={handleAudioRecord}>
                <Ionicons
                  name={isRecording ? "stop-circle-outline" : "mic-outline"} // ⚠️ dynamic icon
                  size={24}
                  style={styles.icon}
                />
              </Pressable>
            </View>
            {text.length === 0 ? (
              <View style={[styles.postBtn, { backgroundColor: theme.grey }]}>
                <Text style={styles.postBtnText}>Post</Text>
              </View>
            ) : (
              <TouchableOpacity style={styles.postBtn} onPress={handlePost}>
                <Text style={styles.postBtnText}>Post</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
      <MediaView media={media} handleRemove={handleRemove} />
    </ScrollView>
  );
}
