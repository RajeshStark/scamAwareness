import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Video from "react-native-video";
import {
  useLike,
  useDislike,
  useAddInterest,
  useRemoveInterest,
  useDelete,
} from "../../services/hooks/usePost";
import SoundPlayer from "react-native-sound-player";
import Typography from "../Typography/Typography";
import { useQueryClient } from "@tanstack/react-query";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { DEFAULT_AVATAR } from "../../utils/Constants";

type MediaItem = {
  type: string;
  url: string;
};

type like = {
  _id: string;
  createdAt: string;
  likedBy: string;
  postId: string;
  type: number;
  updatedAt: string;
}[];

type PostCardProps = {
  userDetails: {
    firstName?: string;
    lastName?: string;
    profilePicture?: string;
  }[];
  description: string;
  name: string;
  media: MediaItem[];
  commentCount: number;
  likeCount: number;
  shareCount: number;
  noShadow?: boolean;
  isLiked?: boolean;
  isInterested?: boolean;
  _id: string;
  like: like;
  from: string;
};

const PostCard: React.FC<PostCardProps> = ({
  userDetails,
  description,
  media = [],
  commentCount,
  likeCount,
  shareCount,
  noShadow,
  isLiked,
  isInterested,
  _id,
  like,
  name,
  from,
}) => {
  const avatar = userDetails?.[0]?.profilePicture || DEFAULT_AVATAR;
  const username =
    (userDetails?.[0]?.firstName || "") +
    " " +
    (userDetails?.[0]?.lastName || "");
  const displayName = username.trim() || "Admin";
  const navigation = useNavigation();
  const [pausedVideos, setPausedVideos] = useState<Record<number, boolean>>({});
  const [mutedVideos, setMutedVideos] = useState<Record<number, boolean>>({});
  const queryClient = useQueryClient();
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [expandedVideo, setExpandedVideo] = useState<{
    url: string;
    index: number;
  } | null>(null);

  const openVideoModal = (url: string, index: number) => {
    setExpandedVideo({ url, index });
  };

  const closeVideoModal = () => {
    setExpandedVideo(null);
  };

  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentMediaIndex(viewableItems[0].index ?? 0);
    }
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const { mutate: likeing } = useLike();
  const { mutate: dislike } = useDislike();
  const { mutate: deletePost } = useDelete();
  const { mutate: addInterest } = useAddInterest();
  const { mutate: removeInterest } = useRemoveInterest();

  const togglePlayPause = (index: number) => {
    setPausedVideos((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleMute = (index: number) => {
    setMutedVideos((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleLike = () => {
    if (!isLiked) {
      likeing(
        { postId: _id, type: 1 },
        {
          onSuccess: (response) => {
            if (response.status) {
              updatePostLikeStatus(true);
            }
          },
        }
      );
    } else {
      const likeId = like?.[0]?._id;
      if (!likeId) {
        Alert.alert("Unable to dislike", "Like ID not found.");
        return;
      }

      dislike(
        { id: likeId },
        {
          onSuccess: (response) => {
            if (response.status) {
              updatePostLikeStatus(false);
            }
          },
        }
      );
    }
  };

  const updatePostLikeStatus = (liked: boolean) => {
    queryClient.setQueryData(["posts"], (oldData: any) => {
      if (!oldData) return oldData;
      return {
        ...oldData,
        pages: oldData.pages.map((page) => ({
          ...page,
          output: {
            ...page.output,
            list: page.output.list.map((post) => {
              if (post._id === _id) {
                return {
                  ...post,
                  isLiked: liked,
                  likeCount: liked ? post.likeCount + 1 : post.likeCount - 1,
                };
              }
              return post;
            }),
          },
        })),
      };
    });
  };

  const toggleInterest = () => {
    if (!isInterested) {
      addInterest(
        { postId: _id },
        {
          onSuccess: (response) => {
            if (response.status) {
              updatePostInterestStatus(true);
            }
          },
        }
      );
    } else {
      removeInterest(
        { postId: _id },
        {
          onSuccess: (response) => {
            if (response.status) {
              updatePostInterestStatus(false);
            }
          },
        }
      );
    }
  };

  const updatePostInterestStatus = (interested: boolean) => {
    queryClient.setQueryData(["posts"], (oldData: any) => {
      if (!oldData) return oldData;
      return {
        ...oldData,
        pages: oldData.pages.map((page) => ({
          ...page,
          output: {
            ...page.output,
            list: page.output.list.map((post) => {
              if (post._id === _id) {
                return {
                  ...post,
                  isInterested: interested,
                };
              }
              return post;
            }),
          },
        })),
      };
    });
  };

  const postDelete = (id: string) => {
    Alert.alert("Delete", "Are you sure you want to delete?", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Ok",
        onPress: () => {
          deletePost({ id: id });
        },
        style: "cancel",
      },
    ]);
  };

  const [playingAudioIndex, setPlayingAudioIndex] = useState<number | null>(
    null
  );

  const playOrPauseAudio = async (url: string, index: number) => {
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
      console.log("Cannot play the sound file", e);
    }
  };

  const stopAudio = () => {
    try {
      SoundPlayer.stop();
      setPlayingAudioIndex(null);
    } catch (e) {
      console.log("Error stopping audio", e);
    }
  };

  useEffect(() => {
    return () => {
      stopAudio(); // Stop any playing audio on unmount
    };
  }, []);

  const content = (
    <View style={[styles.card, { elevation: noShadow ? 0 : 3 }]}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
          <View>
            <Typography style={styles.username}>{displayName}</Typography>
          </View>
        </View>
        {from === "myProfile" && (
          <Ionicons
            name="trash-outline"
            size={20}
            color={"#f3718b"}
            onPress={() => {
              postDelete(_id);
            }}
          />
        )}
      </View>
      <View style={styles.contentContainer}>
        <Pressable
          onPress={() =>
            navigation.navigate("PostDetailScreen", {
              postId: _id,
            })
          }
        >
          <Typography style={styles.title}>{name}</Typography>
          <Typography style={styles.caption}>{description}</Typography>
        </Pressable>

        {media.length > 0 && (
          <View style={[styles.media, { alignSelf: "flex-end" }]}>
            <FlatList
              data={media}
              keyExtractor={(_, index) => index.toString()}
              horizontal
              pagingEnabled
              snapToAlignment="center"
              decelerationRate="fast"
              showsHorizontalScrollIndicator={false}
              onViewableItemsChanged={onViewRef.current}
              viewabilityConfig={viewConfigRef.current}
              renderItem={({ item, index }) => {
                const isVideo = item.type.includes("video");
                const isAudio = item.type.includes("audio");
                const paused = pausedVideos[index] ?? true;
                const muted = mutedVideos[index] ?? true;

                const mediaWrapperStyle = {
                  ...styles.media,
                  borderRadius: 12,
                  overflow: "hidden",
                };

                if (isVideo) {
                  return (
                    <TouchableOpacity
                      onPress={() => togglePlayPause(index)}
                      style={mediaWrapperStyle}
                    >
                      <View style={mediaWrapperStyle}>
                        <Video
                          source={{ uri: item.url }}
                          style={StyleSheet.absoluteFill}
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
                          <TouchableOpacity onPress={() => toggleMute(index)}>
                            <Ionicons
                              name={muted ? "volume-mute" : "volume-high"}
                              size={28}
                              color="#fff"
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                      <TouchableOpacity
                        style={styles.expandIcon}
                        onPress={() => openVideoModal(item.url, index)}
                      >
                        <Ionicons name="expand" size={24} color="#fff" />
                      </TouchableOpacity>
                    </TouchableOpacity>
                  );
                } else if (isAudio) {
                  const isPlaying = playingAudioIndex === index;

                  return (
                    <TouchableOpacity
                      style={[
                        mediaWrapperStyle,
                        {
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "#f0f0f0",
                          padding: 20,
                        },
                      ]}
                      onPress={() => playOrPauseAudio(item.url, index)}
                    >
                      <Ionicons
                        name={isPlaying ? "pause" : "play"}
                        size={32}
                        color="#000"
                        style={{ marginBottom: 10 }}
                      />
                      <Typography
                        style={{
                          fontSize: 10,
                          textAlign: "center",
                          paddingHorizontal: 5,
                        }}
                      >
                        {item.url.split("/").pop()}
                      </Typography>
                    </TouchableOpacity>
                  );
                } else {
                  return (
                    <View style={mediaWrapperStyle}>
                      <Image
                        source={{ uri: item.url }}
                        style={StyleSheet.absoluteFill}
                        resizeMode="cover"
                      />
                    </View>
                  );
                }
              }}
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

        <View style={styles.footer}>
          <Pressable
            onPress={() =>
              navigation.navigate("PostDetailScreen", {
                postId: _id,
              })
            }
            style={styles.iconRow}
          >
            <Ionicons name="chatbubble-outline" size={16} color="#555" />
            <Typography style={styles.iconText}>{commentCount}</Typography>
          </Pressable>
          <Pressable style={styles.iconRow} onPress={toggleLike}>
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
          <Pressable style={styles.iconRow} onPress={toggleInterest}>
            <Ionicons
              name={isInterested ? "bookmark" : "bookmark-outline"}
              size={16}
              color={isInterested ? "#8E1A7B" : "#555"}
            />
          </Pressable>
        </View>
      </View>

      {expandedVideo && (
        <Modal
          visible={true}
          transparent
          animationType="slide"
          onRequestClose={closeVideoModal}
        >
          <TouchableOpacity
            style={styles.modalCloseIcon}
            onPress={closeVideoModal}
          >
            <Ionicons name="close" size={28} color="#fff" />
          </TouchableOpacity>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.modalBackdrop}
              onPress={closeVideoModal}
            />
            <View style={styles.modalContent}>
              <Video
                source={{ uri: expandedVideo.url }}
                style={StyleSheet.absoluteFill}
                controls
                resizeMode="contain"
                paused={false}
                muted={false}
                repeat
              />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );

  return noShadow ? content : <View>{content}</View>;
};

export default PostCard;
