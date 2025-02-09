import { Modal, Pressable, StyleSheet, View } from "react-native";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import ColorPicker, {
  HueSlider,
  Panel1,
  Preview,
  InputWidget,
  ColorPickerRef,
} from "reanimated-color-picker";
import Typo from "@/components/Typo";
import ScreenWrapper from "@/components/ScreenWrapper";
import { useRouter } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import { SelectColorProps } from "@/types";
import { colors } from "@/constants/theme";
import CreateModalHeader from "./CreateModalHeader";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const SelectColor = ({
  newCategory,
  onSelectColor,
  currentColor,
}: SelectColorProps) => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [color, setColor] = useState<string>(currentColor);

  useEffect(() => {
    setModalVisible(false);
  }, [router]);

  const handleCloseColorPicker = () => {
    onSelectColor({ hex: currentColor });
    setModalVisible(false);
  };

  const handleSelectColor = ({ hex }: { hex: string }) => {
    setColor(hex);
  };

  const handleConfirmColor = () => {
    onSelectColor({ hex: color });
    setModalVisible(false);
  };
  return (
    <View>
      <Pressable onPress={() => setModalVisible(true)}>
        <View
          style={{
            width: 100,
            aspectRatio: 1,
            backgroundColor: newCategory?.color,
            borderRadius: "100%",
            borderCurve: "circular",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FontAwesome6 name="droplet" size={30} color="white" />
          <View style={[styles.editSelectedEmoji, { width: 30, right: 5 }]}>
            <Entypo name="pencil" size={20} color="black" />
          </View>
        </View>
      </Pressable>
      {modalVisible && (
        <Modal
          presentationStyle="pageSheet"
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <ScreenWrapper modal centered>
            <CreateModalHeader
              createLabel="Confirm"
              onClose={handleCloseColorPicker}
              onCreate={handleConfirmColor}
            />
            <Typo size={20} fontWeight={"600"} style={{ marginTop: 20 }}>
              Select a color for the new category
            </Typo>
            <ColorPicker
              style={{ width: "100%", marginTop: 50 }}
              value={color}
              onChange={handleSelectColor}
            >
              <View
                style={{
                  width: "70%",
                  alignContent: "center",
                  marginHorizontal: "auto",
                }}
              >
                <Preview style={{ height: 50 }} />
                <Panel1 />
                <HueSlider />
                <InputWidget
                  iconStyle={{ display: "none", width: 0 }}
                  defaultFormat="HEX"
                  containerStyle={{
                    alignItems: "center",
                    marginTop: 20,
                  }}
                  inputStyle={{
                    color: "white",
                    width: "100%",
                  }}
                />
              </View>
            </ColorPicker>
          </ScreenWrapper>
        </Modal>
      )}
    </View>
  );
};
export default SelectColor;

const styles = StyleSheet.create({
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
  },
  btn: {
    width: "70%",
    marginTop: 30,
    marginHorizontal: 23,
    padding: 15,
    backgroundColor: colors.primary,
    borderRadius: 10,
    borderCurve: "continuous",
  },
});
