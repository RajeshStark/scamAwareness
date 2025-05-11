import { View, StyleSheet, TextInput, Pressable, Platform } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import PhoneInput from "react-native-phone-number-input";
import Typography from "../Typography/Typography";
import Fonts from "../../utils/Fonts";
import useAppTheme from "../../hooks/useAppTheme";
import { Controller, Control } from "react-hook-form";

type CustomInputProps = {
  label?: string;
  onChangeText?: (txt: string, type?: string) => void;
  value?: string;
  isHalf?: boolean;
  rightIcon?: React.ReactNode;
  placeholder?: string;
  size?: any;
  isDatePicker?: boolean;
  isPhoneNumber?: boolean;
  onChangeCountry?: (txt: string, type: string) => void;

  name?: string;
  control?: Control<any>;
  error?: any;
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
  control,
  name,
  error,
}: CustomInputProps) {
  console.log({ error });

  const { theme } = useAppTheme();
  const styles = createStyles(theme, isHalf, !!error);
  const [showPicker, setShowPicker] = useState(false);

  const renderInput = (
    fieldValue: string,
    onChange: (val: string) => void,
    onBlur?: () => void
  ) => {
    if (isDatePicker) {
      const handleDateChange = (_: any, selectedDate: Date | undefined) => {
        setShowPicker(false);
        if (selectedDate) {
          onChange(selectedDate.toISOString().split("T")[0]);
        }
      };

      return (
        <Pressable onPress={() => setShowPicker(true)} style={{ flex: 1 }}>
          <Typography
            style={[
              styles.input,
              {
                paddingLeft: 10,
                color: fieldValue ? theme.txtblack : theme.grey,
              },
            ]}
          >
            {fieldValue || placeholder}
          </Typography>
          {showPicker && (
            <DateTimePicker
              value={fieldValue ? new Date(fieldValue) : new Date()}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={handleDateChange}
            />
          )}
        </Pressable>
      );
    }

    if (isPhoneNumber) {
      return (
        <PhoneInput
          defaultValue={fieldValue}
          defaultCode="IN"
          layout="second"
          flagButtonStyle={{
            borderRightColor: theme.txtblack,
            borderRightWidth: 0.4,
          }}
          onChangeText={onChange}
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
      );
    }

    return (
      <TextInput
        placeholder={placeholder}
        value={fieldValue}
        onChangeText={onChange}
        onBlur={onBlur}
        style={[
          styles.input,
          {
            width: size ? size : rightIcon ? "90%" : "100%",
            color: theme.txtblack,
          },
        ]}
        placeholderTextColor={theme.grey}
      />
    );
  };

  return (
    <View style={styles.mainView}>
      {label && <Typography style={styles.label}>{label}</Typography>}
      <View style={[styles.container, { height: isPhoneNumber ? 60 : 50 }]}>
        {control && name ? (
          <Controller
            control={control}
            name={name}
            render={({ field: { value, onChange, onBlur } }) =>
              renderInput(value, onChange, onBlur)
            }
          />
        ) : (
          renderInput(value ?? "", onChangeText || (() => {}))
        )}
        {rightIcon}
      </View>
      {error && (
        <Typography style={styles.errorText}>{error[name]?.message}</Typography>
      )}
    </View>
  );
}

export const createStyles = (
  theme: any,
  isHalf?: boolean,
  hasError?: boolean
) =>
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
    },
    input: {
      borderRadius: 10,
    },
    errorText: {
      marginTop: 4,
      fontSize: 12,
      color: theme.error,
      fontFamily: Fonts.Regular,
    },
  });
