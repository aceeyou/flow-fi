import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import Typo from "./Typo";
import Ionicons from "@expo/vector-icons/Ionicons";

const KeyItem = ({
  num,
  amount,
  handleClick,
}: {
  num: string;
  amount: string;
  handleClick: (num: string) => void;
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        amount === "0" ? handleClick(num) : handleClick(`${amount}${num}`);
      }}
      activeOpacity={0.25}
      style={styles.keyStyles}
    >
      <Typo size={30} style={{}}>
        {num}
      </Typo>
    </TouchableOpacity>
  );
};

const CalculatorPad = ({
  onPress,
  amount,
}: {
  onPress: (num: string) => void;
  amount: string;
}) => {
  const handleBackspace = () => {
    amount.toString().slice(0, -1) == ""
      ? onPress("0")
      : onPress(`${amount.toString().slice(0, -1)}`);
  };

  return (
    <View
      style={{
        marginTop: 50,
        width: "100%",
        height: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      <KeyItem amount={amount} num={"7"} handleClick={onPress} />
      <KeyItem amount={amount} num={"8"} handleClick={onPress} />
      <KeyItem amount={amount} num={"9"} handleClick={onPress} />
      <KeyItem amount={amount} num={"4"} handleClick={onPress} />
      <KeyItem amount={amount} num={"5"} handleClick={onPress} />
      <KeyItem amount={amount} num={"6"} handleClick={onPress} />
      <KeyItem amount={amount} num={"1"} handleClick={onPress} />
      <KeyItem amount={amount} num={"2"} handleClick={onPress} />
      <KeyItem amount={amount} num={"3"} handleClick={onPress} />
      <TouchableOpacity
        activeOpacity={0.25}
        style={styles.keyStyles}
        onPress={() => onPress(`${amount}.`)}
      >
        <Typo size={30} style={{}}>
          .
        </Typo>
      </TouchableOpacity>
      <KeyItem amount={amount} num={"0"} handleClick={onPress} />
      <TouchableOpacity
        activeOpacity={0.25}
        style={styles.keyStyles}
        onPress={handleBackspace}
      >
        <Ionicons name="backspace-outline" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default CalculatorPad;

const styles = StyleSheet.create({
  keyStyles: { width: "33%", paddingVertical: 20, alignItems: "center" },
});
