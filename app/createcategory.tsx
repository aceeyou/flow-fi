import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { router, useLocalSearchParams } from "expo-router";

import ScreenWrapper from "@/components/ScreenWrapper";
import CreateModalHeader from "@/components/CreateModalHeader";
import CategoryFormContent from "@/components/CategoryFormContent";

import { CategoriesProps } from "@/types";
import { EmojiType } from "rn-emoji-keyboard";

import * as schema from "@/db/schema";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { eq } from "drizzle-orm";
import { colors } from "@/constants/theme";

const CreateCategory = ({}) => {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });
  const {
    categoryType,
    id,
    editMode = 0,
  } = useLocalSearchParams<{
    categoryType: string;
    id: string;
    editMode: string;
  }>();
  const [newCategory, setNewCategory] = useState<CategoriesProps>({
    category_name: "",
    icon: "💵",
    color: categoryType === "expense" ? colors.quarternary : colors.primary,
    type: categoryType ? categoryType : "expense",
  });

  useEffect(() => {
    const edit = editMode as number;
    if (edit) getCategory();
  }, [editMode]);

  const resetState = () => {
    setNewCategory({
      category_name: "",
      icon: "💵",
      color: "#09C2A0",
      type: "expense",
    });
  };

  const getCategory = async () => {
    const cID = parseInt(id, 10);
    try {
      const category = await drizzleDb
        .select()
        .from(schema.categories)
        .where(eq(schema.categories.id, cID));
      setNewCategory(category[0]);
    } catch (error) {
      console.log("createcategory getCategory(): ", error);
    }
  };

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
      category_name: "",
      icon: "💵",
      color: "#09C2A0",
      type: categoryType ? categoryType : "expense",
    });
    router.back();
  };

  // Handles the insertion of the new category on the database
  const handleSubmitNewCategory = async () => {
    try {
      // console.log("test category: ", newCategory);
      await drizzleDb.insert(schema.categories).values({
        category_name: newCategory.category_name,
        icon: newCategory.icon,
        color: newCategory.color,
        type: categoryType ? categoryType : newCategory.type,
      });
      resetState();
      router.replace("/");
    } catch (error) {
      console.log("createcategory", error);
    }
  };

  const handleSaveEdit = async () => {
    const cID = parseInt(id, 10);
    try {
      await drizzleDb
        .update(schema.categories)
        .set({ ...newCategory })
        .where(eq(schema.categories.id, cID))
        .then(() => {
          // console.log("category updated");
          resetState();
          router.replace("/");
        });
    } catch (error) {
      console.log("createcategory handleSaveEdit: ", error);
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
          onCreate={editMode ? handleSaveEdit : handleSubmitNewCategory}
          editMode={true}
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

export default CreateCategory;
