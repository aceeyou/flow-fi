import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Typo from "@/components/Typo";
import ScreenWrapper from "@/components/ScreenWrapper";
import { colors } from "@/constants/theme";

const Accounts = () => {
  return (
    <View style={[styles.container]}>
      <Typo>accounts</Typo>
    </View>
  );
};

export default Accounts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
});
