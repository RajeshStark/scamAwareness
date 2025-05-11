import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";

type PostCardProps = {
  avatar: string;
  username: string;
  handle: string;
  caption: string;
  imageUrl: string;
  comments: number;
  likes: number;
  shares: number;
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
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <View>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.handle}>@{handle}</Text>
        </View>
      </View>

      <Text style={styles.caption}>{caption}</Text>

      <Image source={{ uri: imageUrl }} style={styles.postImage} />

      <View style={styles.footer}>
        <View style={styles.iconRow}>
          <Icon name="message-circle" size={16} color="#555" />
          <Text style={styles.iconText}>{comments}</Text>
        </View>
        <View style={styles.iconRow}>
          <Icon name="heart" size={16} color="#555" />
          <Text style={styles.iconText}>{likes}</Text>
        </View>
        <View style={styles.iconRow}>
          <Icon name="repeat" size={16} color="#555" />
          <Text style={styles.iconText}>{shares}</Text>
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
    elevation: 3,
  },
  header: {
    flexDirection: "row",
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
  handle: {
    fontSize: 12,
    color: "#666",
  },
  caption: {
    fontSize: 14,
    marginBottom: 8,
  },
  postImage: {
    width: "100%",
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
