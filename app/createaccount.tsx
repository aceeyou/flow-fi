import { KeyboardAvoidingView, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import CreateModalHeader from "../components/CreateModalHeader";
import CreateAccountContent from "../components/CreateAccountContent";
import { AccountProps } from "@/types";
import ScreenWrapper from "../components/ScreenWrapper";
import { router, useLocalSearchParams } from "expo-router";
import { EmojiType } from "rn-emoji-keyboard";
import { useSQLiteContext } from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import ToastManager, { Toast } from "toastify-react-native";
import { drizzle } from "drizzle-orm/expo-sqlite";
import * as schema from "@/db/schema";
import { eq } from "drizzle-orm";

const CreateAccount = () => {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });
  const { editMode = 0, id } = useLocalSearchParams<{
    editMode: string;
    id: string;
  }>();
  const [newAccount, setNewAccount] = useState<AccountProps>({
    account_name: "",
    balance: 0,
    isImage: 0,
    imageUri: "",
    savedUri: "",
    icon: "💵",
    color: "#09C2A0",
  });

  useEffect(() => {
    const edit = editMode as number;
    if (edit == 1) getAccount();
  }, [editMode]);

  const resetState = () => {
    setNewAccount({
      account_name: "",
      balance: 0,
      isImage: 0,
      imageUri: "",
      savedUri: "",
      icon: "💵",
      color: "#09C2A0",
    });
  };

  const getAccount = async () => {
    const aID = parseInt(id, 10);
    try {
      const account = await drizzleDb
        .select()
        .from(schema.accounts)
        .where(eq(schema.accounts.id, aID));

      setNewAccount({
        account_name: account[0].account_name,
        balance: account[0].balance,
        isImage: account[0].isImage ? 1 : 0,
        imageUri: "",
        savedUri: "",
        icon: account[0].icon,
        color: account[0].color,
      });
    } catch (error) {
      console.log("createaccount getAccount(): ", error);
    }
  };

  const handleCloseModal = () => {
    resetState();
    router.back();
  };
  // Handles the insertion of the new category on the database
  const handleSubmitNewAccount = async () => {
    console.log(newAccount.isImage);
    // transfer image to local APP storage
    if (newAccount.isImage) {
      await FileSystem.copyAsync({
        from: newAccount.imageUri,
        to: newAccount.savedUri,
      });
    }

    if (newAccount.account_name === "") {
      Toast.error("Account name must be filled");
      return;
    }

    try {
      await drizzleDb.insert(schema.accounts).values({
        account_name: newAccount.account_name,
        balance: newAccount.balance,
        color: newAccount.color,
        icon: newAccount.icon,
        isImage: newAccount.isImage,
      });
      // console.log("Account created");
      resetState();
      router.replace("/(tabs)/accounts");
    } catch (error) {
      console.log("handleSaveAccount: ", error);
    }
  };

  const handleSaveEdit = async () => {
    try {
      const aID = parseInt(id, 10);
      await drizzleDb
        .update(schema.accounts)
        .set({
          account_name: newAccount.account_name,
          balance: newAccount.balance,
          color: newAccount.color,
          icon: newAccount.icon,
          isImage: newAccount.isImage,
        })
        .where(eq(schema.accounts.id, aID));
      // console.log("account edited");
      resetState();
      router.replace("/(tabs)/accounts");
    } catch (error) {
      console.log("createaccount handleSaveEdit: ", error);
    }
  };

  // Emoji Picker Function
  const handleEmojiPick = (emojiObject: EmojiType) => {
    setNewAccount((prev: AccountProps) => ({
      ...prev,
      icon: emojiObject.emoji,
      imageUri: "",
      savedUri: "",
      isImage: 0,
    }));
  };

  // Color Picker Function
  const onSelectColor = ({ hex }: { hex: string }) => {
    setNewAccount((prev) => ({ ...prev, color: hex }));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ToastManager
        animationInTiming={500}
        animationOutTiming={300}
        showCloseIcon={false}
        showProgressBar={false}
        width={300}
        height={60}
        style={{ backgroundColor: "#efefefdf" }}
        textStyle={{ marginLeft: 10 }}
      />
      <ScreenWrapper modal>
        <CreateModalHeader
          onClose={handleCloseModal}
          onCreate={editMode ? handleSaveEdit : handleSubmitNewAccount}
          editMode={true}
        />
        <CreateAccountContent
          newAccount={newAccount}
          setNewAccount={setNewAccount}
          handleEmojiPick={handleEmojiPick}
          onSelectColor={onSelectColor}
        />
      </ScreenWrapper>
    </KeyboardAvoidingView>
  );
};

export default CreateAccount;
