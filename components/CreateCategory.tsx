import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { router } from "expo-router";

import ScreenWrapper from "@/components/ScreenWrapper";
import CreateModalHeader from "@/components/CreateModalHeader";
import CategoryFormContent from "@/components/CategoryFormContent";

import { CategoriesProps, CreateCategoryFormProps } from "@/types";
import { EmojiType } from "rn-emoji-keyboard";

const CreatCategory = ({ setShowForm }: CreateCategoryFormProps) => {
  const [newCategory, setNewCategory] = useState<CategoriesProps>({
    name: "",
    icon: "💵",
    color: "#09C2A0",
    type: "expense",
  });

  // Emoji Picker Function
  const handleEmojiPick = (emojiObject: EmojiType) => {
    setNewCategory((prev: CategoriesProps) => ({
      ...prev,
      icon: emojiObject.emoji,
    }));
  };

  // Color Picker Function
  const onSelectColor = ({ hex }: { hex: string }) => {
    setNewCategory((prev) => ({ ...prev, color: hex }));
  };

  // Resets the value of the newCateory state and closes the create category modal
  const handleCloseModal = () => {
    setNewCategory({
      name: "",
      icon: "💵",
      color: "#09C2A0",
      type: "expense",
    });
    setShowForm(false);
  };

  // Handles the insertion of the new category on the database
  const db = useSQLiteContext();
  const handleSubmitNewCategory = async () => {
    try {
      await db.runAsync(
        "INSERT INTO categories (name, icon, color, type) VALUES (?,?,?,?);",
        [
          newCategory.name,
          newCategory.icon,
          newCategory.color,
          newCategory.type,
        ]
      );
      setShowForm(false);
      router.navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScreenWrapper modal>
        <CreateModalHeader
          onClose={handleCloseModal}
          onCreate={handleSubmitNewCategory}
        />
        <CategoryFormContent
          newCategory={newCategory}
          setNewCategory={setNewCategory}
          handleEmojiPick={handleEmojiPick}
          onSelectColor={onSelectColor}
        />
      </ScreenWrapper>
    </KeyboardAvoidingView>
  );
};

export default CreatCategory;

const styles = StyleSheet.create({});
