import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import Typography from "../Typography/Typography";
import Fonts from "../../utils/Fonts";
import useAppTheme from "../../hooks/useAppTheme";

type CustomInputProps = {
  label?: string;
  onChangeText: (txt: string) => void;
  isDisabled?: boolean;
  value: string;
  isHalf?: boolean;
  rightIcon?: React.ReactNode;
  placeholder?: string;
};

export default function CustomInput({
  label,
  onChangeText,
  isDisabled,
  value,
  isHalf,
  rightIcon,
  placeholder,
}: CustomInputProps) {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);
  return (
    <View style={styles.mainView}>
      {label && <Typography style={styles.label}>{label}</Typography>}
      <View style={styles.container}>
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
        />
        {rightIcon ?? rightIcon}
      </View>
    </View>
  );
}

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    mainView: {
      width: "90%",
      marginVertical: 5,
    },
    label: {
      fontSize: 12,
      fontFamily: Fonts.Medium,
      color: theme.grey,
      marginBottom: 3,
    },
    container: {
      borderRadius: 10,
      borderColor: theme.grey,
      borderWidth: 0.2,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  });
