import { StyleSheet } from "react-native";
import React, { useEffect } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { useLocalSearchParams } from "expo-router";

import * as schema from "@/db/schema";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { eq } from "drizzle-orm";
import { useSQLiteContext } from "expo-sqlite";

const picker = () => {
  // const db = useSQLiteContext();
  // const drizzleDb = drizzle(db, { schema });
  // const { what, callback } = useLocalSearchParams();

  // useEffect(() => {
  //   getList();
  // }, [what]);

  // const getList = async () => {
  //   try {
  //     const result = await drizzleDb
  //       .select()
  //       .from(what === "accounts" ? schema.accounts : schema.categories);
  //     console.log("picker list: ", result);
  //   } catch (error) {
  //     console.log("picker: ", error);
  //   }
  // };

  return (
    <ScreenWrapper modal>
      <Typo>picker</Typo>
    </ScreenWrapper>
  );
};

export default picker;

const styles = StyleSheet.create({});
