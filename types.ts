import React, { ReactNode, SetStateAction } from "react";
import {
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TextProps,
  TextStyle,
  ViewStyle,
} from "react-native";
import { EmojiType } from "rn-emoji-keyboard";
import { categories } from "./db/schema";
import { ParamListBase } from "@react-navigation/native";

export type CategoriesProps = {
  id?: number;
  category_name: string;
  icon: string;
  color: string;
  type: string;
};

export type AccountProps = {
  id?: number;
  account_name: string;
  balance: number;
  isImage: number;
  icon: string;
  color: string;
  imageUri: string;
  savedUri: string;
};

export type AccountSchemaProp = {
  id: number;
  account_name: string;
  balance: number;
  isImage: number;
  icon: string;
  color: string;
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
  balance: number;
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
  fullWidth?: boolean;
  transaction?: boolean;
};

export type BottomSheetHeaderProps = {
  onClose: () => void;
  onCreate: () => void;
  category?: { name: string; icon: string };
  modalTitle?: string;
  createLabel?: string;
  editMode?: boolean;
  closeOnly?: boolean;
};

export type CategoryFormProps = {
  newCategory: CategoriesProps;
  setNewCategory: (prev: SetStateAction<CategoriesProps>) => void;
  handleEmojiPick: (emojiType: EmojiType) => void;
  typePickerOpen?: () => void;
  onSelectColor: ({ hex }: { hex: string }) => void;
};

export type AccountFormProps = {
  newAccount: AccountProps;
  setNewAccount: (prev: SetStateAction<AccountProps>) => void;
  handleEmojiPick: (emojiType: EmojiType) => void;
  typePickerOpen?: () => void;
  onSelectColor: ({ hex }: { hex: string }) => void;
};

export type DropdownProps = {
  categoryType: string;
  setNewCategory: (prev: SetStateAction<CategoriesProps>) => void;
};

export type SelectColorProps = {
  newItem: CategoriesProps | AccountProps;
  onSelectColor: ({ hex }: { hex: string }) => void;
  currentColor: string;
};

export type CreateFormProps = {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface NavigateButtonProps<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList
> {
  to: RouteName;
  params?: ParamList[RouteName];
  itemTitle: string;
  children: ReactNode;
}

export type DialogProps = {
  title: string;
  message: string;
  confirmText: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export type TransactionProps = {
  id?: number;
  category_id: number;
  account_id: number;
  amount: string;
  description: string;
  type: string;
  transaction_date: string;
  icon?: string;
  category_name?: string;
  account_name?: string;
};
