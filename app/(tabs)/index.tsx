import { ScrollView, StyleSheet } from "react-native";
import React, { useCallback, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ScreenWrapper from "@/components/ScreenWrapper";
import Header from "@/components/Header";
import HeadsUp from "@/components/HeadsUp";
import QuickTransaction from "@/components/QuickTransaction";
import { useSQLiteContext } from "expo-sqlite";
import { CategoriesProps } from "@/types";
import { colors } from "@/constants/theme";
import { useFocusEffect } from "expo-router";

const Home = () => {
  const db = useSQLiteContext();

  const [expense, setExpense] = useState<CategoriesProps[]>([]);
  const [income, setIncome] = useState<CategoriesProps[]>([]);

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  async function getData() {
    const result = await db.getAllAsync<CategoriesProps>(
      "SELECT * FROM categories;"
    );
    setExpense(result.filter((item) => item.type === "expense"));
    setIncome(result.filter((item) => item.type === "income"));
  }

  return (
    <GestureHandlerRootView>
      <ScrollView style={{ backgroundColor: colors.bg }}>
        <ScreenWrapper>
          <Header />
          <HeadsUp balance={"1000.00"} />

          {/* Quick Transaction | If Possible - categories with latest transaction */}
          <QuickTransaction outcome={expense} income={income} />

          {/* Lates Transactions */}
        </ScreenWrapper>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default Home;

const styles = StyleSheet.create({});
