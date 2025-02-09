import React, { Ref, SetStateAction } from "react";
import {
  GestureResponderEvent,
  TextProps,
  TextStyle,
  ViewStyle,
} from "react-native";
import { EmojiType } from "rn-emoji-keyboard";

export type CategoriesProps = {
  id?: number;
  name: string;
  icon: string;
  color: string;
  type: string;
};

export type ScreenWrapperProps = {
  centered?: boolean;
  modal?: boolean;
  style?: ViewStyle;
  children: React.ReactNode;
};

export type TypoProps = {
  centered?: boolean;
  size?: number;
  color?: string;
  mono?: boolean;
  fontWeight?: TextStyle["fontWeight"];
  children: any | null;
  style?: TextStyle;
  textProps?: TextProps;
};

export type HeadsUpProps = {
  balance: string;
};

export type ListItemProps = {
  name: string;
  icon: string;
  type: string;
};

export type QuickTransactionListProps = {
  outcome: CategoriesProps[];
  income: CategoriesProps[];
};

export type QuickBtnProps = {
  quickT: CategoriesProps;
};

export type BottomSheetHeaderProps = {
  onClose: () => void;
  onCreate: () => void;
  createLabel?: string;
};

export type CategoryFormProps = {
  newCategory: CategoriesProps;
  setNewCategory: (prev: SetStateAction<CategoriesProps>) => void;
  handleEmojiPick: (emojiType: EmojiType) => void;
  typePickerOpen?: () => void;
  onSelectColor: ({ hex }: { hex: string }) => void;
};

export type DropdownProps = {
  categoryType: string;
  setNewCategory: (prev: SetStateAction<CategoriesProps>) => void;
};

export type SelectColorProps = {
  newCategory: CategoriesProps;
  onSelectColor: ({ hex }: { hex: string }) => void;
  currentColor: string;
};

export type CreateCategoryFormProps = {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
};
