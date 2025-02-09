import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import Typo from "./Typo";
import Entypo from "@expo/vector-icons/Entypo";
import EmojiPicker, { EmojiType } from "rn-emoji-keyboard";
import { CategoryFormProps } from "@/types";
import Dropdown from "./Dropdown/Dropdown";
import SelectColor from "@/components/SelectColor";

const CategoryFormContent = ({
  newCategory,
  setNewCategory,
  handleEmojiPick,
  onSelectColor,
}: CategoryFormProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, marginBottom: 50 }}
    >
      <SafeAreaView>
        <View>
          {/* emoji */}

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: "auto",
              gap: 20,
            }}
          >
            <Pressable
              onPress={() => setIsOpen(true)}
              style={[
                styles.emojiInputContainer,
                { backgroundColor: newCategory?.color },
              ]}
            >
              <View style={styles.selectedEmojiContainer}>
                <Typo size={50}>{newCategory?.icon}</Typo>
              </View>
              <View style={styles.editSelectedEmoji}>
                <Entypo name="pencil" size={24} color="black" />
              </View>
            </Pressable>
            <EmojiPicker
              defaultHeight={"64%"}
              emojiSize={30}
              disableSafeArea={false}
              enableSearchBar
              expandable={false}
              open={isOpen}
              onEmojiSelected={handleEmojiPick}
              onClose={() => setIsOpen(false)}
            />

            <View>
              <SelectColor
                newCategory={newCategory}
                onSelectColor={onSelectColor}
                currentColor={newCategory.color}
              />
            </View>
          </View>

          {/* More info */}
          <View>
            <View style={[styles.inputContainer, { borderTopWidth: 1 }]}>
              <Typo style={{ opacity: 0.5, marginRight: 8 }}>Name</Typo>
              <TextInput
                onChangeText={(e: string) =>
                  setNewCategory((prev) => ({ ...prev, name: e }))
                }
                value={newCategory.name}
                style={{
                  flex: 1,
                  color: "white",
                  fontSize: 19,
                  lineHeight: 23,
                  paddingLeft: 23,
                  paddingVertical: 18,
                }}
              />
            </View>
            <View style={[styles.inputContainer]}>
              <Typo style={{ opacity: 0.5, marginLeft: 8 }}>Type</Typo>
              <Dropdown
                categoryType={newCategory.type}
                setNewCategory={setNewCategory}
              />
            </View>
          </View>

          {/* Preview */}
          <View
            style={{ flexDirection: "row", gap: 15, paddingHorizontal: 15 }}
          >
            <View style={{ flex: 1, maxWidth: 300 }}>
              <Typo size={14} style={{ marginVertical: 8, opacity: 0.5 }}>
                Preview
              </Typo>
              <View
                style={{
                  backgroundColor: newCategory.color,
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 12,
                  borderRadius: 10,
                }}
              >
                <View
                  style={{
                    width: 35,
                    aspectRatio: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "100%",
                    backgroundColor: "#ffffff8f",
                    marginRight: 15,
                  }}
                >
                  <Typo size={18}>{newCategory.icon}</Typo>
                </View>
                <Typo fontWeight={"700"}>
                  {newCategory.name || "Category Name"}
                </Typo>
              </View>
            </View>

            {/* Color Selector */}
            {/* <View>
          <Typo size={14} style={{ marginVertical: 8, opacity: 0.5 }}>
          Color
          </Typo>
          <SelectColor
          newCategory={newCategory}
          onSelectColor={onSelectColor}
          currentColor={newCategory.color}
          />
          </View> */}
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default CategoryFormContent;

const styles = StyleSheet.create({
  emojiInputContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "brown",
    width: 100,
    // marginHorizontal: "auto",
    marginVertical: 30,
    aspectRatio: 1,
    borderRadius: "100%",
    borderCurve: "continuous",
  },
  selectedEmojiContainer: {},
  editSelectedEmoji: {
    position: "absolute",
    bottom: -5,
    right: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    width: 30,
    aspectRatio: 1,
    borderRadius: "100%",
    borderCurve: "continuous",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: "gray",
    paddingHorizontal: 15,
  },
});
