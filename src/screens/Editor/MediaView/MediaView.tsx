import {
  FlatList,
  Dimensions,
  Pressable,
  Image,
  View,
  Text,
  DeviceEventEmitter,
} from "react-native";
import React, { useEffect, useState } from "react";
import Video from "react-native-video";
import Ionicons from "react-native-vector-icons/Ionicons";
import SoundPlayer from "react-native-sound-player";

const screenWidth = Dimensions.get("window").width;
const itemSize = (screenWidth - 80) / 3;

export default function MediaView({ media, handleRemove }) {
  const [playingIndex, setPlayingIndex] = useState(null);

  useEffect(() => {
    const finishedListener = DeviceEventEmitter.addListener(
      "FinishedPlaying",
      () => {
        setPlayingIndex(null);
      }
    );

    return () => {
      finishedListener.remove();
      SoundPlayer.stop();
    };
  }, []);

  const toggleAudioPlayback = (url, index) => {
    if (playingIndex === index) {
      SoundPlayer.stop();
      setPlayingIndex(null);
    } else {
      try {
        SoundPlayer.playUrl(url);
        setPlayingIndex(index);
      } catch (error) {
        console.log("Error playing sound:", error);
      }
    }
  };

  const renderMediaItem = ({ item, index }) => {
    const isVideo = item.url?.includes("mp4");
    const isAudio = item.type === "audio" || item.url?.includes(".m4a");
    const isPlaying = playingIndex === index;

    return (
      <View
        style={{
          width: itemSize,
          height: itemSize,
          margin: 5,
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: isAudio ? "#f0f0f0" : "transparent",
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        {isVideo ? (
          <View style={{ width: "100%", height: "100%" }}>
            <Video
              source={{ uri: item.url }}
              style={{ width: "100%", height: "100%" }}
              paused={!isPlaying}
              muted
              repeat
              resizeMode="cover"
            />
            <PlayPauseButton
              onPress={() =>
                setPlayingIndex((prev) => (prev === index ? null : index))
              }
              isPlaying={isPlaying}
            />
          </View>
        ) : isAudio ? (
          <>
            <Ionicons name="musical-notes" size={30} color="#333" />
            <Text
              numberOfLines={1}
              style={{
                fontSize: 10,
                color: "#333",
                paddingHorizontal: 4,
                textAlign: "center",
              }}
            >
              {item.url?.split("/").pop()}
            </Text>
            <PlayPauseButton
              onPress={() => toggleAudioPlayback(item.url, index)}
              isPlaying={isPlaying}
            />
          </>
        ) : (
          <Image
            source={{ uri: item?.url }}
            style={{ width: "100%", height: "100%", borderRadius: 10 }}
          />
        )}

        <Pressable
          style={{
            position: "absolute",
            top: 4,
            right: 4,
            backgroundColor: "rgba(0,0,0,0.6)",
            borderRadius: 12,
            padding: 2,
            zIndex: 1,
          }}
          onPress={() => {
            if (playingIndex === index) {
              SoundPlayer.stop();
              setPlayingIndex(null);
            }
            handleRemove(index);
          }}
        >
          <Ionicons name="close" size={16} color="#fff" />
        </Pressable>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={media}
        numColumns={3}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 10 }}
        renderItem={renderMediaItem}
      />
    </View>
  );
}

const PlayPauseButton = ({ onPress, isPlaying }) => (
  <Pressable
    onPress={onPress}
    style={{
      position: "absolute",
      top: "30%",
      left: "30%",
      backgroundColor: "rgba(0,0,0,0.4)",
      borderRadius: 20,
      padding: 10,
    }}
  >
    <Ionicons name={isPlaying ? "pause" : "play"} size={20} color="#fff" />
  </Pressable>
);
