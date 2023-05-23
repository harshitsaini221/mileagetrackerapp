import { View, Text, StyleSheet } from "react-native";
function ExpensesSummary({ expenses, periodName }) {
  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.totalCost;
  }, 0);
  return (
    <View style={styles.container}>
      <Text style={styles.period}> {periodName} </Text>
      <Text style={styles.sum}>₹{expensesSum.toFixed(2)}</Text>
    </View>
  );
}

export default ExpensesSummary;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: "#2e2f32",
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  period: {
    fontSize: 12,
    color: "white",
    opacity: 0.5,
  },
  sum:{
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  }
});
