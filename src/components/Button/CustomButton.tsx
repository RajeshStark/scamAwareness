import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import useAppTheme from "../../hooks/useAppTheme";
import Fonts from "../../utils/Fonts.tsx";
import Typography from "../Typography/Typography.tsx";

export type CustomButtonProps = {
  title: string;
  onPress: () => void;
  isDisabled?: boolean;
  isLoading?: boolean;
  isHalf?: boolean;
  isText?: boolean;
  isLinear?: boolean;
  buttonStyle?: any;
  width?: number;
  nomargin?: boolean;
  borderRadius?: number;
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
  width,
  nomargin,
  borderRadius,
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
      style={[
        {
          borderRadius: borderRadius ? borderRadius : 15,
          width: width ? width : isHalf ? "45%" : "95%",
          margin: nomargin ? 0 : 10,
        },
        styles.btnContainer,
      ]}
    >
      {isLinear && !isDisabled ? (
        <LinearGradient
          colors={[theme.gradient1, theme.gradient2]}
          style={[
            buttonStyle,
            styles.btnContainer,
            {
              borderRadius: borderRadius ? borderRadius : 15,
              width: width ? width : isHalf ? "45%" : "95%",
              margin: nomargin ? 0 : 10,
            },
          ]}
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
      borderRadius: 10,
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
