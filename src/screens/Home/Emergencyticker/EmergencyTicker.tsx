import React, { useEffect, useRef, useState } from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
} from "react-native-reanimated";

const TICKER_HEIGHT = 28;
const SCROLL_DURATION = 5000;

const EmergencyTicker = () => {
  const translateX = useSharedValue(0);
  const [textWidth, setTextWidth] = useState(0);

  const baseMessage = "EMERGENCY /";
  const repeatedMessage = new Array(20).fill(baseMessage).join(" ");
  const textRef = useRef(null);

  useEffect(() => {
    if (textWidth > 0) {
      translateX.value = withRepeat(
        withTiming(-textWidth, { duration: SCROLL_DURATION }),
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
            onLayout={(e) => setTextWidth(e.nativeEvent.layout.width)}
            ref={textRef}
            style={styles.text}
          >
            {repeatedMessage + " " + repeatedMessage + " " + repeatedMessage}
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
    whiteSpace: "nowrap",
  },
});

export default EmergencyTicker;
