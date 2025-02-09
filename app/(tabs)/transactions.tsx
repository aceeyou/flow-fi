import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "@/constants/theme";
import Typo from "@/components/Typo";

const Transactions = () => {
  return (
    <View style={[styles.container]}>
      <Typo>Transactions</Typo>
    </View>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
});
