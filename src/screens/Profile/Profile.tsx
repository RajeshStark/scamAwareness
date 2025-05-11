import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <ImageBackground
          source={{ uri: "https://i.imgur.com/JXb1YlQ.jpeg" }}
          style={styles.headerBackground}
        >
          <TouchableOpacity
            style={styles.settingsIcon}
            onPress={() => navigation.navigate("Settings")}
          >
            <Ionicons name="settings-outline" size={22} color="#002244" />
          </TouchableOpacity>

          {/* Profile Image */}
          <View style={styles.profileImageWrapper}>
            <Image
              source={{ uri: "https://i.imgur.com/wvxPV9S.png" }}
              style={styles.profileImage}
            />
          </View>

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate("EditProfile")}
          >
            <Text style={styles.editText}>Edit Profile</Text>
            <Ionicons name="pencil" size={12} color="#fff" />
          </TouchableOpacity>
        </ImageBackground>

        {/* Info */}
        <View style={styles.infoSection}>
          <Text style={styles.name}>Sireesh Mulagamudi</Text>
          <Text style={styles.bio}>Bio</Text>
          <View style={styles.stats}>
            <Text style={styles.statText}>0 Following</Text>
            <Text style={styles.statText}>0 Followers</Text>
          </View>

          {/* Tabs */}
          <View style={styles.tabs}>
            <Text style={[styles.tabItem, styles.activeTab]}>Posts</Text>
            <Text style={styles.tabItem}>Liked</Text>
            <Text style={styles.tabItem}>Complaint Status</Text>
          </View>
        </View>

        {/* Post */}
        <View style={styles.postCard}>
          <View style={styles.postHeader}>
            <Image
              source={{ uri: "https://i.imgur.com/wvxPV9S.png" }}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.username}>Sireesh Mulagamudi</Text>
              <Text style={styles.handle}>@sireesh_mula</Text>
            </View>
            <Ionicons
              name="ellipsis-vertical"
              size={16}
              style={styles.moreIcon}
            />
          </View>
          <Text style={styles.postText}>
            simply dummy text of the printing and type setting industry. Lorem
            Ipsum has been the industry's standard dummy text ever since the
            1500s,
          </Text>
          <Image
            source={{ uri: "https://i.imgur.com/N9KdZ4g.jpeg" }}
            style={styles.postImage}
          />
          <View style={styles.engagement}>
            <Ionicons name="chatbubble-outline" size={16} />
            <Text>32</Text>
            <Ionicons
              name="heart-outline"
              size={16}
              style={styles.iconSpacing}
            />
            <Text>110</Text>
            <Ionicons name="eye-outline" size={16} style={styles.iconSpacing} />
            <Text>96</Text>
          </View>
        </View>
      </ScrollView>

      {/* Floating Action */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerBackground: {
    height: 160,
    justifyContent: "flex-end",
    padding: 16,
  },
  settingsIcon: {
    position: "absolute",
    top: 40,
    right: 16,
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 6,
  },
  profileImageWrapper: {
    position: "absolute",
    bottom: -40,
    left: 16,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#6e008b",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  editButton: {
    position: "absolute",
    bottom: -30,
    right: 16,
    backgroundColor: "#6e008b",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  editText: {
    color: "#fff",
    fontSize: 12,
    marginRight: 4,
  },
  infoSection: {
    marginTop: 50,
    padding: 16,
  },
  name: {
    fontWeight: "bold",
    fontSize: 18,
  },
  bio: {
    color: "#666",
    marginVertical: 4,
  },
  stats: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 6,
  },
  statText: {
    color: "#555",
    fontSize: 12,
  },
  tabs: {
    flexDirection: "row",
    marginTop: 12,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  tabItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    color: "#777",
  },
  activeTab: {
    color: "#6e008b",
    borderBottomWidth: 2,
    borderColor: "#6e008b",
  },
  postCard: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
  },
  username: {
    fontWeight: "bold",
    fontSize: 14,
  },
  handle: {
    fontSize: 12,
    color: "#666",
  },
  moreIcon: {
    marginLeft: "auto",
    color: "#999",
  },
  postText: {
    fontSize: 13,
    marginVertical: 6,
  },
  postImage: {
    width: "100%",
    height: 180,
    borderRadius: 8,
    marginBottom: 8,
  },
  engagement: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
  iconSpacing: {
    marginLeft: 12,
  },
  fab: {
    position: "absolute",
    bottom: 80,
    right: 20,
    backgroundColor: "#6e008b",
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});
