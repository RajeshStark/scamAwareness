import React, { useState } from "react";
import { Animated as RNAnimated, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch } from "react-redux";
import Container from "../../components/Container/Container";
import LineraBgContainer from "../../components/Container/LineraBgContainer";
import PostCard from "../../components/PostCard/PostCard";
import { dummyPosts } from "../../dummydata/Dummydata";
import useAppTheme from "../../hooks/useAppTheme";
import EmergencyTicker from "./Emergencyticker/EmergencyTicker";
import { createStyles } from "./styles";

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  const [fabOpen, setFabOpen] = useState(false);
  const fadeAnim = useState(new RNAnimated.Value(0))[0];
  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  const toggleFab = () => {
    setFabOpen(!fabOpen);
    RNAnimated.timing(fadeAnim, {
      toValue: fabOpen ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={{ flex: 1 }}>
      <Container withScroll>
        <EmergencyTicker />
        <LineraBgContainer>
          <View style={styles.mainContainer}>
            {dummyPosts.map((post, index) => (
              <PostCard key={index} {...post} />
            ))}
          </View>
        </LineraBgContainer>
      </Container>
      <View style={styles.fabWrapper}>
        {[
          { icon: "folder-outline", onPress: () => console.log("Image") },
          { icon: "pencil", onPress: () => console.log("Edit") },
          { icon: "image-sharp", onPress: () => console.log("Add Folder") },
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
          onPress={toggleFab}
        >
          <Ionicons name={fabOpen ? "close" : "add"} size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
