import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Typo from "./Typo";
import { colors, radius } from "@/constants/theme";
import { HeadsUpProps } from "@/types";

import Feather from "@expo/vector-icons/Feather";

const HeadsUp = ({ balance }: HeadsUpProps) => {
  const [balanceVisible, setBalanceVisible] = useState(false);
  const handleViewBalance = () => {
    setBalanceVisible((cur) => !cur);
  };
  return (
    <View style={[styles.container]}>
      <View style={[styles.card]}>
        <Typo size={14}>Account Balance</Typo>
        <View style={[styles.balanceView]}>
          <Typo size={40} mono color={balanceVisible ? colors.white : "gray"}>
            P {balanceVisible ? balance : "*****"}
          </Typo>
          <TouchableOpacity onPress={handleViewBalance}>
            <Feather
              name={balanceVisible ? "eye" : "eye-off"}
              size={20}
              color="white"
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.quickTransactionControl]}>
          <TouchableOpacity style={[styles.quickBtn]}>
            <Typo style={{ alignSelf: "center" }} size={15}>
              Pay
            </Typo>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.quickBtn]}>
            <Typo style={{ alignSelf: "center" }} size={15}>
              Transfer
            </Typo>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HeadsUp;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    paddingHorizontal: 15,
  },
  card: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: radius._15,
    borderCurve: "continuous",

    aspectRatio: "16 / 7",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  balanceView: {
    paddingTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  quickTransactionControl: {
    flexDirection: "row",
    marginTop: "auto",
    gap: 6,
  },
  quickBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "gray",
    paddingVertical: 6,
    borderRadius: radius._10,
    borderCurve: "continuous",
  },
});
