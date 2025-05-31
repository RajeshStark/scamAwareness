import { FlatList, Dimensions, Pressable, Image, View } from "react-native";
import React, { useState } from "react";
import Video from "react-native-video";
import Ionicons from "react-native-vector-icons/Ionicons";

const screenWidth = Dimensions.get("window").width;
const itemSize = (screenWidth - 80) / 3;

export default function MediaView({ media, handleRemove }) {
  const [playingIndex, setPlayingIndex] = useState(null); // null = none playing
  console.log({ media });

  const togglePlayback = (index) => {
    setPlayingIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <View>
      <FlatList
        data={media}
        numColumns={3}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 10 }}
        renderItem={({ item, index }) => {
          const isVideo = item.image?.includes("mp4");
          const isPlaying = playingIndex === index;

          return (
            <View
              style={{
                width: itemSize,
                height: itemSize,
                margin: 5,
                position: "relative",
              }}
            >
              {isVideo ? (
                <View
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 10,
                    overflow: "hidden",
                  }}
                >
                  <Video
                    source={{ uri: item.url }}
                    style={{ width: "100%", height: "100%" }}
                    paused={!isPlaying}
                    muted
                    repeat
                    resizeMode="cover"
                  />
                  <Pressable
                    onPress={() => togglePlayback(index)}
                    style={{
                      position: "absolute",
                      top: "30%",
                      left: "30%",
                      backgroundColor: "rgba(0,0,0,0.4)",
                      borderRadius: 20,
                      padding: 10,
                    }}
                  >
                    <Ionicons
                      name={isPlaying ? "pause" : "play"}
                      size={20}
                      color="#fff"
                    />
                  </Pressable>
                </View>
              ) : (
                <Image
                  source={{ uri: item.url }}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 10,
                  }}
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
                onPress={() => handleRemove(index)}
              >
                <Ionicons name="close" size={16} color="#fff" />
              </Pressable>
            </View>
          );
        }}
      />
    </View>
  );
}
