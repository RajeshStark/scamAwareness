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
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const img =
  "https://www.foodandwine.com/thmb/0SHv4wzGz7OBOcYtVbRWQeuR2CQ=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/MSG-Smash-Burger-FT-RECIPE0124-d9682401f3554ef683e24311abdf342b.jpg";

const build =
  "https://images.unsplash.com/photo-1612380783707-d759e46ee5cf?q=80&w=3144&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const notifications = {
  new: [
    {
      id: "1",
      title: "SALE IS LIVE",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: img,
      thumb: build,
      badge: 2,
    },
    {
      id: "2",
      title: "SALE IS LIVE",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: img,
      thumb: build,
      badge: 2,
    },
  ],
  today: [
    {
      id: "3",
      title: "SALE IS LIVE",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: img,
      thumb: build,
    },
    {
      id: "4",
      title: "SALE IS LIVE",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: img,
      thumb: build,
    },
    {
      id: "5",
      title: "SALE IS LIVE",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: img,
      thumb: build,
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
        {/* <MaterialCommunityIcons name="arrow-back" size={24} color="black" /> */}
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      <Text style={styles.sectionHeader}>New</Text>
      {notifications.new.map((item) => renderNotification(item, true))}

      <View style={styles.divider} />

      <Text style={styles.sectionHeader}>Today</Text>
      {notifications.today.map((item) => renderNotification(item))}

      <Pressable style={styles.showMore}>
        <Text style={styles.showMoreText}>Show More</Text>
        <MaterialCommunityIcons
          name="chevron-double-down"
          size={18}
          color="#1b3b6f"
        />
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
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
    color: "#0E3173",
  },
  desc: {
    fontSize: 12,
    color: "#0E3173",
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
