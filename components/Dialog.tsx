import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import Typo from "./Typo";
import { DialogProps } from "@/types";
import { colors, radius } from "@/constants/theme";

const Dialog = ({
  title,
  message,
  confirmText,
  onConfirm,
  onCancel,
}: DialogProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onCancel}>
      <View style={styles.card}>
        <View style={styles.textContainer}>
          <Typo color="black" size={18} fontWeight={600}>
            {title}
          </Typo>
          <Typo color="black" size={15}>
            {message}
          </Typo>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, styles.cancelBtn]}
            onPress={onCancel}
          >
            <Typo color={colors.neutral400}>Cancel</Typo>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.confirmBtn]}
            onPress={onConfirm}
          >
            <Typo fontWeight={500}>{confirmText}</Typo>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Dialog;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.sectionTitle_bg,
    justifyContent: "center",
    alignItems: "center",
    paddingBlock: 8,
  },
  card: {
    backgroundColor: "white",
    padding: 15,
    width: "80%",
    borderRadius: radius._6,
  },
  textContainer: {
    gap: 8,
    marginBottom: 22,
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  button: {
    backgroundColor: colors.neutral200,
    alignItems: "center",
    flex: 1,
    paddingBlock: 8,
    borderRadius: radius._6,
  },
  cancelBtn: {},
  confirmBtn: {
    backgroundColor: colors.red,
  },
});
