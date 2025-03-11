import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { colors, radius } from "@/constants/theme";
import Typo from "./Typo";
import { NavigateButtonProps } from "@/types";
import { ParamListBase } from "@react-navigation/native";
import { router, useNavigation } from "expo-router";
import * as SQLite from "expo-sqlite";
import Dialog from "./Dialog";

import * as schema from "@/db/schema";
import { drizzle } from "drizzle-orm/expo-sqlite";

const SettingsItem = <
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList
>({
  itemTitle,
  to,
  params,
  children,
}: NavigateButtonProps<ParamList, RouteName>) => {
  const db = SQLite.useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });

  const navigation = useNavigation<any>();
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const handlePress = () => {
    if (itemTitle === "Delete all data") {
      setConfirmDelete(true);
      return;
    }
    navigation.navigate(to as string, params);
  };

  const handleDeleteData = () => {
    dropDB();
    setConfirmDelete(false);
    router.navigate("/");
    return;
  };

  const dropDB = async () => {
    try {
      const tables = await drizzleDb.all<{ name: string }>(
        `SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'`
      );

      for (const table of tables) {
        console.log(table.name);
        await drizzleDb.run(`DROP TABLE IF EXISTS ${table.name}`);
      }

      console.log("db dropped");
      router.navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <TouchableOpacity
      hitSlop={0.25}
      onPress={handlePress}
      style={styles.settingItem}
    >
      <View
        style={{
          width: 30,
          aspectRatio: 1,
          borderRadius: 30,
          backgroundColor: colors.icon_bg,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </View>
      <Typo color={itemTitle === "Delete all data" ? colors.red : colors.text}>
        {itemTitle}
      </Typo>
      <Modal visible={confirmDelete} animationType="none" transparent={true}>
        <Dialog
          title="Delete all data?"
          message="This will erase all accounts, categories, and transactions from the moment you used this application. Do you want to continue?"
          confirmText="Delete"
          onCancel={() => setConfirmDelete(false)}
          onConfirm={handleDeleteData}
        />
      </Modal>
    </TouchableOpacity>
  );
};

export default SettingsItem;

const styles = StyleSheet.create({
  settingItem: {
    borderRadius: radius._10,
    backgroundColor: "#191919",
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
});
