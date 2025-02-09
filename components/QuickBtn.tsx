import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import Typo from "./Typo";
import { LineChart } from "react-native-gifted-charts";
import { QuickBtnProps } from "@/types";
import { colors, radius } from "@/constants/theme";

// Fetch values from transactions table
const categorieTrxValues = [
  { value: 200 },
  { value: 185 },
  { value: 305 },
  { value: 44 },
  { value: 90 },
  { value: 400 },
];

const QuickBtn = ({ quickT }: QuickBtnProps) => {
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: quickT.color }]}
    >
      <View style={[styles.iconContainer]}>
        <Typo size={20}>{quickT.icon}</Typo>
      </View>
      <View>
        <Typo size={14} fontWeight="600">
          {quickT.name}
        </Typo>
        <Typo size={10} fontWeight={"400"}>
          P 365.00
        </Typo>
      </View>
      <View style={{ position: "absolute", right: 15, top: 20 }}>
        <LineChart
          data={categorieTrxValues}
          curved
          color={"#ffffff8f"}
          hideAxesAndRules
          hideDataPoints
          spacing={4}
          width={60}
          height={20}
        />
      </View>
    </TouchableOpacity>
  );
};

export default QuickBtn;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 14,
    width: (Dimensions.get("screen").width - 46) / 2,
    backgroundColor: colors.tertiary,
    borderRadius: radius._10,
    borderCurve: "continuous",
  },
  iconContainer: {
    width: 40,
    backgroundColor: "#d0d6d18f",
    borderRadius: 30,
    marginRight: 12,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
