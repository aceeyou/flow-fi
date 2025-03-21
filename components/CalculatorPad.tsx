import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Typo from "./Typo";

const KeyItem = ({ num }: { num: string | number }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.25}
      style={{ width: "24%", paddingVertical: 20, alignItems: "center" }}
    >
      <Typo size={30} style={{}}>
        {num}
      </Typo>
    </TouchableOpacity>
  );
};

const CalculatorPad = () => {
  return (
    <View
      style={{
        marginTop: 50,
        // backgroundColor: "black",
        width: "100%",
        height: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      <KeyItem num={7} />
      <KeyItem num={8} />
      <KeyItem num={9} />
      <KeyItem num={"+ / -"} />
      <KeyItem num={4} />
      <KeyItem num={5} />
      <KeyItem num={6} />
      <KeyItem num={"× / ÷"} />
      <KeyItem num={1} />
      <KeyItem num={2} />
      <KeyItem num={3} />
      <KeyItem num={"="} />
      <KeyItem num={""} />
      <KeyItem num={0} />
      <KeyItem num={"."} />
      <KeyItem num={"save"} />
    </View>
  );
};

export default CalculatorPad;

const styles = StyleSheet.create({});
