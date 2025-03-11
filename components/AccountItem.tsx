import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Typo from "./Typo";
import { AccountProps } from "@/types";
import { useLocales } from "expo-localization";
import { colors, radius } from "@/constants/theme";
import { router } from "expo-router";

const AccountItem = ({ data }: { data: AccountProps }) => {
  const [{ currencySymbol }] = useLocales();
  console.log(data.id);
  return (
    <Pressable
      onPress={() => router.navigate(`/createaccount?editMode=1&id=${data.id}`)}
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
      <View style={{ marginRight: "auto" }}>
        <Typo fontWeight={"500"}>{data.account_name}</Typo>
      </View>
      {/* <View>
        <TouchableOpacity>
          <Typo>+</Typo>
        </TouchableOpacity>
      </View> */}
      <View>
        <Typo fontWeight={"500"}>
          {currencySymbol}
          {data.balance}
        </Typo>
      </View>
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
