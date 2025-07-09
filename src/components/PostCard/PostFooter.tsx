// PostFooter.tsx
import React from "react";
import { View, Pressable } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Typography from "../Typography/Typography";
import { styles } from "./styles";

const PostFooter = ({
  isLiked,
  likeCount,
  commentCount,
  shareCount,
  isInterested,
  _id,
  navigation,
  handlers,
}) => {
  return (
    <View style={styles.footer}>
      <Pressable
        onPress={() => navigation.navigate("PostDetailScreen", { postId: _id })}
        style={styles.iconRow}
      >
        <Ionicons name="chatbubble-outline" size={16} color="#555" />
        <Typography style={styles.iconText}>{commentCount}</Typography>
      </Pressable>
      <Pressable style={styles.iconRow} onPress={handlers.toggleLike}>
        <Ionicons
          name={isLiked ? "heart" : "heart-outline"}
          size={16}
          color={isLiked ? "#f24822" : "#555"}
        />
        <Typography style={styles.iconText}>{likeCount}</Typography>
      </Pressable>
      <View style={styles.iconRow}>
        <Ionicons name="repeat" size={16} color="#555" />
        <Typography style={styles.iconText}>{shareCount}</Typography>
      </View>
      <Pressable style={styles.iconRow} onPress={handlers.toggleInterest}>
        <Ionicons
          name={isInterested ? "bookmark" : "bookmark-outline"}
          size={16}
          color={isInterested ? "#8E1A7B" : "#555"}
        />
      </Pressable>
    </View>
  );
};

export default PostFooter;
