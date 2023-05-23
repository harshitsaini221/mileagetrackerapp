import { View, StyleSheet, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const ListCardComponent = ({content }) => {
  return (
    <View style={styles.summaryItem}>
      <View style={styles.imageContainer}>
        <FontAwesome5
          name="gas-pump"
          size={14}
          color="#8ab4f8"
          style={styles.icon}
        />
        <Text style={styles.summaryValue}>₹ {content}</Text>
      </View>
      <Text style={styles.summaryLabel}>Refueling</Text>
    </View>
  );
};

export default ListCardComponent;

const styles = StyleSheet.create({
  expenditureMonthText: {
    color: "#fff",
    fontSize: 10,
    marginBottom: 6,
    opacity: 0.5,
  },
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
