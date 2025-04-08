import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import Typo from "./Typo";
import { QuickBtnProps } from "@/types";
import { colors, radius } from "@/constants/theme";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useSQLiteContext } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import * as schema from "@/db/schema";
import { eq } from "drizzle-orm";
import useIsColorBright from "@/hooks/useIsColorBright";

const QuickBtn = ({
  quickT,
  fullWidth = false,
  transaction = false,
}: QuickBtnProps) => {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });
  const [amountSpent, setAmountSpent] = useState<number>(0);
  const isBgBright = useIsColorBright(quickT.color, 0.7);

  useEffect(() => {
    if (quickT.category_name === "addd_another_category") {
      return;
    }
    getTransactions();
  }, []);

  // Get all transactions of the category
  const getTransactions = async () => {
    const id = quickT.id as number;
    try {
      const result = await drizzleDb
        .select({ amount: schema.transactions.amount })
        .from(schema.transactions)
        .where(eq(schema.transactions.category_id, id));
      setAmountSpent(computeTransactionAmount(result));
    } catch (error) {
      console.log(error);
    }
  };

  const computeTransactionAmount = (amounts: { amount: string }[]) => {
    let total = 0;
    amounts.map((amount) => (total = total + Number(amount.amount)));
    return total;
  };

  return (
    <TouchableOpacity
      style={[
        quickT.category_name === "add_another_category"
          ? styles.quickAddCategoryBtn
          : styles.container,
        {
          backgroundColor: quickT.color,
          width: fullWidth ? "100%" : (Dimensions.get("screen").width - 38) / 2,
        },
      ]}
      activeOpacity={0.5}
      onPress={() => {
        if (quickT.category_name === "add_another_category") {
          router.navigate(`/createcategory?categoryType=${quickT.type}`);
          return;
        }

        !transaction &&
          router.navigate(`/createtransaction?category_id=${quickT.id}`);
      }}
    >
      {quickT.category_name === "add_another_category" ? (
        <>
          <View style={[styles.quickAddCategoryIcon]}>
            <MaterialIcons name="add" size={18} color="white" />
          </View>
          <Typo size={14}>Add a category</Typo>
        </>
      ) : (
        <>
          <View style={[styles.iconContainer]}>
            <Typo size={20}>{quickT.icon}</Typo>
          </View>
          <View>
            <Typo
              size={14}
              fontWeight="600"
              color={isBgBright ? colors.black : colors.text}
            >
              {quickT.category_name}
            </Typo>
            <Typo
              size={transaction ? 12 : 10}
              fontWeight={"400"}
              color={isBgBright ? colors.black : colors.text}
            >
              {transaction
                ? quickT.type.charAt(0).toUpperCase() + quickT.type.slice(1)
                : `₱ ${amountSpent}`}
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
                      router.push(
                        `/createcategory?id=${quickT.id}&editMode=${1}`
                      )
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
              <></>
            )}
          </View>
        </>
      )}
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
  },
  quickAddCategoryBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
    padding: 15,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "white",
    borderRadius: radius._10,
    opacity: 0.15,
  },
  quickAddCategoryIcon: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: radius._3,
    width: 25,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
