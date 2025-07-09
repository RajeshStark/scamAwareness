// VideoModal.tsx
import React from "react";
import { Modal, TouchableOpacity, View, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Video from "react-native-video";
import { createStyles } from "./styles";
import useAppTheme from "../../hooks/useAppTheme";

const VideoModal = ({ url, onClose }) => {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);
  return (
    <Modal visible transparent animationType="slide" onRequestClose={onClose}>
      <TouchableOpacity style={styles.modalCloseIcon} onPress={onClose}>
        <Ionicons name="close" size={28} color="#fff" />
      </TouchableOpacity>
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.modalBackdrop} onPress={onClose} />
        <View style={styles.modalContent}>
          <Video
            source={{ uri: url }}
            style={StyleSheet.absoluteFill}
            controls
            resizeMode="contain"
            paused={false}
            muted={false}
            repeat
          />
        </View>
      </View>
    </Modal>
  );
};

export default VideoModal;
