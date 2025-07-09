import React from "react";
import {
  Button,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "react-native";
import CustomHeader from "../../components/Input/Header/Header";
import PostCard from "../../components/PostCard";
import Typography from "../../components/Typography/Typography";
import useAppTheme from "../../hooks/useAppTheme";
import { usePostDetail } from "../../hooks/usePoseDetails";
import { createStyles } from "./styles";
import { usePaginatedComments } from "../../hooks/useGetComments";
import { useComment, useReply } from "../../services/hooks/usePost";
import { queryClient } from "../../../App";
import { DEFAULT_AVATAR } from "../../utils/Constants";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ScrollView } from "react-native";
import LineraBgContainer from "../../components/Container/LineraBgContainer";

export const PostDetailScreen = ({ route }) => {
  const postId = route?.params?.postId;
  const [replyText, setReplyText] = React.useState("");
  const [activeReplyId, setActiveReplyId] = React.useState(null);
  const [commentText, setCommentText] = React.useState("");
  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  const replyMutation = useReply();
  const { data: post, isLoading } = usePostDetail(postId);
  const {
    data: commentsPages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePaginatedComments(postId);

  const comments = commentsPages?.pages?.flat() || [];
  const commentsData = comments[0]?.output?.list;
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

  const handleSendReply = (commentId, repliedToId) => {
    if (!replyText.trim()) return;
    replyMutation.mutate(
      {
        postId,
        commentId,
        reply: replyText,
        repliedTo: repliedToId,
      },
      {
        onSuccess: () => {
          setReplyText("");
          setActiveReplyId(null);
          queryClient.invalidateQueries(["comments", postId]);
        },
      }
    );
  };

  if (isLoading)
    return (
      <SafeAreaView style={styles.safeAreview}>
        <CustomHeader canGoback style={styles.pt} />
        <Typography>Loading...</Typography>
      </SafeAreaView>
    );
  if (!post)
    return (
      <SafeAreaView style={styles.safeAreview}>
        <CustomHeader canGoback style={styles.pt} />
        <Typography>Post not found</Typography>
      </SafeAreaView>
    );

  const renderItem = ({ item }) => {
    const user = item.commentedUserData?.[0];
    const name = user ? `${user.firstName} ${user.lastName}` : "User";
    const avatar = user?.profilePicture || DEFAULT_AVATAR;

    return (
      <View>
        <View style={styles.commentContainer}>
          <View style={styles.imgrow}>
            <Image source={{ uri: avatar }} style={styles.avatar} />
            <Typography style={styles.cUsertxt}>{name}</Typography>
          </View>

          <Typography style={styles.commentTxt}>{item.comment}</Typography>
        </View>
        <Pressable
          style={styles.replyIconContainer}
          onPress={() =>
            setActiveReplyId(activeReplyId === item._id ? null : item._id)
          }
        >
          <Typography>Reply</Typography>
          <Ionicons
            name="return-down-back"
            size={20}
            color="gray"
            style={styles.replyIcon}
          />
        </Pressable>

        {activeReplyId === item._id && (
          <View style={styles.replyContainer}>
            <TextInput
              placeholder="Write a reply..."
              value={replyText}
              onChangeText={setReplyText}
              style={styles.replyInput}
              multiline
            />
            <Ionicons
              name="send"
              color={replyText.length !== 0 ? "skyblue" : "#555"}
              size={24}
              onPress={() => handleSendReply(item._id, item.commentedBy)}
              style={styles.sendReplyIcon}
            />
          </View>
        )}

        {Array.isArray(item.repliedData) && item.repliedData.length > 0 && (
          <View style={styles.repliesWrapper}>
            {item.repliedData.map((reply) => {
              const replyBy = reply.repliedByUser?.[0];
              const replyTo = reply.repliedToUser?.[0];

              return (
                <View key={reply._id} style={styles.replyItem}>
                  <Image
                    source={{ uri: replyBy?.profilePicture || DEFAULT_AVATAR }}
                    style={styles.replyAvatar}
                  />
                  <View style={styles.replyTextWrapper}>
                    <Typography style={styles.replyUserName}>
                      {replyBy?.firstName} {replyBy?.lastName}
                    </Typography>
                    <Typography style={styles.replyContent}>
                      {reply.reply}
                    </Typography>
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeAreview}>
      <LineraBgContainer>
        <ScrollView showsVerticalScrollIndicator={false}>
          <CustomHeader canGoback style={styles.pt} />
          <PostCard key={1} {...post} noShadow />
          <View style={{ padding: 10, paddingBottom: 30 }}>
            <View style={styles.commentDes}>
              <TextInput
                placeholder="Add a comment..."
                placeholderTextColor={theme.white}
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
              scrollEnabled={false}
              keyExtractor={(item, index) => item._id || index.toString()}
              renderItem={renderItem}
              ListFooterComponent={
                hasNextPage ? (
                  <Typography
                    onPress={fetchNextPage}
                    style={styles.loadMoreText}
                  >
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
        </ScrollView>
      </LineraBgContainer>
    </SafeAreaView>
  );
};
