import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Video from "react-native-video";
import Typography from "../Typography/Typography";
import Fonts from "../../utils/Fonts";

const screenWidth = Dimensions.get("window").width;

const DEFAULT_AVATAR =
  "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";

type PostCardProps = {
  userDetails: {
    firstName?: string;
    lastName?: string;
    profilePicture?: string;
  };
  description: string;
  image?: string;
  video?: string;
  commentCount: number;
  likeCount: number;
  shareCount: number;
  noShadow?: boolean;
  isLiked?: boolean;
};

const PostCard: React.FC<PostCardProps> = ({
  userDetails,
  description,
  image,
  video,
  commentCount,
  likeCount,
  shareCount,
  noShadow,
  isLiked,
}) => {
  const avatar = userDetails?.profilePicture || DEFAULT_AVATAR;
  const username =
    (userDetails?.firstName || "") + " " + (userDetails?.lastName || "");
  const displayName = username.trim() || "Unknown";

  const [paused, setPaused] = useState(true);
  const [muted, setMuted] = useState(true);

  const togglePlayPause = () => setPaused(!paused);
  const toggleMute = () => setMuted(!muted);

  return (
    <View style={[styles.card, { elevation: noShadow ? 0 : 3 }]}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
          <View>
            <Typography style={styles.username}>{displayName}</Typography>
          </View>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <Typography style={styles.title}>{description}</Typography>
        <Typography style={styles.caption}>{description}</Typography>

        {image ? (
          <Image source={{ uri: image }} style={styles.media} />
        ) : video ? (
          <View>
            <TouchableOpacity onPress={togglePlayPause}>
              <Video
                source={{ uri: video }}
                style={styles.media}
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
                <TouchableOpacity onPress={toggleMute}>
                  <Ionicons
                    name={muted ? "volume-mute" : "volume-high"}
                    size={28}
                    color="#fff"
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        ) : null}

        <View style={styles.footer}>
          <View style={styles.iconRow}>
            <Ionicons name="chatbubble-outline" size={16} color="#555" />
            <Typography style={styles.iconText}>{commentCount}</Typography>
          </View>
          <View style={styles.iconRow}>
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              size={16}
              color={isLiked ? "#f24822" : "#555"}
            />
            <Typography style={styles.iconText}>{likeCount}</Typography>
          </View>
          <View style={styles.iconRow}>
            <Ionicons name="repeat" size={16} color="#555" />
            <Typography style={styles.iconText}>{shareCount}</Typography>
          </View>
          <Ionicons name="bookmark-outline" size={16} color="#555" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontWeight: "bold",
    fontSize: 14,
  },
  contentContainer: {
    marginTop: 5,
  },
  caption: {
    fontSize: 14,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    marginBottom: 8,
    fontFamily: Fonts.Bold,
  },
  media: {
    width: screenWidth - 40,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#000",
  },
  overlayButtons: {
    position: "absolute",
    top: "40%",
    left: "40%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 20,
    padding: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconText: {
    marginLeft: 4,
    color: "#555",
    fontSize: 13,
  },
});

export default PostCard;
