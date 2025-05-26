import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Keyboard,
  SafeAreaView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import LineraBgContainer from "../../components/Container/LineraBgContainer";
import useAppTheme from "../../hooks/useAppTheme";
import { width } from "../../utils/Dimensions";
import Fonts from "../../utils/Fonts";

const recentSearches = ["Oregon Trail", "Slickrock Bike Trail", "Vermont"];
const recommendedImages = [
  {
    id: 1,
    uri: "https://www.cats.org.uk/media/13136/220325case013.jpg?width=500&height=333.49609375",
  },
  {
    id: 2,
    uri: "https://www.cats.org.uk/media/13136/220325case013.jpg?width=500&height=333.49609375",
  },
  {
    id: 3,
    uri: "https://www.cats.org.uk/media/13136/220325case013.jpg?width=500&height=333.49609375",
  },
  {
    id: 4,
    uri: "https://www.cats.org.uk/media/13136/220325case013.jpg?width=500&height=333.49609375",
  },
  {
    id: 5,
    uri: "https://www.cats.org.uk/media/13136/220325case013.jpg?width=500&height=333.49609375",
  },
  {
    id: 6,
    uri: "https://www.cats.org.uk/media/13136/220325case013.jpg?width=500&height=333.49609375",
  },
  {
    id: 7,
    uri: "https://www.cats.org.uk/media/13136/220325case013.jpg?width=500&height=333.49609375",
  },
  {
    id: 8,
    uri: "https://www.cats.org.uk/media/13136/220325case013.jpg?width=500&height=333.49609375",
  },
  {
    id: 9,
    uri: "https://www.cats.org.uk/media/13136/220325case013.jpg?width=500&height=333.49609375",
  },
];

export default function SearchScreen() {
  const [searchText, setSearchText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  const handleClearSearch = (item: string) => {
    console.log("Clear", item);
  };

  const renderImage = ({ item }: any) => (
    <Image source={{ uri: item.uri }} style={styles.imageTile} />
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
              style={styles.input}
            />
            <View
              style={{ width: 1.5, height: 30, backgroundColor: theme.grey }}
            />
            <Ionicons
              name="search"
              size={20}
              color={theme.txtblack}
              style={{ marginLeft: 10 }}
            />
          </View>

          {isFocused && (
            <View style={styles.recentContainer}>
              <Text style={styles.recentHeader}>Recent searches</Text>
              {recentSearches.map((item) => (
                <View key={item} style={styles.recentItem}>
                  <Ionicons name="search" size={16} color="#666" />
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
            <Text style={styles.recommendedText}>Recommended For You</Text>
            <FlatList
              data={recommendedImages}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderImage}
              numColumns={3}
              contentContainerStyle={styles.gridContainer}
              keyboardShouldPersistTaps="handled"
            />
          </View>
        </View>
      </SafeAreaView>
    </LineraBgContainer>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    flex: { flex: 1 },
    container: {
      flex: 1,
      paddingTop: 10,
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.white,
      borderRadius: 40,
      paddingHorizontal: 15,
      paddingVertical: 5,
      marginBottom: 12,
      marginHorizontal: 12,
    },
    input: {
      marginLeft: 8,
      flex: 1,
      fontSize: 16,
    },
    recentContainer: {
      marginBottom: 20,
      backgroundColor: theme.white,
      width: width,
      padding: 12,
    },
    recentHeader: {
      color: "#aaa",
      fontWeight: "bold",
      marginTop: 8,
      marginBottom: 20,
    },
    recentItem: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 12,
      gap: 8,
    },
    recentText: {
      flex: 1,
      fontSize: 16,
      color: theme.txtblack,
      fontFamily: Fonts.Medium,
    },
    recommendedText: {
      fontSize: 12,
      color: theme.white,
      marginVertical: 12,
      fontFamily: Fonts.Medium,
    },
    gridContainer: {
      gap: 6,
    },
    imageTile: {
      width: "32%",
      aspectRatio: 1,
      margin: 3,
      borderRadius: 8,
    },
  });
