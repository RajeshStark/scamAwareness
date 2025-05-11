import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const notifications = {
  new: [
    {
      id: "1",
      title: "SALE IS LIVE",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "https://source.unsplash.com/random/100x100?burger",
      thumb: "https://source.unsplash.com/random/100x100?building",
      badge: 2,
    },
    {
      id: "2",
      title: "SALE IS LIVE",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "https://source.unsplash.com/random/100x100?burger2",
      thumb: "https://source.unsplash.com/random/100x100?building2",
      badge: 2,
    },
  ],
  today: [
    {
      id: "3",
      title: "SALE IS LIVE",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "https://source.unsplash.com/random/100x100?burger3",
      thumb: "https://source.unsplash.com/random/100x100?building3",
    },
    {
      id: "4",
      title: "SALE IS LIVE",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "https://source.unsplash.com/random/100x100?burger4",
      thumb: "https://source.unsplash.com/random/100x100?building4",
    },
    {
      id: "5",
      title: "SALE IS LIVE",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "https://source.unsplash.com/random/100x100?burger5",
      thumb: "https://source.unsplash.com/random/100x100?building5",
    },
  ],
};

export default function NotificationScreen() {
  const renderNotification = (item: any, isNew = false) => (
    <View key={item.id} style={styles.card}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: item.image }} style={styles.avatar} />
        {isNew && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.badge}</Text>
          </View>
        )}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.desc}>{item.desc}</Text>
      </View>
      <Image source={{ uri: item.thumb }} style={styles.thumbnail} />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="black" />
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      <Text style={styles.sectionHeader}>New</Text>
      {notifications.new.map((item) => renderNotification(item, true))}

      <View style={styles.divider} />

      <Text style={styles.sectionHeader}>Today</Text>
      {notifications.today.map((item) => renderNotification(item))}

      <Pressable style={styles.showMore}>
        <Text style={styles.showMoreText}>Show More</Text>
        <Ionicons name="chevron-down" size={18} color="#1b3b6f" />
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  sectionHeader: {
    fontWeight: "bold",
    fontSize: 16,
    marginVertical: 12,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  badge: {
    position: "absolute",
    top: -6,
    left: -6,
    backgroundColor: "#f28b02",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: {
    fontSize: 10,
    color: "#fff",
    fontWeight: "bold",
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontWeight: "bold",
    color: "#1b3b6f",
  },
  desc: {
    fontSize: 12,
    color: "#333",
  },
  thumbnail: {
    width: 44,
    height: 44,
    borderRadius: 6,
  },
  divider: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  showMore: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  showMoreText: {
    color: "#1b3b6f",
    fontWeight: "bold",
  },
});
