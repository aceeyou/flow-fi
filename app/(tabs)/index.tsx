import { ScrollView } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSQLiteContext } from "expo-sqlite";
import { useFocusEffect } from "expo-router";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { eq, or, sum } from "drizzle-orm";
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

  // Change this to insert Cash Account from the first initiation of the app only
  useEffect(() => {
    async function getCash() {
      const result = await drizzleDb
        .select()
        .from(schema.accounts)
        .where(
          or(
            eq(schema.accounts.account_name, "cash"),
            eq(schema.accounts.account_name, "Cash")
          )
        );
      if (result.length === 0) {
        await drizzleDb.insert(schema.accounts).values({
          account_name: "Cash",
          isImage: 0,
          icon: "💵",
          color: "#09C2A0",
        });
      }
    }
    getCash();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [db])
  );

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
    setTotalAccountBalance(Number(totalAccountBalance[0].count));
    setExpense([
      ...expensesResult,
      {
        id: 0,
        category_name: "add_another_category",
        icon: "",
        color: "",
        type: "expense",
      },
    ]);
    setIncome([
      ...incomeResult,
      {
        id: 0,
        category_name: "add_another_category",
        icon: "",
        color: "",
        type: "income",
      },
    ]);
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
