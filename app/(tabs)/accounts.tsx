import { StyleSheet, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import { colors, radius } from "@/constants/theme";
import { useFocusEffect } from "expo-router";
import { AccountProps } from "@/types";
import { useSQLiteContext } from "expo-sqlite";
import AccountItem from "@/components/AccountItem";
import { FlashList } from "@shopify/flash-list";
import AccountOverviewCard from "@/components/AccountOverviewCard";

const categoryTrxValues = [
  { value: 200 },
  { value: 185 },
  { value: 305 },
  { value: 44 },
  { value: 90 },
  { value: 400 },
  { value: 250 },
];

const Accounts = () => {
  const [accounts, setAccounts] = useState<AccountProps[]>([]);
  const [totalAccountBalance, setTotalAccountBalance] = useState<
    { value: number }[]
  >([]);

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  useEffect(() => {
    const balanceTotal = accounts.map((item) => ({
      value: item.balance,
    }));
    setTotalAccountBalance((prev) => [...prev, ...balanceTotal]);

    return () => setTotalAccountBalance([{ value: 0 }]);
  }, [accounts]);

  const db = useSQLiteContext();
  async function getData() {
    const accounts = await db.getAllAsync<AccountProps>(
      "SELECT * FROM accounts;"
    );
    setAccounts([...accounts]);
  }

  return (
    <ScreenWrapper modal>
      <FlashList
        data={accounts}
        ListHeaderComponent={() => (
          <AccountOverviewCard balance={totalAccountBalance} />
        )}
        renderItem={({ item }) => <AccountItem key={item.id} data={item} />}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        estimatedItemSize={20}
      />
    </ScreenWrapper>
  );
};

export default Accounts;

const styles = StyleSheet.create({});
