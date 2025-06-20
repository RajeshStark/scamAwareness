import { View, Text } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import useAppTheme from "../../../hooks/useAppTheme";
import Typography from "../../Typography/Typography";
import { useNavigation } from "@react-navigation/native";
import Fonts from "../../../utils/Fonts";

type props = {
  canGoback?: boolean;
  title?: string;
  style?: any;
  right?: React.ReactNode;
  color?: string;
};
export default function CustomHeader({
  canGoback,
  title,
  style,
  right,
  color,
}: props) {
  const { theme } = useAppTheme();
  const navigation = useNavigation();
  return (
    <View style={[{ flexDirection: "row", alignSelf: "flex-start" }, style]}>
      <View style={{ flexDirection: "row", alignSelf: "flex-start" }}>
        {canGoback && (
          <Ionicons
            name="arrow-back-outline"
            size={20}
            color={color ? color : theme.txtblack}
            style={{ alignSelf: "flex-start" }}
            onPress={() => navigation.goBack()}
          />
        )}
        {title && (
          <Typography style={{ marginLeft: 20, fontFamily: Fonts.Medium }}>
            {title}
          </Typography>
        )}
      </View>
      {right ?? right}
    </View>
  );
}
