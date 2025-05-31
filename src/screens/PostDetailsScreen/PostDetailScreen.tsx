import React from "react";
import {
  Button,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "react-native";
import CustomHeader from "../../components/Input/Header/Header";
import PostCard from "../../components/PostCard/PostCard";
import Typography from "../../components/Typography/Typography";
import useAppTheme from "../../hooks/useAppTheme";
import { usePostDetail } from "../../hooks/usePoseDetails";
import { createStyles } from "./styles";
import { usePaginatedComments } from "../../hooks/useGetComments";
import { useComment } from "../../services/hooks/usePost";
import { queryClient } from "../../../App";
import { DEFAULT_AVATAR } from "../../utils/Constants";
import Ionicons from "react-native-vector-icons/Ionicons";

export const PostDetailScreen = ({ route }) => {
  const postId = route?.params?.postId;
  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  const { data: post, isLoading } = usePostDetail(postId);

  const {
    data: commentsPages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePaginatedComments(postId);

  const comments = commentsPages?.pages?.flat() || [];
  const commentsData = comments[0]?.output?.list;

  const [commentText, setCommentText] = React.useState("");
  const commentMutation = useComment();

  const handleSendComment = () => {
    if (!commentText.trim()) return;
    commentMutation.mutate(
      { postId, comment: commentText },
      {
        onSuccess: () => {
          setCommentText("");
          queryClient.invalidateQueries(["comments", postId]);
        },
      }
    );
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (!post) return <Text>Post not found</Text>;
  console.log({ commentsData });

  return (
    <SafeAreaView style={styles.safeAreview}>
      <CustomHeader canGoback style={styles.pt} />
      <PostCard key={1} {...post} noShadow />
      <View style={{ padding: 10 }}>
        <View style={styles.commentDes}>
          <TextInput
            placeholder="Add a comment..."
            value={commentText}
            onChangeText={setCommentText}
            style={styles.commentinput}
            multiline
          />
          <Ionicons
            name="send"
            color={commentText.length !== 0 ? "skyblue" : "#555"}
            size={30}
            style={{ alignSelf: "flex-end" }}
            onPress={() => {
              if (commentText.length !== 0) {
                handleSendComment();
              }
            }}
          />
        </View>
        <FlatList
          data={commentsData}
          keyExtractor={(item, index) => item._id || index.toString()}
          renderItem={({ item }) => {
            const user = item.commentedUserData?.[0];
            const name = user ? `${user.firstName} ${user.lastName}` : "User";
            const avatar = user.profilePicture || DEFAULT_AVATAR;
            return (
              <View style={styles.commentContainer}>
                <View style={styles.imgrow}>
                  {user?.profilePicture && (
                    <Image source={{ uri: avatar }} style={styles.avatar} />
                  )}

                  <Typography style={styles.cUsertxt}>{name}</Typography>
                </View>
                <Typography style={styles.commentTxt}>
                  {item?.comment}
                </Typography>
              </View>
            );
          }}
          ListFooterComponent={
            hasNextPage ? (
              <Typography onPress={fetchNextPage} style={styles.loadMoreText}>
                {isFetchingNextPage ? "Loading..." : "Load More"}
              </Typography>
            ) : null
          }
          ListEmptyComponent={<Typography>No comments yet</Typography>}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.5}
        />
      </View>
    </SafeAreaView>
  );
};
