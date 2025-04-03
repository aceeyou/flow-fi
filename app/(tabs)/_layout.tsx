import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { router, Tabs } from "expo-router";
import { colors } from "@/constants/theme";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tertiary,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#0e0e0e",
          borderWidth: 0,
          borderTopWidth: 0,
          borderTopColor: "transparent",
          height: 70,
          paddingVertical: 0,
          paddingBottom: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home"
              size={Platform.OS == "android" ? 30 : size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="accounts"
        options={{
          headerTitle: "Accounts",
          headerTitleStyle: {
            color: colors.text,
            fontSize: 18,
          },
          headerStyle: {
            backgroundColor: "#0a0a0a",
          },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="credit-card-multiple"
              size={Platform.OS == "android" ? 30 : size}
              color={color}
            />
          ),
          headerRight: () => (
            <Pressable
              onPress={() => router.push("/createaccount")}
              style={{ marginRight: 20 }}
              hitSlop={15}
            >
              <Feather name="plus-circle" size={25} color="white" />
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          headerTitle: "Transactions",
          headerTitleStyle: {
            color: colors.text,
          },
          headerStyle: {
            backgroundColor: "#0a0a0a",
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="receipt"
              size={Platform.OS == "android" ? 30 : size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerTitle: "Settings",
          headerTitleStyle: {
            color: colors.text,
          },
          headerStyle: {
            backgroundColor: "#0a0a0a",
          },
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="settings"
              size={Platform.OS == "android" ? 30 : size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;

const styles = StyleSheet.create({});
