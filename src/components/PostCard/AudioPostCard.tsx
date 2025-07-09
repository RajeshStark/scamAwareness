import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Animated,
  Easing,
  Platform,
} from "react-native";
import SoundPlayer from "react-native-sound-player";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createStyles } from "./styles";
import useAppTheme from "../../hooks/useAppTheme";

const AUDIO_URL =
  "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3";

const AudioPostCard = ({ post }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const waveformAnims = useRef(
    Array.from({ length: 20 }, () => new Animated.Value(1))
  ).current;
  const intervalRef = useRef(null);

  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  useEffect(() => {
    const onFinishedLoading = (meta) => {
      setDuration(meta.duration); // in seconds
    };

    const onFinishedPlaying = () => {
      setIsPlaying(false);
      setPosition(0);
      stopWaveform();
      clearInterval(intervalRef.current);
    };

    SoundPlayer.onFinishedLoading(onFinishedLoading);
    SoundPlayer.onFinishedPlaying(onFinishedPlaying);

    return () => {
      SoundPlayer.stop();
      SoundPlayer.unmount();
      clearInterval(intervalRef.current);
    };
  }, []);

  const animateWaveform = () => {
    waveformAnims.forEach((anim) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: 2,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 1,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });
  };

  const stopWaveform = () => {
    waveformAnims.forEach((anim) => {
      anim.stopAnimation();
      anim.setValue(1);
    });
  };

  const toggleAudio = async () => {
    if (!isPlaying) {
      try {
        if (post?.url) {
          SoundPlayer.playUrl(post.url);
        }
        animateWaveform();
        setIsPlaying(true);
        startProgressUpdater();
      } catch (e) {
        console.log("Cannot play the sound file", e);
      }
    } else {
      SoundPlayer.pause();
      stopWaveform();
      setIsPlaying(false);
      clearInterval(intervalRef.current);
    }
  };

  const startProgressUpdater = () => {
    intervalRef.current = setInterval(async () => {
      try {
        const info = await SoundPlayer.getInfo(); // {currentTime, duration}
        setPosition(info.currentTime);
        setDuration(info.duration);
      } catch (e) {
        console.log("Error getting audio info", e);
      }
    }, 500);
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds === undefined || seconds === null) {
      return "0:00"; // fallback
    }

    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <View style={styles.audioContainer}>
      <TouchableOpacity onPress={toggleAudio} style={styles.audioPlayIcon}>
        <Ionicons name={isPlaying ? "pause" : "play"} size={20} color="#fff" />
      </TouchableOpacity>
      <View style={styles.audioWaveform}>
        {waveformAnims.map((anim, index) => (
          <Animated.View
            key={index}
            style={[styles.audioLine, { transform: [{ scaleY: anim }] }]}
          />
        ))}
      </View>
      <Text style={styles.audioDuration}>
        {formatTime(position)} / {formatTime(duration)}
      </Text>
    </View>
  );
};

export default AudioPostCard;
