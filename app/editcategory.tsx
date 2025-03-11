import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { useLocalSearchParams } from "expo-router";
import { drizzle } from "drizzle-orm/expo-sqlite";
import * as schema from "@/db/schema";
import { useSQLiteContext } from "expo-sqlite";
import { eq } from "drizzle-orm";

const EditCategory = () => {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });
  const { id } = useLocalSearchParams<{ id: number }>();

  const getCategory = async () => {
    try {
      const cateogry = await drizzleDb
        .select()
        .from(schema.categories)
        .where(eq(schema.categories.id, id));
    } catch (error) {
      console.log("Error editcategory: ", error);
    }
  };
  return (
    <ScreenWrapper>
      <Typo>Hi</Typo>
      <Typo>{id}</Typo>
    </ScreenWrapper>
  );
};

export default EditCategory;

const styles = StyleSheet.create({});
