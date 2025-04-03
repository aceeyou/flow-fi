import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Typo from "./Typo";
import { BottomSheetHeaderProps } from "@/types";

const CreateModalHeader = ({
  onClose,
  onCreate,
  category,
  modalTitle = "",
  createLabel = "Create",
  editMode = false,
  closeOnly = false,
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
      <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
        {modalTitle ? (
          <Typo fontWeight="600">{modalTitle}</Typo>
        ) : (
          <>
            <Typo>{category && category.icon}</Typo>
            <Typo fontWeight="600">{category && category.name}</Typo>
          </>
        )}
      </View>
      {!closeOnly && (
        <TouchableOpacity onPress={onCreate} hitSlop={20}>
          <Typo>{editMode ? "Save" : createLabel}</Typo>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CreateModalHeader;

const styles = StyleSheet.create({});
