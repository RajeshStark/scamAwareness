import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AudioRecorderPlayer from "react-native-audio-recorder-player";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import LineraBgContainer from "../../components/Container/LineraBgContainer";
import CustomHeader from "../../components/Input/Header/Header";
import { showToast } from "../../components/Toast";
import useAppTheme from "../../hooks/useAppTheme";
import { useGetProfile } from "../../services/hooks/useAuth";
import { useUploadMedia } from "../../services/hooks/usePost";
import { PostService } from "../../services/post.service";
import { DEFAULT_AVATAR, transformResponse } from "../../utils/Constants";
import { checkAndRequestPermissions } from "./Constants";
import MediaView from "./MediaView/MediaView";
import { styles } from "./styles";

export default function EditorScreen({ navigation }) {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [media, setMedia] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const audioRecorderPlayer = new AudioRecorderPlayer();
  const { theme } = useAppTheme();
  const { data: userProfile, refetch: getprofile } = useGetProfile();

  const { mutate: uploadMedia } = useUploadMedia();

  useEffect(() => {
    checkAndRequestPermissions();
  }, []);

  useEffect(() => {
    return () => {
      audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
    };
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

  const [recordingUri, setRecordingUri] = useState<string | null>(null);

  const handleAudioRecord = async () => {
    try {
      if (isRecording) {
        const result = await audioRecorderPlayer.stopRecorder();
        audioRecorderPlayer.removeRecordBackListener();
        setIsRecording(false);
        setRecordingUri(result);
        console.log("Recording saved at:", result);

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
          onError: (err) => {
            console.log("AUDIO UPLOAD ERROR", err);
            showToast("custom", "Audio upload failed");
          },
        });

        setRecordingUri(null);
      } else {
        const uri = await audioRecorderPlayer.startRecorder();
        setIsRecording(true);
        console.log("Recording started at:", uri);

        audioRecorderPlayer.addRecordBackListener((e) => {
          return;
        });
      }
    } catch (err) {
      console.error("Audio record error:", err);
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

      uploadMedia([file], {
        onSuccess: (res) => {
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
    <LineraBgContainer>
      <ScrollView style={styles.container}>
        <CustomHeader canGoback />
        <View>
          <View style={styles.header}>
            <Image
              source={{
                uri:
                  userProfile?.profilePicture.length !== 0
                    ? userProfile?.profilePicture
                    : DEFAULT_AVATAR,
              }}
              style={styles.avatar}
            />
            <View>
              {userProfile?.firstName.length !== 0 ? (
                <Text style={styles.username}>
                  {userProfile?.firstName} {userProfile?.lastName}
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
            <View
              style={{ height: 1, width: "100%", backgroundColor: "grey" }}
            />
            <TextInput
              placeholder="Whats happening..."
              value={text}
              onChangeText={setText}
              style={styles.textInput}
            />

            <View style={styles.inputActions}>
              <View style={{ flexDirection: "row", gap: 16 }}>
                <Pressable onPress={handlePick}>
                  <Ionicons
                    name="image-outline"
                    size={24}
                    style={styles.icon}
                  />
                </Pressable>
                <Pressable onPress={handleCamera}>
                  <Ionicons
                    name="camera-outline"
                    size={24}
                    style={styles.icon}
                  />
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
                    name={isRecording ? "stop-circle-outline" : "mic-outline"}
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
    </LineraBgContainer>
  );
}
