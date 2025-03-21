import { Image, Pressable, StyleSheet, View } from "react-native";
import React from "react";
import Typo from "./Typo";
import { AccountProps } from "@/types";
import { colors, radius } from "@/constants/theme";
import { router } from "expo-router";

const AccountItem = ({
  data,
  small = false,
  onPress,
}: {
  data: AccountProps;
  small?: boolean;
  onPress?: () => void;
}) => {
  const handleOnPress = () => {
    if (onPress) onPress();
    else router.navigate(`/createaccount?editMode=1&id=${data.id}`);
  };
  return (
    <Pressable
      onPress={handleOnPress}
      style={[styles.accountItemCtn, { backgroundColor: data.color }]}
    >
      <View style={styles.iconCtn}>
        {data.isImage ? (
          <Image
            source={{ uri: data?.icon }}
            style={{
              width: "100%",
              aspectRatio: 1,
              borderRadius: 60,
            }}
          />
        ) : (
          <Typo size={25}>{data?.icon}</Typo>
        )}
      </View>
      <View
        style={{
          marginRight: "auto",
        }}
      >
        <Typo fontWeight={"500"}>{data.account_name}</Typo>
        {small && (
          <Typo size={14} fontWeight="300">
            ₱ {data.balance}
          </Typo>
        )}
      </View>
      {!small && (
        <View>
          <Typo fontWeight={"500"}>₱ {data.balance}</Typo>
        </View>
      )}
    </Pressable>
  );
};

export default AccountItem;

const styles = StyleSheet.create({
  accountItemCtn: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    borderRadius: radius._10,
    maxHeight: 60,
  },
  iconCtn: {
    width: 35,
    borderRadius: 100,
    borderCurve: "circular",
    backgroundColor: colors.icon_bg,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
