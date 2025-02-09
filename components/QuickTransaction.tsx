import { StyleSheet, View } from "react-native";
import React from "react";
import Typo from "./Typo";
import { QuickTransactionListProps } from "@/types";
import QuickBtn from "./QuickBtn";

const QuickTransaction = ({ outcome, income }: QuickTransactionListProps) => {
  return (
    <View style={[styles.container]}>
      <Typo size={14}>Expense</Typo>
      <View style={[styles.trxContainer]}>
        {outcome.map((item) => (
          <QuickBtn key={item.id} quickT={item} />
        ))}
      </View>
      <Typo size={14}>Income</Typo>
      <View style={[styles.trxContainer]}>
        {income.map((item) => (
          <QuickBtn key={item.id} quickT={item} />
        ))}
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
});
