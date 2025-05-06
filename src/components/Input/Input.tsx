import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import Typography from "../Typography/Typography";
import Fonts from "../../utils/Fonts";
import useAppTheme from "../../hooks/useAppTheme";
import { width } from "../../utils/Dimensions";

type CustomInputProps = {
  label?: string;
  onChangeText: (txt: string) => void;
  isDisabled?: boolean;
  value: string;
  isHalf?: boolean;
  rightIcon?: React.ReactNode;
  placeholder?: string;
  size?: any;
};

export default function CustomInput({
  label,
  onChangeText,
  isDisabled,
  value,
  isHalf,
  rightIcon,
  placeholder,
  size,
}: CustomInputProps) {
  const { theme } = useAppTheme();
  const styles = createStyles(theme, isHalf);
  return (
    <View style={styles.mainView}>
      {label && <Typography style={styles.label}>{label}</Typography>}
      <View style={styles.container}>
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          style={[
            styles.input,
            { width: size ? size : rightIcon ? "90%" : "100%" },
          ]}
          placeholderTextColor={theme.grey}
        />
        {rightIcon ?? rightIcon}
      </View>
    </View>
  );
}

export const createStyles = (theme: Theme, isHalf) =>
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
      width: isHalf ? "45%" : "100%",
      backgroundColor: theme.white,
      height: 50,
    },
    input: {
      borderRadius: 10,
    },
  });
