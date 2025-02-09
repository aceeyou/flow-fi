import { Modal, Pressable, StyleSheet } from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import CreateCategory from "@/components/CreateCategory";

const Settings = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  return (
    <ScreenWrapper>
      <Pressable onPress={() => setShowForm(true)}>
        <Typo>Add a category</Typo>
      </Pressable>
      <Modal
        animationType="slide"
        visible={showForm}
        presentationStyle="pageSheet"
        onRequestClose={() => setShowForm(false)}
      >
        <CreateCategory setShowForm={setShowForm} />
      </Modal>
    </ScreenWrapper>
  );
};

export default Settings;

const styles = StyleSheet.create({});
