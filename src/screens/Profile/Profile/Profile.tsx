import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import PostCard from "../../../components/PostCard/PostCard";
import Typography from "../../../components/Typography/Typography";
import { useAppSelector } from "../../../hooks/useAppselector";
import useAppTheme from "../../../hooks/useAppTheme";
import { useGetInterest } from "../../../services/hooks/usePost";
import { createStyles } from "./styles";
import { useGetProfile } from "../../../services/hooks/useAuth";
import { DEFAULT_AVATAR } from "../../../utils/Constants";
import { useFocusEffect } from "@react-navigation/native";

export default function ProfileScreen({ navigation }) {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);
  const [activeTab, setActiveTab] = useState(1);
  const { data: userProfile, refetch: getprofile } = useGetProfile();
  console.log({ userProfile });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isRefetching,
    refetch,
  } = useGetInterest();
  const Interestposts =
    data?.pages.flatMap((page) => page.output?.list || []) ?? [];

  const postsTorender = Interestposts[0]?.postData;

  useFocusEffect(
    React.useCallback(() => {
      console.log("INSIDE USEFOCUS");

      getprofile();
      return () => {};
    }, [])
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri:
            userProfile?.coverPicture !== ""
              ? userProfile?.coverPicture
              : DEFAULT_AVATAR,
        }}
        style={styles.headerBackground}
      >
        <TouchableOpacity
          style={styles.settingsIcon}
          onPress={() => navigation.navigate("Settings")}
        >
          <Ionicons name="settings-outline" size={22} color="#FFC001" />
        </TouchableOpacity>

        <View style={styles.profileImageWrapper}>
          <Image
            source={{
              uri:
                userProfile?.profilePicture.length !== 0
                  ? userProfile?.profilePicture
                  : DEFAULT_AVATAR,
            }}
            style={styles.profileImage}
          />
        </View>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Typography style={styles.editText}>Edit Profile</Typography>
          <Ionicons name="pencil" size={12} color="#fff" />
        </TouchableOpacity>
      </ImageBackground>

      <View style={styles.infoSection}>
        <Typography style={styles.name}>
          {userProfile?.firstName} {userProfile?.lastName}
        </Typography>

        <View style={styles.tabs}>
          <Typography
            onPress={() => setActiveTab(1)}
            style={[styles.tabItem, activeTab === 1 && styles.activeTab]}
          >
            Posts
          </Typography>
          <Typography
            onPress={() => setActiveTab(2)}
            style={[styles.tabItem, activeTab === 2 && styles.activeTab]}
          >
            Liked
          </Typography>
          <Typography
            onPress={() => setActiveTab(3)}
            style={[styles.tabItem, activeTab === 3 && styles.activeTab]}
          >
            Complaint Status
          </Typography>
        </View>
      </View>

      {activeTab === 1 ? (
        <FlatList
          data={userProfile?.posts}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item, index }) => <PostCard key={index} {...item} />}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={
            <View style={[styles.center]}>
              <Typography>No posts</Typography>
            </View>
          }
        />
      ) : activeTab === 2 ? (
        <>
          <FlatList
            data={postsTorender}
            style={styles.mainContainer}
            scrollEnabled
            keyExtractor={(item, index) => item._id + index}
            renderItem={({ item, index }) => <PostCard key={index} {...item} />}
            ListEmptyComponent={
              !isLoading ? (
                <View style={[styles.center]}>
                  <Typography>No posts</Typography>
                </View>
              ) : null
            }
            onEndReached={() => {
              if (hasNextPage) fetchNextPage();
            }}
            onEndReachedThreshold={0.5}
            refreshing={isRefetching}
            onRefresh={refetch}
          />
        </>
      ) : null}
    </View>
  );
}
