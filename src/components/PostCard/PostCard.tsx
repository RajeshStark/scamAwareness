import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";

type PostCardProps = {
  avatar: string;
  username: string;
  handle: string;
  caption: string;
  imageUrl: string;
  comments: number;
  likes: number;
  shares: number;
  noShadow?: boolean;
};

const PostCard: React.FC<PostCardProps> = ({
  avatar,
  username,
  handle,
  caption,
  imageUrl,
  comments,
  likes,
  shares,
  noShadow,
}) => {
  return (
    <View style={[styles.card, { elevation: noShadow ? 0 : 3 }]}>
      <View style={styles.header}>
        <View style={styles.header}>
          <Image source={{ uri: avatar }} style={styles.avatar} />

          <Text style={styles.username}>{username}</Text>
          <Text style={styles.handle}>@{handle}</Text>
        </View>
        <Ionicons name="ellipsis-vertical" size={20} />
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.caption}>{caption}</Text>

        <Image source={{ uri: imageUrl }} style={styles.postImage} />

        <View style={styles.footer}>
          <View style={styles.iconRow}>
            <Ionicons name="chatbubble-outline" size={16} color="#555" />
            <Text style={styles.iconText}>{comments}</Text>
          </View>
          <View style={styles.iconRow}>
            <Ionicons name="heart-outline" size={16} color="#555" />
            <Text style={styles.iconText}>{likes}</Text>
          </View>
          <View style={styles.iconRow}>
            <Ionicons name="repeat" size={16} color="#555" />
            <Text style={styles.iconText}>{shares}</Text>
          </View>
          <View style={styles.iconRow}>
            <Ionicons name="bookmark-outline" size={16} color="#555" />
          </View>
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
  contentContainer: {
    marginLeft: 45,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    justifyContent: "space-between",
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
  handle: {
    fontSize: 12,
    color: "#666",
    marginLeft: 5,
  },
  caption: {
    fontSize: 14,
    marginBottom: 8,
  },
  postImage: {
    width: "96%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
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
