import { View, Text } from "react-native";
import React from "react";
import CustomButton from "../../components/Button/CustomButton";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/features/login/loginSlice";
import Container from "../../components/Container/Container";
import PostCard from "../../components/PostCard/PostCard";
const dummyPosts = [
  {
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    username: "Sam Guy",
    handle: "samguy",
    caption: "Explore The Seas",
    imageUrl: "https://i.imgur.com/5A1ktU4.jpg",
    comments: 32,
    likes: 110,
    shares: 96,
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    username: "Anna D",
    handle: "annad",
    caption: "Morning coffee is love.",
    imageUrl: "https://i.imgur.com/ehW0Fsa.jpg",
    comments: 21,
    likes: 83,
    shares: 14,
  },
];

export default function Home({ navigation }) {
  const dispatch = useDispatch();

  const logingOut = () => {
    dispatch(logOut());
    navigation.reset({
      index: 0,
      routes: [{ name: "LandingPage" }],
    });
  };
  return (
    <Container>
      <CustomButton title="Logout" onPress={() => logingOut()} />
      {/* <ScrollView> */}
      {dummyPosts.map((post, index) => (
        <PostCard key={index} {...post} />
      ))}
      {/* </ScrollView> */}
    </Container>
  );
}
