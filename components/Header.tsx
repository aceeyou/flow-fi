import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Typo from "./Typo";

const Header = () => {
  return (
    <View style={[styles.container]}>
      <Typo mono size={20}>
        flow-fi
      </Typo>
      <TouchableOpacity>
        <Ionicons name="settings-sharp" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
