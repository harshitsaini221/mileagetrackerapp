import { View, Text, StyleSheet } from "react-native";
import GroupedExpense from "./GroupedExpense";
import { useContext } from "react";
import { ExpensesContext } from "../../store/expenses-context";
function ExpenseItem({expenses}) {
  // console.log("HELLO");
  // console.log(expenses);   
  // console.log("HELLO Expense"+expenses);   
  // console.log("INSIDE ID"+expenses.id);  
  // const expensesCtx = useContext(ExpensesContext);
  // const expenses = expensesCtx.expenses;
  // const expenses = [
  //   { title: 'Expense 1', date: '2023-01-15' },
  //   { title: 'Expense 2', date: '2023-01-22' },
  //   { title: 'Expense 3', date: '2023-02-10' },
  //   { title: 'Expense 4', date: '2023-02-18' }
  // ];
  // console.log(expenses);
  
  
  
  
  
  // Example usage: Iterate over the grouped expenses
  // console.log(expenses);
  // return <View></View>
  
  const content = <GroupedExpense groupedExpenses={expenses} />;

  return <View>{content}</View>;
}

export default ExpenseItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.5,
  },
  expenseItem: {
    padding: 12,
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
  },
  textBase: {
    color: "white",
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: 80,
  },
  amount: {
    color: "white",
    fontWeight: "bold",
  },
});
