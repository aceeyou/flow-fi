import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { TransactionProps } from "@/types";
import { colors, radius } from "@/constants/theme";
import Typo from "./Typo";
import { drizzle } from "drizzle-orm/expo-sqlite";
import * as schema from "@/db/schema";
import { eq } from "drizzle-orm";
import { useSQLiteContext } from "expo-sqlite";

const Transaction = ({ data }: { data: TransactionProps }) => {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });
  const [transactionData, setTransactionData] = useState<TransactionProps>({
    category_id: data.category_id,
    account_id: data.account_id,
    amount: data.amount,
    description: data.description,
    type: data.type,
    transaction_date: data.transaction_date,
    icon: "",
    category_name: "",
  });

  useEffect(() => {
    getAllTransactionData();
  }, []);

  const getAllTransactionData = async () => {
    try {
      const result = await drizzleDb
        .select({
          icon: schema.categories.icon,
          category_name: schema.categories.category_name,
        })
        .from(schema.categories)
        .where(eq(schema.categories.id, data.category_id));
      const accountName = await drizzleDb
        .select({ account_name: schema.accounts.account_name })
        .from(schema.accounts)
        .where(eq(schema.accounts.id, data.account_id));
      setTransactionData((cur) => ({
        ...cur,
        icon: result[0].icon,
        category_name: result[0].category_name,
        account_name: accountName[0].account_name,
      }));
    } catch (error) {
      console.log("transaction component: ", error);
    }
  };

  return (
    <View
      style={{
        borderRadius: radius._10,
        padding: 15,
        paddingTop: 8,
        borderWidth: 1,
        borderColor: colors.neutral700,
      }}
    >
      <View style={{ marginBottom: 8 }}>
        <Typo size={14} color={colors.neutral400}>
          {new Date(transactionData.transaction_date).toLocaleString(
            "default",
            { month: "long" }
          ) +
            " " +
            new Date(transactionData.transaction_date).getDate()}
        </Typo>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <View
          style={{
            backgroundColor: colors.icon_bg,
            borderRadius: 100,
            width: 41,
            aspectRatio: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typo size={30} style={{}}>
            {transactionData?.icon}
          </Typo>
        </View>
        <View style={{ flex: 1 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Typo>{transactionData?.description}</Typo>
            <Typo
              size={20}
              fontWeight={"700"}
              color={
                transactionData?.type === "expense"
                  ? colors.red
                  : colors.primary
              }
            >
              {transactionData?.type === "expense" ? "-" : "+"}₱
              {transactionData?.amount}
            </Typo>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Typo size={14} color={colors.neutral400}>
              {transactionData.category_name}
            </Typo>
            <Typo size={14} color={colors.neutral400}>
              {transactionData?.account_name}
            </Typo>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Transaction;

const styles = StyleSheet.create({});
