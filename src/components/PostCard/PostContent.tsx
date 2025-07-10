import React, { useState } from "react";
import {
  View,
  Pressable,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import Typography from "../Typography/Typography";
import Ionicons from "react-native-vector-icons/Ionicons";
import Video from "react-native-video";
import AudioPostCard from "./AudioPostCard";
import { createStyles } from "./styles";
import useAppTheme from "../../hooks/useAppTheme";

const { width } = Dimensions.get("window");

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

  const [ratios, setRatios] = useState({}); // { [index]: aspectRatio }

  const mediaWidth = width - 95;
  const defaultAspectRatio = 1.2; // fallback if unknown

  const onVideoLoad = (index, naturalSize) => {
    const { height, width } = naturalSize;
    if (width && height) {
      const ratio = height / width;
      setRatios((prev) => ({ ...prev, [index]: ratio }));
    }
  };

  const onImageLoad = (index, w, h) => {
    if (w && h) {
      const ratio = h / w;
      setRatios((prev) => ({ ...prev, [index]: ratio }));
    }
  };

  const renderMedia = ({ item, index }) => {
    const isVideo = item.type.includes("video");
    const isAudio = item.type.includes("audio");
    const paused = pausedVideos[index] ?? true;
    const muted = mutedVideos[index] ?? true;
    const isPlaying = playingAudioIndex === index;

    const aspectRatio = ratios[index] ?? defaultAspectRatio;
    const mediaStyle = {
      width: mediaWidth,
      aspectRatio,
      borderRadius: 12,
      overflow: "hidden",
    };

    if (isVideo) {
      return (
        <TouchableOpacity
          onPress={() => handlers.togglePlayPause(index)}
          style={mediaStyle}
        >
          <Video
            source={{ uri: item.url }}
            resizeMode="cover"
            style={StyleSheet.absoluteFill}
            paused={paused}
            muted={muted}
            repeat
            onLoad={({ naturalSize }) => onVideoLoad(index, naturalSize)}
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
          <TouchableOpacity
            style={styles.expandIcon}
            onPress={() => setExpandedVideo({ url: item.url, index })}
          >
            <Ionicons name="expand" size={24} color="#fff" />
          </TouchableOpacity>
        </TouchableOpacity>
      );
    }

    if (isAudio) {
      return (
        <View style={{ width: mediaWidth, height: 80 }}>
          <AudioPostCard post={item} />
        </View>
      );
    }

    // Image
    return (
      <View style={mediaStyle}>
        <Image
          source={{ uri: item.url }}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
          onLoad={(e) => {
            const { width: w, height: h } = e.nativeEvent.source;
            onImageLoad(index, w, h);
          }}
        />
      </View>
    );
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
