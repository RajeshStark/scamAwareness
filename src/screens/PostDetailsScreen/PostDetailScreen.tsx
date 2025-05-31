import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  Button,
  SafeAreaView,
} from "react-native";
import { usePostDetail } from "../../hooks/usePoseDetails";
import PostCard from "../../components/PostCard/PostCard";
import CustomHeader from "../../components/Input/Header/Header";

export const PostDetailScreen = ({ navigation, route }) => {
  const postId = route?.params?.postId;
  console.log({ postId });

  const { data: post, isLoading } = usePostDetail(postId);

  if (isLoading) return <Text>Loading...</Text>;
  if (!post) return <Text>Post not found</Text>;

  console.log({ post });

  return (
    <SafeAreaView style={{ paddingTop: 30 }}>
      <CustomHeader canGoback style={{ padding: 10 }} />
      <PostCard key={1} {...post} noShadow />
      <View style={{ padding: 10 }}>
        <View style={{ marginVertical: 12 }}>
          <Text style={{ fontWeight: "bold", marginBottom: 8 }}>Comments</Text>
          {post.comments?.length > 0 ? (
            post.comments.map((comment, idx) => (
              <View key={idx} style={{ marginBottom: 8 }}>
                <Text style={{ fontWeight: "600" }}>
                  {comment?.user?.name || "User"}
                </Text>
                <Text>{comment?.text}</Text>
              </View>
            ))
          ) : (
            <Text>No comments yet</Text>
          )}
        </View>

        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 12 }}
        >
          <TextInput
            placeholder="Add a comment..."
            style={{
              flex: 1,
              borderColor: "#ccc",
              borderWidth: 1,
              borderRadius: 8,
              paddingHorizontal: 12,
              height: 40,
            }}
          />
          <Button title="Send" onPress={() => {}} />
        </View>
      </View>
    </SafeAreaView>
  );
};
