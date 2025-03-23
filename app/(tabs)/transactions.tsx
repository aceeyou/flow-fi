import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { colors, radius } from "@/constants/theme";
import Typo from "@/components/Typo";
import { useSQLiteContext } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import * as schema from "@/db/schema";
import { TransactionProps } from "@/types";
import { asc, desc, eq } from "drizzle-orm";
import { FlashList } from "@shopify/flash-list";
import Transaction from "@/components/Transaction";

const Transactions = () => {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });

  const [transactions, setTransactions] = useState<TransactionProps[]>([]);

  useEffect(() => {
    getAllTransactions();
  }, []);

  const getAllTransactions = async () => {
    try {
      const result = await drizzleDb
        .select()
        .from(schema.transactions)
        .orderBy(desc(schema.transactions.created_at));
      setTransactions([...result]);
    } catch (error) {
      console.log("transaction page error: ", error);
    }
  };

  return (
    <View style={[styles.container, { padding: 20 }]}>
      <FlashList
        data={transactions}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={20}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        renderItem={({ item }) => <Transaction data={item} />}
      />
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
