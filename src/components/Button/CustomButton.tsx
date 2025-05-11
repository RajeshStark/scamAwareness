import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Typography from "../Typography/Typography.tsx";
import useAppTheme from "../../hooks/useAppTheme";
import Fonts from "../../utils/Fonts.tsx";
import { width } from "../../utils/Dimensions.tsx";

export type CustomButtonProps = {
  title: string;
  onPress: () => void;
  isDisabled?: boolean;
  isLoading?: boolean;
  isHalf?: boolean;
  isText?: boolean;
  isLinear?: boolean;
  buttonStyle?: any;
};

export default function CustomButton({
  title,
  onPress,
  isDisabled = false,
  isLoading = false,
  isHalf = false,
  isText = false,
  isLinear = false,
  buttonStyle,
}: CustomButtonProps) {
  const { theme } = useAppTheme();
  const styles = createStyles(theme, isHalf);

  const renderContent = () =>
    isLoading ? (
      <ActivityIndicator size="small" />
    ) : (
      <View style={[styles.row]}>
        <Typography
          fontType="bold"
          style={[styles.txt, { color: theme.white }]}
        >
          {title}
        </Typography>
      </View>
    );

  return (
    <TouchableOpacity
      onPress={!isDisabled && !isLoading ? onPress : undefined}
      disabled={isDisabled || isLoading}
      style={[{ borderRadius: 15 }, styles.btnContainer]}
    >
      {isLinear && !isDisabled ? (
        <LinearGradient
          colors={[theme.gradient1, theme.gradient2]}
          style={[buttonStyle, styles.btnContainer]}
        >
          {renderContent()}
        </LinearGradient>
      ) : (
        <View style={[buttonStyle, styles.btnContainer1]}>
          {renderContent()}
        </View>
      )}
    </TouchableOpacity>
  );
}

export const createStyles = (theme: Theme, isHalf) =>
  StyleSheet.create({
    btnContainer: {
      width: isHalf ? "45%" : "95%",
      borderRadius: 10,
      margin: 10,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
    },

    btnContainer1: {
      width: isHalf ? "45%" : "95%",
      borderRadius: 15,
      margin: 10,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.disable,
    },
    row: { flexDirection: "row" },
    txt: {
      fontFamily: Fonts.Bold,
    },
  });
