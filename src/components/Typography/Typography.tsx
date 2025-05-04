import React from "react";
import { Text as RNText, StyleSheet, TextProps } from "react-native";
import Fonts from "../../utils/Fonts";
import { LightColors } from "../../utils/Colors";
import useAppTheme from "../../hooks/useAppTheme";

type FontType = "regular" | "bold" | "medium";
//   | "italic"
//   | "bolditalic"
//   | "mediumitalic";

export interface TypographyProps extends TextProps {
  fontType?: FontType;
}

const fontTypeMap: Record<FontType, string> = {
  regular: Fonts.Regular,
  bold: Fonts.Bold,
  medium: Fonts.Medium,
  //   italic: Fonts.Italic,
  //   bolditalic: Fonts.BoldItalic,
  //   mediumitalic: Fonts.MediumItalic,
};

const Typography: React.FC<TypographyProps> = ({
  style,
  fontType = "regular",
  ...otherProps
}) => {
  const fontFamily = fontTypeMap[fontType];
  const { theme } = useAppTheme();

  return (
    <RNText
      style={[styles.defaultText, { fontFamily, color: theme.txtblack }, style]}
      {...otherProps}
    />
  );
};

const styles = StyleSheet.create({
  defaultText: {
    color: LightColors.txtblack,
  },
});

export default Typography;
