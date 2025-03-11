import { ScrollView, StyleSheet } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSQLiteContext } from "expo-sqlite";
import { useFocusEffect } from "expo-router";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { eq, sum } from "drizzle-orm";
import * as schema from "@/db/schema";

import ScreenWrapper from "@/components/ScreenWrapper";
import Header from "@/components/Header";
import HeadsUp from "@/components/HeadsUp";
import QuickTransaction from "@/components/QuickTransaction";

import { CategoriesProps } from "@/types";
import { colors } from "@/constants/theme";

const Home = () => {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });
  const [expense, setExpense] = useState<CategoriesProps[]>([]);
  const [income, setIncome] = useState<CategoriesProps[]>([]);
  const [totalAccountBalance, setTotalAccountBalance] = useState<number>(0);

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  // useEffect(() => {
  //   const tableDelete = async () => {
  //     await drizzleDb.delete(schema.accounts);
  //     await drizzleDb.delete(schema.categories);
  //     await drizzleDb.delete(schema.transactions);
  //   };

  //   tableDelete();
  // }, []);

  async function getData() {
    const expensesResult = await drizzleDb
      .select()
      .from(schema.categories)
      .where(eq(schema.categories.type, "expense"));
    const incomeResult = await drizzleDb
      .select()
      .from(schema.categories)
      .where(eq(schema.categories.type, "income"));

    const totalAccountBalance = await drizzleDb
      .select({
        count: sum(schema.accounts.balance),
      })
      .from(schema.accounts);

    // console.log(expensesResult);
    setTotalAccountBalance(Number(totalAccountBalance[0].count));
    setExpense(expensesResult);
    setIncome(incomeResult);
  }

  return (
    <GestureHandlerRootView>
      <ScrollView
        style={{ backgroundColor: colors.bg }}
        showsVerticalScrollIndicator={false}
      >
        <ScreenWrapper>
          <Header />
          <HeadsUp balance={totalAccountBalance} />
          {/* Quick Transaction | If Possible - categories with latest transaction */}
          <QuickTransaction outcome={expense} income={income} />

          {/* Recent Transactions */}
        </ScreenWrapper>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default Home;

const styles = StyleSheet.create({});
