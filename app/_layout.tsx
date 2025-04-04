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

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import Feather from "@expo/vector-icons/Feather";

import { colors, radius } from "@/constants/theme";
// import ToastManager from "toastify-react-native";
import Toast from "react-native-toast-message";

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

  if (!loaded && !font_error) {
    return null;
  }

  if (error) {
    console.log("migrations error: ", error);
  }

  return (
    <Suspense fallback={<ActivityIndicator size={"large"} />}>
      <Toast position="bottom" />
      {/* <ToastManager
        position="bottom"
        animationStyle={"upInUpOut"}
        style={{
          with: "100%",
          flexWrap: "wrap",
          padding: 3,
          paddingVertical: 0,
          height: 50,
          borderRadius: radius._20,
        }}
        textStyle={{ width: "contain", fontSize: 14 }}
        positionValue={80}
        showProgressBar={false}
        showCloseIcon={false}
      /> */}
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
                name="createtransaction"
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
              <Stack.Screen name="picker" options={{ presentation: "modal" }} />
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
