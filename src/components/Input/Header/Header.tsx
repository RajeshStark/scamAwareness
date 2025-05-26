import { View, Text } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import useAppTheme from "../../../hooks/useAppTheme";
import Typography from "../../Typography/Typography";
import { useNavigation } from "@react-navigation/native";

type props = {
  canGoback?: boolean;
  title?: string;
  style?: any;
  right?: React.ReactNode;
};
export default function CustomHeader({
  canGoback,
  title,
  style,
  right,
}: props) {
  const { theme } = useAppTheme();
  const navigation = useNavigation();
  return (
    <View style={[{ flexDirection: "row", alignSelf: "flex-start" }, style]}>
      <View>
        {canGoback && (
          <Ionicons
            name="arrow-back-outline"
            size={20}
            color={theme.txtblack}
            style={{ alignSelf: "flex-start" }}
            onPress={() => navigation.goBack()}
          />
        )}
        {title && <Typography>{title}</Typography>}
      </View>
      {right ?? right}
    </View>
  );
}
