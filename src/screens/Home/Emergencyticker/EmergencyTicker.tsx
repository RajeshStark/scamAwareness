import React, { useEffect } from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  runOnJS,
} from "react-native-reanimated";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const TICKER_HEIGHT = 28;
const SCROLL_DURATION = 6000;

const EmergencyTicker = () => {
  const translateX = useSharedValue(0);

  const baseMessage = "EMERGENCY /";
  const repeatedMessage = Array(30).fill(baseMessage).join(" ");

  useEffect(() => {
    const scrollWidth = SCREEN_WIDTH * 2; // message width
    const animate = () => {
      translateX.value = withTiming(
        -SCREEN_WIDTH,
        {
          duration: SCROLL_DURATION,
        },
        () => {
          // When done, reset and start again
          translateX.value = 0;
          runOnJS(animate)();
        }
      );
    };
    animate();
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.tickerContainer}>
        <Animated.View style={[styles.row, animatedStyle]}>
          <Text style={styles.text}>{repeatedMessage}</Text>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tickerContainer: {
    height: TICKER_HEIGHT,
    backgroundColor: "#FFC001",
    overflow: "hidden",
    marginTop: -1,
  },
  row: {
    flexDirection: "row",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    paddingHorizontal: 20,
    letterSpacing: 2,
    lineHeight: 24,
  },
});

export default EmergencyTicker;
