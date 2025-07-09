import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
  Keyboard,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import LineraBgContainer from "../../components/Container/LineraBgContainer";
import useAppTheme from "../../hooks/useAppTheme";
import { width } from "../../utils/Dimensions";
import { createStyles } from "./styles";
import { useSearch } from "../../services/hooks/useSearch";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RECENT_SEARCHES_KEY = "recent_searches";

export default function SearchScreen({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [results, setResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  const { data, mutate: searchMutation } = useSearch();

  const handleSearchSubmit = async () => {
    const trimmed = searchText.trim();
    if (!trimmed) return;

    const updatedSearches = [
      trimmed,
      ...recentSearches.filter((item) => item !== trimmed),
    ];
    const limited = updatedSearches.slice(0, 4);

    setRecentSearches(limited);

    try {
      await AsyncStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(limited));
    } catch (error) {
      console.error("Failed to save search:", error);
    }

    searchMutation({ search: trimmed });
  };

  useEffect(() => {
    const loadSearches = async () => {
      try {
        const stored = await AsyncStorage.getItem(RECENT_SEARCHES_KEY);
        if (stored) {
          setRecentSearches(JSON.parse(stored));
        }
      } catch (error) {
        console.error("Failed to load recent searches:", error);
      }
    };

    loadSearches();
  }, []);

  const handleClearSearch = async (item: string) => {
    const filtered = recentSearches.filter((search) => search !== item);
    setRecentSearches(filtered);

    try {
      await AsyncStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error("Failed to update storage:", error);
    }
  };

  useEffect(() => {
    if (data?.output?.length) {
      const mediaItems = data.output
        .map((item: any) => {
          const firstMedia = item.media?.[0];
          if (!firstMedia) return null;
          return {
            id: item._id,
            ...firstMedia,
          };
        })
        .filter(Boolean);

      setResults(mediaItems);
    } else {
      setResults([]);
    }
  }, [data]);

  const renderMedia = ({ item }: any) => (
    <Pressable
      style={styles.mediaWrapper}
      onPress={() =>
        navigation.navigate("PostDetailScreen", {
          postId: item?.id,
        })
      }
    >
      {item.type.startsWith("image") ? (
        <Image source={{ uri: item.url }} style={styles.imageTile} />
      ) : (
        <View style={styles.videoWrapper}>
          <Image
            source={{
              uri: "https://img.icons8.com/ios-filled/100/000000/video.png",
            }}
            style={styles.videoIcon}
          />
          <Image source={{ uri: item.url }} style={styles.imageTile} />
        </View>
      )}
    </Pressable>
  );

  return (
    <LineraBgContainer>
      <SafeAreaView style={styles.flex}>
        <View style={styles.container}>
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Search..."
              value={searchText}
              onChangeText={setSearchText}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onSubmitEditing={handleSearchSubmit}
              style={styles.input}
              returnKeyType="search"
            />
            <View
              style={{ width: 1.5, height: 30, backgroundColor: theme.grey }}
            />
            <Pressable onPress={handleSearchSubmit}>
              <Ionicons
                name="search"
                size={20}
                color={"#111827"}
                style={{ marginLeft: 10 }}
              />
            </Pressable>
          </View>

          {isFocused && (
            <View style={styles.recentContainer}>
              <Text style={styles.recentHeader}>Recent searches</Text>
              {recentSearches.map((item) => (
                <View key={item} style={styles.recentItem}>
                  <Ionicons name="search" size={16} color={theme.postIcons} />
                  <Text style={styles.recentText}>{item}</Text>
                  <Pressable onPress={() => handleClearSearch(item)}>
                    <Ionicons name="close" size={24} color={theme.txtblack} />
                  </Pressable>
                </View>
              ))}
            </View>
          )}

          <View style={{ margin: 12 }}>
            <View
              style={{
                width: width * 0.9,
                backgroundColor: theme.white,
                height: 2,
              }}
            />
            <Text style={styles.recommendedText}>Search Results</Text>
            <FlatList
              data={results}
              keyExtractor={(item) => item.id + item.url}
              renderItem={renderMedia}
              numColumns={3}
              contentContainerStyle={styles.gridContainer}
              keyboardShouldPersistTaps="handled"
              ListEmptyComponent={
                searchMutation.isLoading ? (
                  <Text style={styles.loadingText}>Searching...</Text>
                ) : (
                  <Text style={styles.emptyText}>No Results</Text>
                )
              }
            />
          </View>
        </View>
      </SafeAreaView>
    </LineraBgContainer>
  );
}
