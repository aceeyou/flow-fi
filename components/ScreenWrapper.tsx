import { Dimensions, Platform, StyleSheet, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { ScreenWrapperProps } from "@/types";
import { colors } from "@/constants/theme";

const { height } = Dimensions.get("window");

const ScreenWrapper = ({
  centered = false,
  modal = false,
  style,
  children,
}: ScreenWrapperProps) => {
  let paddingTop = Platform.OS === "ios" ? height * 0.06 : 50;
  paddingTop =
    modal && Platform.OS === "android" ? 50 : modal ? 25 : height * 0.06;
  return (
    <View
      style={[
        { paddingTop, flex: 1, backgroundColor: colors.bg },
        centered && {
          alignItems: "center",
          shadowRadius: 2,
        },
        style,
      ]}
    >
      <StatusBar style={"light"} />
      {children}
    </View>
  );
};

export default ScreenWrapper;

const styles = StyleSheet.create({});
