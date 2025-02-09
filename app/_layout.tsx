import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { Suspense, useEffect } from "react";
import { Stack } from "expo-router";
import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";
import { ActivityIndicator } from "react-native";
import * as SQLite from "expo-sqlite";

const _layout = () => {
  const [loaded, error] = useFonts({
    Geist: require("../assets/fonts/Geist.ttf"),
    GeistMono: require("../assets/fonts/GeistMono.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  const db = SQLite.openDatabaseAsync("flowfi");
  const createDBIfNeeded = async (db: SQLiteDatabase) => {
    console.log("Creating db is needed");
    await db.execAsync(
      "CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, icon VARCHAR(50) NOT NULL, color VARCHAR(50), type TEXT NOT NULL CHECK (type IN ('expense', 'income', 'lend', 'borrow', 'invest', 'subscription')))"
    );
    await db.execAsync(
      "CREATE TABLE IF NOT EXISTS transactions (id INTEGER PRIMARY KEY AUTOINCREMENT,	category_id INTEGER, amount REAL NOT NULL,	description TEXT,	transaction_date DATETIME NOT NULL DEFAULT(GETDATE()), date_created DATETIME NOT NULL DEFAULT(GETDATE()),	type TEXT NOT NULL CHECK (type IN ('expense', 'income', 'lend', 'borrow', 'invest', 'subscription')),	FOREIGN KEY (category_id) REFERENCES categories (id));"
    );
    await db.execAsync(
      "CREATE TABLE IF NOT EXISTS accounts (id INTEGER PRIMARY KEY AUTOINCREMENT,	name TEXT NOT NULL,	balance REAL NOT NULL, icon VARCHAR(255) NOT NULL,	color VARCHAR(50));"
    );
    // await db.execAsync(
    //   "INSERT INTO categories (name, icon, color, type) VALUES ('Allowance', '💶', '#f5ae20', 'income');"
    // );

    // await db.execAsync("DROP TABLE categories;");
    console.log("End of createdb");
  };

  return (
    <Suspense fallback={<ActivityIndicator size={"large"} />}>
      <SQLiteProvider
        databaseName="flowfidb"
        onInit={createDBIfNeeded}
        useSuspense
      >
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      </SQLiteProvider>
    </Suspense>
  );
};

export default _layout;
