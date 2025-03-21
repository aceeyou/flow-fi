import React, { useEffect, useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import CreateModalHeader from "@/components/CreateModalHeader";
import { AccountSchemaProp, CategoriesProps, TransactionProps } from "@/types";
import { router, useLocalSearchParams } from "expo-router";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Modal,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import * as schema from "@/db/schema";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { eq } from "drizzle-orm";
import { useSQLiteContext } from "expo-sqlite";
import { colors, radius } from "@/constants/theme";
import CalculatorPad from "@/components/CalculatorPad";
import AccountItem from "@/components/AccountItem";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { PanGestureHandler } from "react-native-gesture-handler";
import { FlashList } from "@shopify/flash-list";

const CreateTransaction = () => {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });
  const { category_id } = useLocalSearchParams<{ category_id: string }>();

  const [repeating, setRepeating] = useState<boolean>(false);
  const [viewRepeatDatePicker, setRepeatDatePicker] = useState<boolean>(false);
  const [repeatDate, setRepeatDate] = useState<Date | null>(null);

  const [viewDatePicker, setViewDatePicker] = useState<boolean>(false);
  const [transactionDate, setTransactionDate] = useState<Date>(new Date());

  const [category, setCategory] = useState<CategoriesProps>({
    category_name: "",
    icon: "💵",
    color: "#09C2A0",
    type: "expense",
  });
  const [accounts, setAccounts] = useState<AccountSchemaProp[]>([
    {
      account_name: "",
      balance: 0,
      isImage: 0,
      icon: "💵",
      color: "#09C2A0",
    },
  ]);
  const [transaction, setTransaction] = useState<TransactionProps>({
    category_id: parseInt(category_id, 10),
    account_id: 0,
    amount: 0,
    description: "",
    type: "expense",
  });

  const [viewAccountsList, setViewAccountsList] = useState<boolean>(false);
  const [accountSelected, setAccountSelected] = useState<AccountSchemaProp>({
    account_name: accounts[0]?.account_name,
    balance: accounts[0]?.balance,
    isImage: accounts[0]?.isImage,
    icon: accounts[0]?.icon,
    color: accounts[0]?.color,
  });

  useEffect(() => {
    getCategory();
    getAllAccounts();
  }, []);

  const getCategory = async () => {
    const id = parseInt(category_id, 10);
    try {
      const category = await drizzleDb
        .select()
        .from(schema.categories)
        .where(eq(schema.categories.id, id));
      //   console.log(category);
      setCategory(category[0]);
    } catch (error) {
      console.log("createtransaction useEffect: ", error);
    }
  };

  const getAllAccounts = async () => {
    try {
      let result = await drizzleDb.select().from(schema.accounts);
      setAccounts([...result]);
      setAccountSelected({ ...result[0] });
    } catch (error) {
      console.log("transaction getAllAccounts: ", error);
    }
  };

  // Date picker
  const handleOnDateSelect = (e: Date) => {
    setTransactionDate(e);
    setViewDatePicker(false);
  };

  const handleDatePickerOnCancel = () => {
    setViewDatePicker(false);
  };

  const handleRepeatDateOnCancel = () => {
    setViewDatePicker(false);
  };

  // Repeat Date
  const handleRepeatDateClick = () => {
    if (repeating) {
      setRepeating(false);
      setRepeatDate(null);
    } else {
      setRepeatDatePicker(true);
    }
  };

  const handleRepeatDateSelect = (e: Date) => {
    setRepeatDate(e);
    setRepeating(true);
    setRepeatDatePicker(false);
  };

  // Modal Account Picker
  const handleOnSelectAccount = (account: AccountSchemaProp) => {
    console.log(account);
    setAccountSelected(account);
    handleCloseAccountPicker();
  };

  const handleCloseAccountPicker = () => {
    setViewAccountsList(false);
  };

  const resetState = () => {
    setTransaction({
      category_id: 1,
      account_id: 1,
      amount: 0,
      description: "",
      type: "expense",
    });
  };
  const handleCloseModal = () => {
    resetState();
    router.back();
  };
  const handleSubmitNewAccount = () => {};

  return (
    <ScreenWrapper modal>
      <CreateModalHeader
        onClose={handleCloseModal}
        onCreate={handleSubmitNewAccount}
        category={{ name: category.category_name, icon: category.icon }}
        editMode
      />
      <View style={{ paddingHorizontal: 13 }}>
        <View style={styles.displayContainer}>
          <Typo size={50} fontWeight="600">
            ₱ {transaction.amount.toLocaleString()}
          </Typo>
        </View>
        <View style={styles.transactionOptionsContainer}>
          <Typo size={14} color={colors.neutral400}>
            Transaction Note
          </Typo>
          <TextInput
            style={styles.noteInput}
            placeholder="What is this for?"
            multiline
            value={transaction.description}
            onChangeText={(e) =>
              setTransaction((cur) => ({ ...cur, description: e }))
            }
          />
          <View style={styles.accountPicker}>
            <Typo size={14} color={colors.neutral400}>
              Account
            </Typo>
            <AccountItem
              small
              data={{ ...accountSelected, imageUri: "", savedUri: "" }}
              onPress={() => setViewAccountsList(true)}
            />
          </View>
          <View style={styles.transactionTogglesContainer}>
            <TouchableOpacity
              style={[
                styles.transactionOptionToggle,
                {
                  backgroundColor: repeating ? colors.secondary : "",
                  flexDirection: "column",
                  gap: 0,
                  paddingVertical: repeatDate !== null ? 9 : 15,
                },
              ]}
              onPress={handleRepeatDateClick}
            >
              <View style={[styles.repeatDateContent]}>
                <MaterialIcons
                  name="event-repeat"
                  size={repeatDate ? 14 : 18}
                  color={repeatDate !== null ? colors.text : colors.neutral500}
                />
                <Typo
                  color={repeatDate !== null ? colors.text : colors.neutral500}
                  size={repeatDate ? 14 : 18}
                  fontWeight={repeating ? "600" : "400"}
                >
                  Repeat
                </Typo>
              </View>
              <View>
                {repeatDate !== null && (
                  <Typo size={14}>
                    every{" "}
                    <Typo size={14} fontWeight={"700"}>
                      {repeatDate?.toLocaleDateString(undefined, {
                        day: "numeric",
                      })}
                      {repeatDate?.toLocaleDateString(undefined, {
                        day: "numeric",
                      }) === "1"
                        ? "st"
                        : repeatDate?.toLocaleDateString(undefined, {
                            day: "numeric",
                          }) === "2"
                        ? "nd"
                        : repeatDate?.toLocaleDateString(undefined, {
                            day: "numeric",
                          }) === "3"
                        ? "rd"
                        : "th"}{" "}
                    </Typo>
                    day
                  </Typo>
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.transactionOptionToggle]}
              onPress={() => setViewDatePicker(true)}
            >
              <MaterialIcons
                name="calendar-month"
                size={18}
                color={colors.text}
              />
              <Typo>
                {transactionDate.getDate() === new Date().getDate()
                  ? "Today"
                  : transactionDate.toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })}
              </Typo>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <CalculatorPad />
      <DateTimePickerModal
        mode="datetime"
        isVisible={viewDatePicker}
        onConfirm={handleOnDateSelect}
        onCancel={handleDatePickerOnCancel}
        display="inline"
        accentColor={colors.tertiary}
        buttonTextColorIOS={colors.tertiary}
        backdropStyleIOS={{ backgroundColor: colors.neutral800 }}
      />
      <DateTimePickerModal
        mode="date"
        isVisible={viewRepeatDatePicker}
        onConfirm={handleRepeatDateSelect}
        onCancel={handleRepeatDateOnCancel}
        display="inline"
        accentColor={colors.tertiary}
        buttonTextColorIOS={colors.tertiary}
        backdropStyleIOS={{ backgroundColor: colors.neutral800 }}
      />
      <Modal visible={viewAccountsList} animationType="fade" transparent={true}>
        <ScreenWrapper style={{ paddingTop: 60 }}>
          <CreateModalHeader
            onClose={handleCloseAccountPicker}
            onCreate={() => {}}
            closeOnly={true}
          />
          <FlashList
            data={accounts}
            estimatedItemSize={10}
            contentContainerStyle={{ paddingHorizontal: 23 }}
            ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
            ListHeaderComponent={() => (
              <View style={{ marginBlock: 16 }}>
                <Typo size={18}>Select the account you want to use</Typo>
              </View>
            )}
            renderItem={({ item }) => (
              <AccountItem
                small
                data={{ ...item, imageUri: "", savedUri: "" }}
                onPress={() => handleOnSelectAccount(item)}
              />
            )}
          />
        </ScreenWrapper>
      </Modal>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  displayContainer: {
    backgroundColor: "#454f484f",
    paddingVertical: 30,
    paddingHorizontal: 16,
    borderRadius: radius._10,
    alignItems: "center",
  },
  transactionOptionsContainer: {
    marginTop: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.neutral700,
    borderRadius: radius._10,
  },
  noteInput: {
    // maxWidth: "100%",
    wordWrap: "break-word",
    paddingVertical: 10,
    color: colors.text,
    fontSize: 18,
  },
  accountPicker: {
    marginTop: 8,
    gap: 6,
  },
  transactionTogglesContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 10,
  },
  transactionOptionToggle: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: colors.neutral700,
    borderRadius: radius._10,
  },
  repeatDateContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});

export default CreateTransaction;
