import React, { Suspense, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { SQLiteProvider, openDatabaseSync } from "expo-sqlite";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/drizzle/migrations";
import {
  GestureHandlerRootView,
  Pressable,
} from "react-native-gesture-handler";
import * as SQLite from "expo-sqlite";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import Feather from "@expo/vector-icons/Feather";

import { colors } from "@/constants/theme";

const _layout = () => {
  const [loaded, font_error] = useFonts({
    Geist: require("../assets/fonts/Geist.ttf"),
    GeistMono: require("../assets/fonts/GeistMono.ttf"),
  });
  const expoDB = openDatabaseSync("flowfidev");
  const db = drizzle(expoDB);
  const { error } = useMigrations(db, migrations);

  useEffect(() => {
    if (loaded || font_error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, font_error]);

  // useEffect(() => {
  //   try {
  //     SQLite.deleteDatabaseAsync("flowfidev");
  //     console.log("db deteleted");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);

  if (!loaded && !font_error) {
    return null;
  }

  if (error) {
    console.log("migrations error: ", error);
  }

  return (
    <Suspense fallback={<ActivityIndicator size={"large"} />}>
      <SQLiteProvider databaseName="flowfidev" useSuspense>
        <GestureHandlerRootView>
          <BottomSheetModalProvider>
            <Stack
              screenOptions={{
                headerShown: false,
                headerShadowVisible: false,
                headerTransparent: true,
                headerBlurEffect: "dark",
              }}
            >
              <Stack.Screen name="(tabs)" />
              <Stack.Screen
                name="createaccount"
                options={{ presentation: "modal" }}
              />
              <Stack.Screen
                name="createcategory"
                options={{ presentation: "modal" }}
              />
              <Stack.Screen
                name="managecategories"
                options={{
                  headerShown: true,
                  // headerTransparent: true,
                  // headerBlurEffect: "regular",
                  headerTitle: "Categories",
                  headerTitleStyle: {
                    color: colors.text,
                    fontSize: 14,
                  },
                  headerStyle: {
                    backgroundColor: "#0a0a0a",
                  },
                  headerBackVisible: false,
                  headerLeft: () => (
                    <Pressable onPress={() => router.back()} hitSlop={15}>
                      <Feather name="chevron-left" size={25} color="white" />
                    </Pressable>
                  ),
                  headerRight: () => (
                    <Pressable onPress={() => router.push("/createcategory")}>
                      <Feather name="plus-circle" size={22} color="white" />
                    </Pressable>
                  ),
                }}
              />
            </Stack>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </SQLiteProvider>
    </Suspense>
  );
};

// options={{
//   headerTitle: "Categories",
//   headerRight: () => (
//     <Pressable
//       onPress={() => router.push("/createcategory")}
//       style={{ marginRight: 20 }}
//       hitSlop={15}
//     >
//       <Feather name="plus-circle" size={25} color="white" />
//     </Pressable>
//   ),
// }}

export default _layout;
