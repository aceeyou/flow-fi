import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    getAllTransactions();
    console.log("isRefreshing: ", isRefreshing);
    console.log("hasMore: ", hasMore);
  }, []);

  const getAllTransactions = async () => {
    setIsRefreshing(true);
    if (hasMore) {
      let paging = page + 1;
      try {
        console.log("isRefreshing: ", isRefreshing);
        const result = await drizzleDb
          .select()
          .from(schema.transactions)
          .orderBy(desc(schema.transactions.created_at))
          .limit(10)
          .offset((paging - 1) * 10);
        setPage(paging);
        setTransactions((cur) => [...cur, ...result]);
        setIsRefreshing(false);
        console.log("loaded transactions: ", result.length);
        result.length < 10 && setHasMore(false);
      } catch (error) {
        console.log("transaction page error: ", error);
      }
    }
  };

  return (
    <View style={[styles.container, { padding: 20, paddingTop: 5 }]}>
      {transactions.length === 0 ? (
        <View style={styles.info}>
          <Typo style={{ textAlign: "center" }}>
            Add a transaction by tapping
          </Typo>
          <Typo>on the categories from the home screen</Typo>
        </View>
      ) : (
        <FlashList
          data={transactions}
          showsVerticalScrollIndicator={false}
          estimatedItemSize={20}
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          renderItem={({ item }) => <Transaction data={item} />}
          refreshing={isRefreshing}
          // onRefresh={() => {
          //   setPage(1);
          //   getAllTransactions();
          // }}
          onEndReached={getAllTransactions}
          onEndReachedThreshold={0.1}
          ListFooterComponent={() => (
            <TouchableOpacity>
              <Typo>Load more</Typo>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  info: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.5,
  },
});
