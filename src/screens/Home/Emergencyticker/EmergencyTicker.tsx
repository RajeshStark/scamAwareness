import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
} from "react-native-reanimated";

const TICKER_HEIGHT = 28;
const SCROLL_DURATION = 10000;

const EmergencyTicker = () => {
  const translateX = useSharedValue(0);
  const [textWidth, setTextWidth] = useState(0);

  const message = "  🚨 EMERGENCY / This is an emergency message sample ";
  const fullMessage = message + message;

  useEffect(() => {
    if (textWidth > 0) {
      translateX.value = withRepeat(
        withTiming(-textWidth, {
          duration: SCROLL_DURATION,
        }),
        -1,
        false
      );
    }
  }, [textWidth]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.tickerContainer}>
        <Animated.View style={[styles.row, animatedStyle]}>
          <Text
            style={styles.text}
            onLayout={(e) => setTextWidth(e.nativeEvent.layout.width)}
          >
            {fullMessage}
          </Text>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: TICKER_HEIGHT,
  },
  tickerContainer: {
    height: TICKER_HEIGHT,
    backgroundColor: "#FFC001",
    overflow: "hidden",
    marginTop: -1,
    justifyContent: "center",
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
    fontStyle: "italic",
  },
});

export default EmergencyTicker;
