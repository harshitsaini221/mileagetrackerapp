import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CustomPicker = ({ options, selectedOption, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dropdownHeader} onPress={toggleDropdown}>
        <Text style={styles.dropdownHeaderText}>{selectedOption}</Text>
        <Ionicons
          name={isOpen ? "chevron-up" : "chevron-down"}
          style={styles.dropdownIcon}
        />
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.dropdownList}>
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              style={styles.dropdownOption}
              onPress={() => handleOptionSelect(option)}
            >
              <Text style={styles.dropdownOptionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default CustomPicker;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    zIndex: 1,
    marginEnd: 25,
    marginStart: -35,
  },
  dropdownHeader: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  dropdownHeaderText: {
    flex: 1,
    color: "white",
    padding: Platform.OS === "android" ? 0 : 3,
  },
  dropdownIcon: {
    marginLeft: 5,
    color: "#ccc",
  },
  dropdownList: {
    position: "absolute",
    top: "100%",
    width: "100%",
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  dropdownOption: {
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  dropdownOptionText: {
    fontSize: 16,
  },
});
