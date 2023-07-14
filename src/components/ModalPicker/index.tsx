import React from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";

import { CategoryProps } from "../../pages/Order";

interface ModalPickerProps {
  options: CategoryProps[];
  handleCloseModal: () => void;
  selectedItem: (item: CategoryProps) => void;
}

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

export function ModalPicker({
  options,
  handleCloseModal,
  selectedItem,
}: ModalPickerProps) {
  function onPressItem(item: CategoryProps) {
    // console.log(item);
    selectedItem(item);
    handleCloseModal();
  }

  const option = options.map((item, index) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.option}
        onPress={() => onPressItem(item)}
      >
        <Text style={styles.item}>{item?.name}</Text>
      </TouchableOpacity>
    );
  });

  return (
    <TouchableOpacity style={styles.container} onPress={handleCloseModal}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>{option}</ScrollView>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: WIDTH - 50,
    height: HEIGHT / 2,
    backgroundColor: "#101026",
    borderRadius: 4,
  },
  option: {
    alignItems: "flex-start",
    backgroundColor: "#1D1D2E",
    marginVertical: 4,
    marginHorizontal: 6,
    borderRadius: 4,
  },
  item: {
    margin: 18,
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFF",
  },
});
