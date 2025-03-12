import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Image } from "expo-image";
import Typo from "./Typo";
import { SafeAreaView } from "react-native-safe-area-context";
import Entypo from "@expo/vector-icons/Entypo";
import EmojiPicker from "rn-emoji-keyboard";
import SelectColor from "./SelectColor";
import {
  GestureHandlerRootView,
  TextInput,
} from "react-native-gesture-handler";
import { AccountFormProps } from "@/types";
import { useLocales } from "expo-localization";
import * as ImagePicker from "expo-image-picker";
import ScreenWrapper from "./ScreenWrapper";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import * as FileSystem from "expo-file-system";
import Feather from "@expo/vector-icons/Feather";

const CreateAccountContent = ({
  newAccount,
  setNewAccount,
  handleEmojiPick,
  onSelectColor,
}: AccountFormProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [{ currencySymbol }] = useLocales();
  const [chooseEmoji, setChooseEmoji] = useState<boolean>(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.75,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      const savedUri =
        FileSystem.documentDirectory +
        `${new Date().getTime()}-${imageUri?.split("/").splice(-1)[0]}`;

      // temporarily set the uri as the value of icon property of new account
      setNewAccount((prev) => ({
        ...prev,
        imageUri,
        savedUri,
        icon: imageUri,
        isImage: 1,
      }));
      setIsOpen(false);
    }
  };

  // if (domColor) console.log("domColor: ", domColor);

  return (
    <GestureHandlerRootView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, marginBottom: 50 }}
      >
        <SafeAreaView>
          <View>
            {/* emoji */}
            <Modal
              style={{ maxHeight: "60%" }}
              visible={isOpen}
              animationType="fade"
              transparent
              onRequestClose={() => setIsOpen(false)}
            >
              <ScreenWrapper
                style={{ paddingHorizontal: 20, backgroundColor: "#0B0B0Bee" }}
              >
                <Pressable
                  onPress={() => setIsOpen(false)}
                  style={{ marginTop: 40, marginBottom: 100 }}
                >
                  <MaterialIcons name="close" size={24} color="white" />
                </Pressable>
                <Typo size={20}>Select a cover for the new Account </Typo>
                <View style={styles.coverSelectBtnCtn}>
                  <TouchableOpacity
                    onPress={() => {
                      setIsOpen(false);
                      setChooseEmoji(true);
                    }}
                    activeOpacity={0.75}
                    style={styles.coverSelectBtn}
                  >
                    <MaterialIcons
                      name="emoji-emotions"
                      size={50}
                      color="black"
                    />
                    <Typo color="black">Select Emoji</Typo>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      pickImage();
                    }}
                    activeOpacity={0.75}
                    style={styles.coverSelectBtn}
                  >
                    <FontAwesome6 name="image" size={50} color="black" />
                    <Typo color="black">Upload Image</Typo>
                  </TouchableOpacity>
                </View>
              </ScreenWrapper>
            </Modal>
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
                  { backgroundColor: newAccount?.color },
                ]}
              >
                <View
                  style={[
                    styles.selectedEmojiContainer,
                    {
                      borderWidth: newAccount.isImage ? 1 : 0,
                      borderColor: newAccount.isImage ? "white" : "transparent",
                    },
                  ]}
                >
                  {newAccount.isImage === 1 ? (
                    <Image
                      source={{ uri: newAccount.icon }}
                      contentFit="cover"
                      transition={1000}
                      style={{
                        width: "100%",
                        aspectRatio: 1,
                        borderRadius: 60,
                      }}
                    />
                  ) : (
                    <Typo size={Platform.OS === "ios" ? 70 : 50}>
                      {newAccount?.icon}
                    </Typo>
                  )}
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
                open={chooseEmoji}
                onEmojiSelected={handleEmojiPick}
                onClose={() => setChooseEmoji(false)}
              />

              {/* <View>
              <SelectColor
              newCategory={newCategory}
              onSelectColor={onSelectColor}
              currentColor={newCategory.color}
              />
            </View> */}
            </View>

            {/* More info */}
            <View>
              <View style={[styles.inputContainer, { borderTopWidth: 1 }]}>
                <Typo style={{ opacity: 0.5, marginRight: 8 }}>Name</Typo>
                <TextInput
                  onChangeText={(e: string) =>
                    setNewAccount((prev) => ({ ...prev, account_name: e }))
                  }
                  value={newAccount.account_name}
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
                <Typo style={{ opacity: 0.5, marginRight: 10 }}>Balance</Typo>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Typo size={20}>{currencySymbol}</Typo>
                  <TextInput
                    keyboardType="decimal-pad"
                    onChangeText={(e: string) =>
                      setNewAccount((prev) => ({
                        ...prev,
                        balance: parseInt(e, 10),
                      }))
                    }
                    value={
                      newAccount.balance ? newAccount.balance.toString() : ""
                    }
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
                    backgroundColor: newAccount.color,
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
                    {newAccount.isImage === 1 ? (
                      <Image
                        source={{ uri: newAccount.icon }}
                        contentFit="cover"
                        transition={1000}
                        style={{
                          width: "100%",
                          aspectRatio: 1,
                          borderRadius: 60,
                        }}
                      />
                    ) : (
                      <Typo size={Platform.OS === "ios" ? 30 : 20}>
                        {newAccount?.icon}
                      </Typo>
                    )}
                  </View>
                  <Typo fontWeight={"700"}>
                    {newAccount.account_name || "Account Name"}
                  </Typo>
                </View>
              </View>

              {/* Color Selector */}
              <View>
                <Typo size={14} style={{ marginVertical: 8, opacity: 0.5 }}>
                  Color
                </Typo>
                <SelectColor
                  newItem={newAccount}
                  onSelectColor={onSelectColor}
                  currentColor={newAccount.color}
                />
              </View>
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
};

export default CreateAccountContent;

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
  selectedEmojiContainer: {
    borderRadius: 50,
    borderCurve: "continuous",
  },
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
    borderColor: "#0b0b0b",
    borderWidth: 1.25,
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
  coverSelectBtnCtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginTop: 30,
  },
  coverSelectBtn: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
    paddingVertical: 30,
    borderRadius: 10,
    gap: 5,
  },
});
