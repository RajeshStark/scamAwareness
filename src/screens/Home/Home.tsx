import { View, Text } from "react-native";
import React from "react";
import CustomButton from "../../components/Button/CustomButton";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/features/login/loginSlice";

export default function Home() {
  const dispatch = useDispatch();
  return (
    <View>
      <CustomButton title="Logout" onPress={() => dispatch(logOut())} />
    </View>
  );
}
