import { Platform, StyleSheet, Text, TextStyle, View } from "react-native";
import React from "react";
import { colors } from "@/constants/theme";
import { TypoProps } from "@/types";
import { verticalScale } from "@/utils/styling";

const Typo = ({
  centered = false,
  size,
  color = colors.text,
  mono = false,
  fontWeight = "400",
  children,
  style,
  textProps,
}: TypoProps) => {
  const textStyle: TextStyle = {
    fontFamily: mono ? "GeistMono" : "Geist",
    fontSize: size
      ? verticalScale(Platform.OS === "android" ? size - 2 : size)
      : verticalScale(Platform.OS === "android" ? 16 : 18),
    color,
    fontWeight,
    textAlign: centered ? "center" : "left",
  };

  return (
    <Text style={[style, textStyle, styles.moreStyles]} {...textProps}>
      {children}
    </Text>
  );
};

export default Typo;

const styles = StyleSheet.create({
  moreStyles: {},
});
