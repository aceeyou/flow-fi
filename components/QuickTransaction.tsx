import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import Typo from "./Typo";
import { QuickTransactionListProps } from "@/types";
import QuickBtn from "./QuickBtn";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { radius } from "@/constants/theme";
import { router } from "expo-router";

const QuickTransaction = ({ outcome, income }: QuickTransactionListProps) => {
  return (
    <View style={[styles.container]}>
      <Typo size={14}>Expense</Typo>
      <View style={[styles.trxContainer]}>
        {outcome.length > 0 ? (
          outcome.map((item) => <QuickBtn key={item.id} quickT={item} />)
        ) : (
          <TouchableOpacity
            style={[styles.createCategoryBtn]}
            onPress={() =>
              router.navigate("/createcategory?categoryType=expense")
            }
          >
            <View style={[styles.iconContainer]}>
              <MaterialIcons name="add" size={20} color="white" />
            </View>
            <Typo size={16}>Create an expense category</Typo>
          </TouchableOpacity>
        )}
      </View>
      <Typo size={14}>Income</Typo>
      <View style={[styles.trxContainer]}>
        {income.length > 0 ? (
          income.map((item) => <QuickBtn key={item.id} quickT={item} />)
        ) : (
          <TouchableOpacity
            style={[styles.createCategoryBtn]}
            onPress={() =>
              router.navigate("/createcategory?categoryType=income")
            }
          >
            <View style={[styles.iconContainer]}>
              <MaterialIcons name="add" size={20} color="white" />
            </View>
            <Typo size={16}>Create an income category</Typo>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default QuickTransaction;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  trxContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 10,
    marginBottom: 20,
  },
  createCategoryBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: radius._10,
    opacity: 0.3,
  },
  iconContainer: {
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: radius._3,
    width: 25,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
