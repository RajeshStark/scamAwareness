// PostContent.tsx
import React from "react";
import {
  View,
  Pressable,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import Typography from "../Typography/Typography";
import Ionicons from "react-native-vector-icons/Ionicons";
import Video from "react-native-video";
import AudioPostCard from "./AudioPostCard";
import { createStyles } from "./styles";
import useAppTheme from "../../hooks/useAppTheme";

const PostContent = ({
  name,
  description,
  media,
  state,
  handlers,
  navigation,
  _id,
  setExpandedVideo,
}) => {
  const { pausedVideos, mutedVideos, playingAudioIndex, currentMediaIndex } =
    state;

  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  const renderMedia = ({ item, index }) => {
    const isVideo = item.type.includes("video");
    const isAudio = item.type.includes("audio");
    const paused = pausedVideos[index] ?? true;
    const muted = mutedVideos[index] ?? true;
    const isPlaying = playingAudioIndex === index;

    const wrapper = {
      ...styles.media,
      borderRadius: 12,
      overflow: "hidden",
    };

    if (isVideo) {
      return (
        <TouchableOpacity
          onPress={() => handlers.togglePlayPause(index)}
          style={wrapper}
        >
          <View style={wrapper}>
            <Video
              source={{ uri: item.url }}
              style={StyleSheet.absoluteFill}
              resizeMode="cover"
              paused={paused}
              muted={muted}
              repeat
            />
            <View style={styles.overlayButtons}>
              <Ionicons
                name={paused ? "play" : "pause"}
                size={32}
                color="#fff"
                style={{ marginRight: 20 }}
              />
              <TouchableOpacity onPress={() => handlers.toggleMute(index)}>
                <Ionicons
                  name={muted ? "volume-mute" : "volume-high"}
                  size={28}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={styles.expandIcon}
            onPress={() => setExpandedVideo({ url: item.url, index })}
          >
            <Ionicons name="expand" size={24} color="#fff" />
          </TouchableOpacity>
        </TouchableOpacity>
      );
    } else if (isAudio) {
      return (
        // <TouchableOpacity
        //   style={styles.audioContainer}
        //   onPress={() => handlers.playOrPauseAudio(item.url, index)}
        // >
        //   <Ionicons
        //     name={isPlaying ? "pause" : "play"}
        //     size={24}
        //     color="#fff"
        //     style={styles.audioPlayIcon}
        //   />
        //   <View style={styles.audioWaveform}>
        //     <View style={styles.audioLine} />
        //     <View style={styles.audioLine} />
        //     <View style={styles.audioLine} />
        //     <View style={styles.audioLine} />
        //     <View style={styles.audioLine} />
        //   </View>
        //   <Typography style={styles.audioDuration}>0:30</Typography>
        // </TouchableOpacity>
        <AudioPostCard post={item} />
      );
    } else {
      return (
        <View style={wrapper}>
          <Image
            source={{ uri: item.url }}
            style={StyleSheet.absoluteFill}
            resizeMode="cover"
          />
        </View>
      );
    }
  };

  return (
    <View style={styles.contentContainer}>
      <Pressable
        onPress={() => navigation.navigate("PostDetailScreen", { postId: _id })}
      >
        <Typography style={styles.title}>{name}</Typography>
        <Typography style={styles.caption}>{description}</Typography>
      </Pressable>

      {media.length > 0 && (
        <View style={[styles.media, { alignSelf: "flex-end" }]}>
          <FlatList
            data={media}
            keyExtractor={(_, i) => i.toString()}
            horizontal
            pagingEnabled
            snapToAlignment="center"
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={({ viewableItems }) => {
              if (viewableItems.length > 0) {
                handlers.setCurrentMediaIndex(viewableItems[0].index ?? 0);
              }
            }}
            viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
            renderItem={renderMedia}
          />
          {media.length > 1 && (
            <View style={styles.pagination}>
              <Typography>
                {currentMediaIndex + 1}/{media.length}
              </Typography>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default PostContent;
