import {
  Dimensions,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Typo from "./Typo";
import { LineChart } from "react-native-gifted-charts";
import { QuickBtnProps } from "@/types";
import { colors, radius } from "@/constants/theme";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";

// Fetch values from transactions table
const categorieTrxValues = [
  { value: 200 },
  { value: 185 },
  { value: 305 },
  { value: 44 },
  { value: 90 },
  { value: 400 },
];

const QuickBtn = ({
  quickT,
  fullWidth = false,
  transaction = false,
}: QuickBtnProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: quickT.color,
          width: fullWidth ? "100%" : (Dimensions.get("screen").width - 38) / 2,
        },
      ]}
      activeOpacity={0.5}
      onPress={() =>
        !transaction &&
        router.navigate(`/createtransaction?category_id=${quickT.id}`)
      }
    >
      <View style={[styles.iconContainer]}>
        <Typo size={20}>{quickT.icon}</Typo>
      </View>
      <View>
        <Typo size={14} fontWeight="600">
          {quickT.category_name}
        </Typo>
        <Typo size={transaction ? 12 : 10} fontWeight={"400"}>
          {transaction
            ? quickT.type.charAt(0).toUpperCase() + quickT.type.slice(1)
            : "P 365.00"}
        </Typo>
      </View>
      <View style={{ position: "absolute", right: 15, top: 20 }}>
        {fullWidth ? (
          transaction ? (
            ""
          ) : (
            <View>
              <TouchableOpacity
                style={styles.editBtn}
                hitSlop={25}
                onPress={() =>
                  router.push(`/createcategory?id=${quickT.id}&editMode=${1}`)
                }
              >
                <MaterialCommunityIcons
                  name="dots-horizontal-circle-outline"
                  size={24}
                  color={colors.neutral100}
                />
              </TouchableOpacity>
            </View>
          )
        ) : (
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
        )}
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
  editBtn: {
    borderRadius: 100,
    padding: 1,
    // backgroundColor: colors.icon_bg,
  },
});
