import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Typo from "./Typo";
import { BottomSheetHeaderProps } from "@/types";

const CreateModalHeader = ({
  onClose,
  onCreate,
  createLabel = "Create",
}: BottomSheetHeaderProps) => {
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 15,
        paddingRight: 20,
        paddingBottom: 20,
      }}
    >
      <Pressable onPress={onClose} hitSlop={20}>
        <MaterialIcons name="close" size={24} color="white" />
      </Pressable>
      <TouchableOpacity onPress={onCreate} hitSlop={20}>
        <Typo>{createLabel}</Typo>
      </TouchableOpacity>
    </View>
  );
};

export default CreateModalHeader;

const styles = StyleSheet.create({});
