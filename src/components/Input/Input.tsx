import { View, StyleSheet, TextInput, Pressable, Platform } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import PhoneInput from "react-native-phone-number-input";
import Typography from "../Typography/Typography";
import Fonts from "../../utils/Fonts";
import useAppTheme from "../../hooks/useAppTheme";

type CustomInputProps = {
  label?: string;
  onChangeText: (txt: string, type: string) => void;
  value: string;
  isHalf?: boolean;
  rightIcon?: React.ReactNode;
  placeholder?: string;
  size?: any;
  isDatePicker?: boolean;
  isPhoneNumber?: boolean;
  onChangeCountry?: (txt: string, type: string) => void;
};

export default function CustomInput({
  label,
  onChangeText,
  value,
  isHalf,
  rightIcon,
  placeholder,
  size,
  isDatePicker,
  isPhoneNumber,
  onChangeCountry,
}: CustomInputProps) {
  const { theme } = useAppTheme();
  const styles = createStyles(theme, isHalf);

  const [showPicker, setShowPicker] = useState(false);

  const onDateChange = (_: any, selectedDate: Date | undefined) => {
    setShowPicker(false);
    if (selectedDate) {
      onChangeText(selectedDate.toISOString().split("T")[0]); // format: YYYY-MM-DD
    }
  };

  return (
    <View style={styles.mainView}>
      {label && <Typography style={styles.label}>{label}</Typography>}
      <View style={[styles.container, { height: isPhoneNumber ? 60 : 50 }]}>
        {isDatePicker ? (
          <Pressable onPress={() => setShowPicker(true)} style={{ flex: 1 }}>
            <Typography
              style={[
                styles.input,
                { paddingLeft: 10, color: value ? theme.txtblack : theme.grey },
              ]}
            >
              {value || placeholder}
            </Typography>
            {showPicker && (
              <DateTimePicker
                value={value ? new Date(value) : new Date()}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={onDateChange}
              />
            )}
          </Pressable>
        ) : isPhoneNumber ? (
          <PhoneInput
            defaultValue={value}
            defaultCode="IN"
            layout="second"
            flagButtonStyle={{
              borderRightColor: theme.txtblack,
              borderRightWidth: 0.4,
            }}
            onChangeText={onChangeText}
            onChangeCountry={onChangeCountry}
            containerStyle={[
              styles.input,
              {
                width: size ? size : rightIcon ? "90%" : "100%",
              },
            ]}
            textContainerStyle={{
              backgroundColor: theme.white,
              borderRadius: 10,
            }}
            textInputStyle={{ color: theme.txtblack }}
            codeTextStyle={{
              color: theme.txtblack,
              marginVertical: 10,
            }}
            placeholder={placeholder}
          />
        ) : (
          <TextInput
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            style={[
              styles.input,
              {
                width: size ? size : rightIcon ? "90%" : "100%",
                color: theme.txtblack,
              },
            ]}
            placeholderTextColor={theme.grey}
          />
        )}
        {rightIcon ?? rightIcon}
      </View>
    </View>
  );
}

export const createStyles = (theme: Theme, isHalf: boolean) =>
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
