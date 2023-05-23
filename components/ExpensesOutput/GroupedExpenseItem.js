import { View, Text, StyleSheet } from "react-native";
import { getFormattedDate } from "../../util/date";
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
function GroupedExpenseItem({ id, odometer, totalCost, date }) {
  const indexDate = new Date(getFormattedDate(date));
  const dateDisplay = getFormattedDate(date);
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayIndex = indexDate.getDay();
  const dayName = daysOfWeek[dayIndex];
  return (
    <View style={styles.expenseItem}>
    <FontAwesome5 name="gas-pump" size={16} color="white" style={styles.petrolIcon}/>
      <View style={styles.expenseDetailsContainer}>
        <Text style={styles.heading}>Refueling</Text>
        <Text style={styles.textDate}>
          {dayName}, {dateDisplay}
        </Text>
        <View style={styles.odometerContainer}>
          <Ionicons
            name="speedometer"
            size={12}
            color="#b0b1b2"
            style={styles.icon}
          />
          <Text style={[styles.textBase, styles.description]}>
            {odometer.toFixed(2)} kms
          </Text>
        </View>
      </View>
      <View style={styles.amountContainer}>
        <Text style={styles.amount}>₹ {totalCost.toFixed(2)}</Text>
      </View>
    </View>
  );
}

export default GroupedExpenseItem;

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    opacity: 0.5,
    marginBottom: 9,
  },
  expenseItem: {
    padding: 12,
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: -28,
  },
  textDate: {
    color: "white",
    opacity: 0.5,
    fontSize: 10,
    marginBottom: 9,
  },
  textBase: {
    color: "white",
    opacity: 0.5,
    fontSize: 14,
  },
  description: {
    fontSize: 14,
    marginBottom: 4,
    fontWeight: "bold",
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 80,
  },
  amount: {
    color: "#72797b",
    fontWeight: "bold",
  },
  icon: {
    marginLeft: 12,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  odometerContainer: {
    flexDirection: "row",
    alignItems: 'center',
    marginTop: 6,
  },
  petrolIcon: {
    backgroundColor: "#8ab4f8",
    padding: 8,
    height: 34,
    width: 34,
    borderRadius: 17,
    alignItems: 'center'
  },
  expenseDetailsContainer: {
    marginLeft: -70,

  },
});
