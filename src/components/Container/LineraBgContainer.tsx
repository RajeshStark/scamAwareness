import { ImageBackground, StyleSheet } from "react-native";
import React from "react";
import useAppTheme from "../../hooks/useAppTheme";
import { Images } from "../../utils/Images";

type Props = {
  children: React.ReactNode;
  reverse?: boolean;
};

export default function LineraBgContainer({ children, reverse }: Props) {
  const { isDark } = useAppTheme();
  console.log({ isDark });

  return (
    <ImageBackground
      source={isDark ? Images.darkBg : Images.whiteBg}
      style={styles.background}
      resizeMode="cover"
      imageStyle={{
        transform: [{ scaleY: reverse ? -1 : 1 }],
      }}
    >
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});
