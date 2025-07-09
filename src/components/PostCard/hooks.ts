// hooks.ts
import { useState, useRef } from "react";
import SoundPlayer from "react-native-sound-player";

export const usePostCardLogic = (props, services) => {
  const { _id, isLiked, isInterested, like = [], media = [] } = props;

  const {
    navigation,
    queryClient,
    useLike,
    useDislike,
    useAddInterest,
    useRemoveInterest,
    useDelete,
  } = services;

  const [pausedVideos, setPausedVideos] = useState({});
  const [mutedVideos, setMutedVideos] = useState({});
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [expandedVideo, setExpandedVideo] = useState(null);
  const [playingAudioIndex, setPlayingAudioIndex] = useState(null);

  const likeMutation = useLike();
  const dislikeMutation = useDislike();
  const addInterest = useAddInterest();
  const removeInterest = useRemoveInterest();
  const deletePost = useDelete();

  const stopAudio = () => {
    try {
      SoundPlayer.stop();
      setPlayingAudioIndex(null);
    } catch (e) {
      console.log("Error stopping audio", e);
    }
  };

  const togglePlayPause = (index) =>
    setPausedVideos((prev) => ({ ...prev, [index]: !prev[index] }));

  const toggleMute = (index) =>
    setMutedVideos((prev) => ({ ...prev, [index]: !prev[index] }));

  const playOrPauseAudio = async (url, index) => {
    try {
      if (playingAudioIndex === index) {
        SoundPlayer.pause();
        setPlayingAudioIndex(null);
      } else {
        SoundPlayer.stop();
        SoundPlayer.playUrl(url);
        setPlayingAudioIndex(index);
      }
    } catch (e) {
      console.log("Cannot play sound", e);
    }
  };

  const toggleLike = () => {
    if (!isLiked) {
      likeMutation.mutate(
        { postId: _id, type: 1 },
        {
          onSuccess: (res) => {
            if (res.status) updatePostLike(true);
            queryClient.refetchQueries(["post", _id]);
          },
        }
      );
    } else {
      const likeId = like?.[0]?._id;
      if (!likeId) return;
      dislikeMutation.mutate(
        { id: likeId },
        {
          onSuccess: (res) => {
            if (res.status) updatePostLike(false);
            queryClient.refetchQueries(["post", _id]);
          },
        }
      );
    }
  };

  const updatePostLike = (liked: boolean) => {
    queryClient.setQueryData(["posts"], (oldData) => {
      if (!oldData) return oldData;
      return {
        ...oldData,
        pages: oldData.pages.map((page) => ({
          ...page,
          output: {
            ...page.output,
            list: page.output.list.map((post) =>
              post._id === _id
                ? {
                    ...post,
                    isLiked: liked,
                    likeCount: liked ? post.likeCount + 1 : post.likeCount - 1,
                  }
                : post
            ),
          },
        })),
      };
    });
  };

  const toggleInterest = () => {
    const action = isInterested ? removeInterest : addInterest;
    action.mutate(
      { postId: _id },
      {
        onSuccess: (res) => {
          if (res.status) updatePostInterest(!isInterested);
        },
      }
    );
  };

  const updatePostInterest = (interested) => {
    queryClient.setQueryData(["posts"], (oldData) => {
      if (!oldData) return oldData;
      return {
        ...oldData,
        pages: oldData.pages.map((page) => ({
          ...page,
          output: {
            ...page.output,
            list: page.output.list.map((post) =>
              post._id === _id ? { ...post, isInterested: interested } : post
            ),
          },
        })),
      };
    });
  };

  const postDelete = (id) => {
    deletePost.mutate({ id });
  };

  return {
    state: {
      pausedVideos,
      mutedVideos,
      playingAudioIndex,
      currentMediaIndex,
    },
    handlers: {
      togglePlayPause,
      toggleMute,
      playOrPauseAudio,
      toggleLike,
      toggleInterest,
      postDelete,
      setCurrentMediaIndex,
    },
    expandedVideo,
    setExpandedVideo,
    stopAudio,
  };
};
