import React, { useEffect, useRef, useState } from "react";
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
  const message = "₹31 lakh Telegram job scam  | ";
  const [messageWidth, setMessageWidth] = useState(0);
  const translateX = useSharedValue(0);

  useEffect(() => {
    if (messageWidth > 0) {
      translateX.value = withRepeat(
        withTiming(-messageWidth, {
          duration: SCROLL_DURATION,
        }),
        -1,
        false
      );
    }
  }, [messageWidth]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.tickerContainer}>
        {/* Actual scrolling ticker */}
        <Animated.View style={[styles.row, animatedStyle]}>
          <Text style={styles.tickerText}>{message}</Text>
          <Text style={styles.tickerText}>{message}</Text>
        </Animated.View>

        {/* Hidden measurement view */}
        <Text
          style={[styles.tickerText, styles.measurementText]}
          onLayout={(e) => {
            setMessageWidth(e.nativeEvent.layout.width);
          }}
        >
          {message}
        </Text>
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
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  tickerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    letterSpacing: 2,
    fontStyle: "italic",
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  measurementText: {
    position: "absolute",
    opacity: 0,
    zIndex: -1,
  },
});

export default EmergencyTicker;
