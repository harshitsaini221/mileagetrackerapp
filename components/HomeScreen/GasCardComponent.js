import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

const GasCardComponent = ({ title, iconName, colorHex, content }) => {
  return (
    <View style={styles.summaryItem}>
      <View style={styles.imageContainer}>
        <Feather
          name={iconName}
          size={14}
          color={colorHex}
          style={styles.icon}
        />
        <Text style={styles.summaryValue}>{content}</Text>
      </View>
      <Text style={styles.summaryLabel}>{title}</Text>
    </View>
  );
};

export default GasCardComponent;

const styles = StyleSheet.create({
  summaryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  summaryLabel: {
    fontSize: Platform.OS === "android" ? 10 : 12,
    color: "#515558",
    width: "40%",
    paddingRight: 4,
    textAlign: "right",
  },
  summaryValue: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "left",
  },
  icon: {
    paddingRight: 8,
    alignSelf: "center",
  },
});
