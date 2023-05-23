import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const Title = ({ icon, text }) => {
  return (
    <View style={styles.container}>
      <MaterialIcons
        name={icon}
        size={18}
        color="#8ab4f8"
        style={styles.icon}
      />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2e2f32",
    borderRadius: 16,
    padding: 10,
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    marginTop: 10
  },
  icon: {
    marginRight: 4,
    paddingLeft: 8,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    opacity: 0.50,
    paddingLeft: 4,
    paddingRight: 10,
  },
});

export default Title;
