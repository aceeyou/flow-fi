import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";

const Welcome = () => {
  return (
    <ScreenWrapper>
      <Typo fontWeight={"600"}>
        Welcome to <Typo mono>flow-fi</Typo>
      </Typo>
    </ScreenWrapper>
  );
};

export default Welcome;

const styles = StyleSheet.create({});
