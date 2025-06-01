import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Pressable,
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
} from "../../services/hooks/usePost";

import Typography from "../Typography/Typography";
import { useQueryClient } from "@tanstack/react-query";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { DEFAULT_AVATAR } from "../../utils/Constants";

type MediaItem = {
  type: string;
  url: string;
};

type PostCardProps = {
  userDetails: {
    firstName?: string;
    lastName?: string;
    profilePicture?: string;
  }[];
  description: string;
  media: MediaItem[];
  commentCount: number;
  likeCount: number;
  shareCount: number;
  noShadow?: boolean;
  isLiked?: boolean;
  isInterested?: boolean;
  _id: string;
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
  const { mutate: like } = useLike();
  const { mutate: dislike } = useDislike();

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
      console.log("Inside like");

      like(
        { postId: _id, type: 1 },
        {
          onSuccess: (response) => {
            if (response.status) {
              console.log("INSIDE  like success");
              updatePostLikeStatus(true);
            } else {
              console.log(response.data);
            }
          },
        }
      );
    } else {
      console.log("Inside dislike");
      dislike(
        { id: _id },
        {
          onSuccess: (response) => {
            if (response.status) {
              console.log("INSIDE dislike success");

              updatePostLikeStatus(false);
            } else {
              console.log(response.data);
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

  const content = (
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

        {media.length > 0 && (
          <FlatList
            data={media}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            pagingEnabled
            snapToAlignment="center"
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              const isVideo = item.type.includes("video");
              const paused = pausedVideos[index] ?? true;
              const muted = mutedVideos[index] ?? true;

              if (isVideo) {
                return (
                  <TouchableOpacity
                    onPress={() => togglePlayPause(index)}
                    style={styles.media}
                  >
                    <Video
                      source={{ uri: item.url }}
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
                      <TouchableOpacity onPress={() => toggleMute(index)}>
                        <Ionicons
                          name={muted ? "volume-mute" : "volume-high"}
                          size={28}
                          color="#fff"
                        />
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                );
              } else {
                return (
                  <Image
                    source={{ uri: item.url }}
                    style={styles.media}
                    resizeMode="cover"
                  />
                );
              }
            }}
          />
        )}

        <View style={styles.footer}>
          <View style={styles.iconRow}>
            <Ionicons name="chatbubble-outline" size={16} color="#555" />
            <Typography style={styles.iconText}>{commentCount}</Typography>
          </View>
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
    </View>
  );

  return noShadow ? (
    content
  ) : (
    <Pressable
      onPress={() =>
        navigation.navigate("PostDetailScreen", {
          postId: _id,
        })
      }
    >
      {content}
    </Pressable>
  );
};

export default PostCard;
