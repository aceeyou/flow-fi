import { Platform, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState, Suspense } from "react";
import { Tabs } from "expo-router";
import { colors } from "@/constants/theme";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tertiary,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#0a0a0a",
          borderWidth: 0,
          borderTopWidth: 0,
          borderTopColor: "transparent",
          height: 80,
          paddingTop: 10,
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
          headerShown: false,
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
