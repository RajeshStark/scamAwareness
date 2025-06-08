import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "./styles";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getNotifications } from "../../services/noitification.service";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { DEFAULT_AVATAR } from "../../utils/Constants";

dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(isSameOrAfter);

export default function NotificationScreen() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["notifications"],
      queryFn: getNotifications,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  const flatData = data?.pages.flatMap((page) => page.notifications) || [];
  const groupedNotifications = groupNotifications(flatData);

  const renderNotification = ({ item }) => {
    const userImage = item?.userDetails?.profilePicture || DEFAULT_AVATAR;
    const mediaUrl = item?.postDetails?.media?.[0]?.url;
    const title = item?.postDetails?.name;
    const description = item?.postDetails?.description;

    return (
      <View style={styles.card}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: userImage }} style={styles.avatar} />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text numberOfLines={2} style={styles.desc}>
            {description}
          </Text>
        </View>

        {mediaUrl && (
          <Image source={{ uri: mediaUrl }} style={styles.thumbnail} />
        )}
      </View>
    );
  };

  const renderSection = ({ item }) => {
    return (
      <View>
        <Text style={styles.sectionHeader}>{item.title}</Text>
        {item.data.map((notification) => (
          <View key={notification._id}>
            {renderNotification({ item: notification })}
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.content, { paddingHorizontal: 16 }]}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Notifications</Text>
        </View>

        {isLoading ? (
          <ActivityIndicator style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={groupedNotifications}
            renderItem={renderSection}
            keyExtractor={(item) => item.title}
            onEndReached={() => {
              if (hasNextPage && !isFetchingNextPage) fetchNextPage();
            }}
            onEndReachedThreshold={0.4}
            ListFooterComponent={
              isFetchingNextPage && (
                <ActivityIndicator style={{ marginVertical: 20 }} />
              )
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const groupNotifications = (notifications) => {
  const today = [];
  const yesterday = [];
  const thisWeek = [];
  const older = [];

  notifications.forEach((item) => {
    const createdAt = dayjs(item.createdAt);

    if (createdAt.isToday()) {
      today.push(item);
    } else if (createdAt.isYesterday()) {
      yesterday.push(item);
    } else if (createdAt.isSameOrAfter(dayjs().subtract(7, "day"))) {
      thisWeek.push(item);
    } else {
      older.push(item);
    }
  });

  return [
    { title: "Today", data: today },
    { title: "Yesterday", data: yesterday },
    { title: "This Week", data: thisWeek },
    { title: "Older", data: older },
  ].filter((group) => group.data.length > 0);
};
