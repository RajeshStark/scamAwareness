import React from "react";
import {
  ActivityIndicator,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Typography from "../Typography/Typography.tsx";
import useAppTheme from "../../hooks/useAppTheme";

export type CustomButtonProps = {
  title: string;
  onPress: () => void;
  isDisabled?: boolean;
  isLoading?: boolean;
  isHalf?: boolean;
  isText?: boolean;
  isLinear?: boolean;
  buttonStyle: any;
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

  const renderContent = () =>
    isLoading ? (
      <ActivityIndicator size="small" />
    ) : (
      <View style={[{ flexDirection: "row" }]}>
        <Typography fontType="bold">{title}</Typography>
      </View>
    );

  return (
    <TouchableOpacity
      onPress={!isDisabled && !isLoading ? onPress : undefined}
      disabled={isDisabled || isLoading}
      style={[{ borderRadius: 15 }]}
    >
      {isLinear && !isDisabled ? (
        <LinearGradient
          colors={[theme.gradient1, theme.gradient2]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={buttonStyle}
        >
          {renderContent()}
        </LinearGradient>
      ) : (
        <View style={buttonStyle}>{renderContent()}</View>
      )}
    </TouchableOpacity>
  );
}
