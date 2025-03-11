import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { radius } from "@/constants/theme";
import Typo from "./Typo";
import { LineChart } from "react-native-gifted-charts";
import { useLocales } from "expo-localization";

const AccountOverviewCard = ({ balance }: { balance: { value: number }[] }) => {
  const [{ currencySymbol }] = useLocales();
  const balanceOfAccounts = balance.reduce((a, b) => a + b.value, 0);
  return (
    <View style={styles.accountCardCtn}>
      <View style={{}}>
        <Typo size={14}>New Worth</Typo>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 15,
          }}
        >
          <Typo size={30} fontWeight={"600"}>
            {currencySymbol}
          </Typo>
          <Typo size={30} fontWeight={"600"}>
            {balanceOfAccounts}
          </Typo>
        </View>
      </View>
      <View style={{ top: 10 }}>
        <LineChart
          data={balance}
          curved
          color={"#ffffff8f"}
          hideAxesAndRules
          hideDataPoints
          spacing={10}
          height={60}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  accountCardCtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 130,
    marginBottom: 20,
    // marginHorizontal: 12,
    paddingHorizontal: 30,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: radius._15,
  },
});

export default AccountOverviewCard;
