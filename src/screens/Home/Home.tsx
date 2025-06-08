import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Animated as RNAnimated,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Container from "../../components/Container/Container";
import LineraBgContainer from "../../components/Container/LineraBgContainer";
import PostCard from "../../components/PostCard/PostCard";
import Typography from "../../components/Typography/Typography";
import useAppTheme from "../../hooks/useAppTheme";
import { usePostList } from "../../services/hooks/usePost";
import EmergencyTicker from "./Emergencyticker/EmergencyTicker";
import { createStyles } from "./styles";
import { useFocusEffect } from "@react-navigation/native";

export default function Home({ navigation }) {
  const [fabOpen, setFabOpen] = useState(false);
  const fadeAnim = useState(new RNAnimated.Value(0))[0];
  const { theme } = useAppTheme();
  const styles = createStyles(theme);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isRefetching,
    refetch,
  } = usePostList();

  const posts = data?.pages.flatMap((page) => page.output?.list || []) ?? [];
  console.log({ posts });

  const toggleFab = () => {
    setFabOpen(!fabOpen);
    RNAnimated.timing(fadeAnim, {
      toValue: fabOpen ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
      <LineraBgContainer>
        <EmergencyTicker />
        <View style={styles.mainContainer}>
          <FlatList
            data={posts}
            scrollEnabled
            style={{ marginBottom: 90, marginTop: 30 }}
            keyExtractor={(item, index) => item._id + index}
            renderItem={({ item, index }) => <PostCard key={index} {...item} />}
            ListEmptyComponent={
              !isLoading ? (
                <View style={[styles.mainContainer, styles.center]}>
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
        </View>
      </LineraBgContainer>
      <View style={styles.fabWrapper}>
        {[
          { icon: "folder-outline", onPress: () => {} },
          { icon: "pencil", onPress: () => {} },
          { icon: "image-sharp", onPress: () => {} },
        ].map((item, i) => (
          <RNAnimated.View
            key={item.icon}
            style={[
              styles.fabOption,
              {
                opacity: fadeAnim,
                transform: [
                  {
                    translateY: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -(i + 1) * 70],
                    }),
                  },
                ],
              },
            ]}
          >
            <TouchableOpacity style={styles.fabIconBtn} onPress={item.onPress}>
              <Ionicons name={item.icon} size={18} color={theme.txtblack} />
            </TouchableOpacity>
          </RNAnimated.View>
        ))}

        <TouchableOpacity
          style={[
            styles.fabMain,
            { backgroundColor: fabOpen ? theme.primary : theme.secondary },
          ]}
          onPress={() => navigation.navigate("EditorScreen")}
        >
          <Ionicons name={fabOpen ? "close" : "add"} size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
