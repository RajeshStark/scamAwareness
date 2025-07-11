import React, { useEffect } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import {
  useLike,
  useDislike,
  useAddInterest,
  useRemoveInterest,
  useDelete,
} from "../../services/hooks/usePost";

import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostFooter from "./PostFooter";
import VideoModal from "./VideoModal";
import { usePostCardLogic } from "./hooks";

import { PostCardProps } from "./types";
import useAppTheme from "../../hooks/useAppTheme";
import { createStyles } from "./styles";

const PostCard: React.FC<PostCardProps> = (props) => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  const { state, handlers, expandedVideo, setExpandedVideo, stopAudio } =
    usePostCardLogic(props, {
      navigation,
      queryClient,
      useLike,
      useDislike,
      useAddInterest,
      useRemoveInterest,
      useDelete,
    });

  useEffect(() => {
    return () => stopAudio();
  }, []);

  const content = (
    <View style={styles.card}>
      <PostHeader {...props} onDelete={handlers.postDelete} />
      <View style={{ marginLeft: 50 }}>
        <PostContent
          {...props}
          state={state}
          handlers={handlers}
          navigation={navigation}
          setExpandedVideo={setExpandedVideo}
        />
      </View>
      <PostFooter {...props} handlers={handlers} navigation={navigation} />
      {expandedVideo && (
        <VideoModal
          url={expandedVideo.url}
          onClose={() => setExpandedVideo(null)}
        />
      )}
    </View>
  );

  return props.noShadow ? content : <View>{content}</View>;
};

export default PostCard;
