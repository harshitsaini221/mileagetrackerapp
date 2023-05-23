import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Input = ({ widthInput, icon, placeholder, invalid, ...rest }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  // const inputStyles = [styles.input];

  // if (invalid) {
  //   inputStyles.push(styles.invalidInput);
  // }

  return (
    <View style={styles.mainContainer}>
      <View>
        <MaterialCommunityIcons
          name={icon}
          size={24}
          color="#8ab4f8"
          style={styles.icon}
        />
      </View>
      <View style={styles.container}>
        <TextInput
          {...rest}
          style={[styles.input, { color: isFocused ? "white" : "#ccc" } ]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          width={widthInput}
          placeholder={placeholder}
          placeholderTextColor="#72797b"
        />
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  icon: {
    marginRight: 10,
    marginTop: 6,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  input: {
    height: 35,
    opacity: 0.6,
    color: "white",
  },
  // invalidLabel: {
  //   color: 'red',
  // },
  // invalidInput: {
  //   backgroundColor: "#ffdedb"
  // },
});
