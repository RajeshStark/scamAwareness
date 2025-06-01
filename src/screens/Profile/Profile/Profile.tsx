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

export default function ProfileScreen({ navigation }) {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);
  const usserInfo = useAppSelector((state) => state?.login?.usserInfo);
  const [activeTab, setActiveTab] = useState(1);

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

  console.log({ Interestposts });

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: "data:image/jpeg;base64,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",
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
              uri: usserInfo?.profilePicture,
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
          {usserInfo?.firstName} {usserInfo?.lastName}
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
          data={usserInfo?.media}
          renderItem={({ item, index }) => (
            <PostCard key={index} {...item} noShadow />
          )}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={
            <View>
              <Typography>No posts</Typography>
            </View>
          }
        />
      ) : activeTab === 2 ? (
        <>
          {isRefetching && (
            <View>
              <ActivityIndicator size="small" color={theme.primary} />
            </View>
          )}

          <FlatList
            data={Interestposts}
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
