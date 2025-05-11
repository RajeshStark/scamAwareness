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
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

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

  const handleClearSearch = (item: string) => {
    // Logic to remove recent search (if connected to backend)
    console.log("Clear", item);
  };

  const renderImage = ({ item }: any) => (
    <Image source={{ uri: item.uri }} style={styles.imageTile} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" />
        <TextInput
          placeholder="Search..."
          value={searchText}
          onChangeText={setSearchText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={styles.input}
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
                <Ionicons name="close" size={18} color="#333" />
              </Pressable>
            </View>
          ))}
        </View>
      )}

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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7ecff",
    paddingHorizontal: 12,
    paddingTop: 60,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e5b6ff",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 12,
  },
  input: {
    marginLeft: 8,
    flex: 1,
    fontSize: 16,
  },
  recentContainer: {
    marginBottom: 20,
  },
  recentHeader: {
    color: "#aaa",
    fontWeight: "bold",
    marginBottom: 8,
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    gap: 8,
  },
  recentText: {
    flex: 1,
    fontSize: 16,
  },
  recommendedText: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 12,
  },
  gridContainer: {
    gap: 6,
  },
  imageTile: {
    width: "30%",
    aspectRatio: 1,
    margin: "1.5%",
    borderRadius: 8,
  },
});
