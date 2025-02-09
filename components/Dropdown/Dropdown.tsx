import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Typo from "../Typo";
import { DropdownProps } from "@/types";
import ScreenWrapper from "../ScreenWrapper";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
const types = [
  "expense",
  "income",
  "lend",
  "borrow",
  "investment",
  "subscription",
];

const Dropdown = ({ categoryType, setNewCategory }: DropdownProps) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const handleSelectType = (item: string) => {
    setNewCategory((prev) => ({ ...prev, type: item }));
    console.log(item);
    setExpanded(false);
  };
  return (
    <View style={styles.container}>
      <Pressable onPress={() => setExpanded(true)} style={styles.dropdownBtn}>
        <Typo color="white">
          {categoryType[0].toUpperCase() + categoryType.slice(1)}
        </Typo>
        <FontAwesome6 name="caret-down" size={24} color="white" />
      </Pressable>
      <Modal
        animationType="fade"
        transparent
        visible={expanded}
        collapsable={true}
        onRequestClose={() => setExpanded(false)}
      >
        <ScreenWrapper
          style={{ paddingHorizontal: 20, backgroundColor: "#0B0B0Bee" }}
        >
          <Pressable
            onPress={() => setExpanded(false)}
            style={{ marginTop: 40 }}
          >
            <MaterialIcons name="close" size={24} color="white" />
          </Pressable>
          <Typo size={20} fontWeight={"600"} style={{ paddingTop: "20%" }}>
            Select the category type
          </Typo>
          <FlatList
            data={types}
            keyExtractor={(item) => item}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.3}
                style={styles.typeBtn}
                onPress={() => handleSelectType(item)}
              >
                <Typo color={"black"}>
                  {item[0].toUpperCase() + item.slice(1)}
                </Typo>
              </TouchableOpacity>
            )}
          />
        </ScreenWrapper>
      </Modal>
    </View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    marginLeft: 30,
    paddingVertical: 8,
  },
  dropdownBtn: {
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listContainer: {
    width: "100%",
    marginTop: 20,
    borderRadius: 5,
    backgroundColor: "white",
  },
  typeBtn: {
    paddingVertical: 20,
    paddingHorizontal: 25,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
});
