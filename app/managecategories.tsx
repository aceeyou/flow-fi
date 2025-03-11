import React, { useCallback, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { router, useFocusEffect } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import * as schema from "@/db/schema";
import { eq } from "drizzle-orm";

import Typo from "@/components/Typo";
import ScreenWrapper from "@/components/ScreenWrapper";
import QuickBtn from "@/components/QuickBtn";
import Feather from "@expo/vector-icons/Feather";
import { FlashList } from "@shopify/flash-list";

import { CategoriesProps } from "@/types";
import { colors, radius } from "@/constants/theme";

const managecategories = () => {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });
  const [categories, setCategories] = useState<(string | CategoriesProps)[]>(
    []
  );

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
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

    let newArray = ["Expense", ...expensesResult, "Income", ...incomeResult];
    setCategories(newArray);
  }
  return (
    <ScreenWrapper>
      <FlashList
        data={categories}
        renderItem={({ item }) => {
          if (typeof item === "string") {
            return (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flex: 1,
                  marginTop: 12,
                  padding: 10,
                  borderRadius: radius._6,
                  backgroundColor: colors.sectionTitle_bg,
                }}
              >
                <Typo>{item}</Typo>
                <TouchableOpacity
                  activeOpacity={0.5}
                  hitSlop={15}
                  onPress={() =>
                    router.navigate(
                      `/createcategory?categoryType=${item.toLowerCase()}`
                    )
                  }
                >
                  <Feather name="plus-circle" size={20} color="white" />
                </TouchableOpacity>
              </View>
            );
          } else {
            return <QuickBtn quickT={item} fullWidth />;
          }
        }}
        getItemType={(item) => {
          return typeof item === "string" ? "sectionHeader" : "row";
        }}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        estimatedItemSize={50}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 60,
          paddingBottom: 100,
          paddingHorizontal: 15,
        }}
      />
    </ScreenWrapper>
  );
};

export default managecategories;
