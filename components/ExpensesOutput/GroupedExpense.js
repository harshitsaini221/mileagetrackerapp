import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { getFormattedDate } from "../../util/date";
import GroupedExpenseItem from "./GroupedExpenseItem";
import { FontAwesome5 } from "@expo/vector-icons";
// const GroupedExpense = ({ groupedExpenses }) => {
//   const renderExpenses = () => {
//     const uniqueExpenses = new Set();
//     groupedExpenses.forEach((date,exps) => {
//       exps.forEach((exp) => {
//         uniqueExpenses.add(exp.title);
//       });
//     });

//     return Array.from(uniqueExpenses).map((expense, index) => (
//       <Text key={index} style={styles.expenseItem}>
//         {expense}
//       </Text>
//     ));
//   };

//   return <View style={styles.container}>{renderExpenses()}</View>;
// };

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: 16,
//     paddingTop: 16,
//   },
//   expenseItem: {
//     fontSize: 16,
//     marginBottom: 4,
//   },
// });
function renderExpenseItem(itemData) {
  // console.log(itemData.item);
  // console.log(itemData)
  return <GroupedExpenseItem {...itemData.item} />;
}

const GroupedExpense = ({ groupedExpenses }) => {
  // const x = groupedExpenses.entries();

  const monthName = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];

  console.log(groupedExpenses);
  const indexMonth = groupedExpenses[0].date.getMonth();
  const nameMonth = monthName[indexMonth];
  const indexYear = new Date(getFormattedDate(groupedExpenses[0].date));
  const nameYear = indexYear.getFullYear();
  return (
    <>
      <FontAwesome5
        name="calendar-day"
        size={12}
        color="white"
        style={styles.icon}
      />
      <View style={styles.container}>
        <Text style={styles.monthHeader}>
          {nameMonth} {nameYear}
        </Text>
        <FlatList
          data={groupedExpenses}
          renderItem={renderExpenseItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </>
  );
  // groupedExpenses.map((expense,index)=> {
  //   return  <View key={index}>
  //   <Text >{expense.odometer}</Text>

  //     <Text key={index} >{expense.totalCost}</Text>

  // </View>
  // })

  // return <FlatList></FlatList>;
  // [{date: '',expense: {}}]
  // return (

  // <View style={styles.container}>
  //   {Array.from(groupedExpenses.entries()).map(({month, expenses}) => (
  //     <View key={month}>
  //       <Text style={styles.monthHeader}>{month}</Text>
  //       {expenses.map((expense, index) => (
  //         <Text key={index} style={styles.expenseItem}>{expense.title}</Text>
  //       ))}
  //     </View>
  //   ))}
  // </View>
  // );
};

const styles = StyleSheet.create({
  monthHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#8ab4f8",
    marginLeft: 16,
    marginTop: 8,
  },
  container: {
    borderLeftColor: "#8ab4f8",
    borderLeftWidth: 4,
    marginTop: 2,
    marginLeft: 13,
  },
  icon: {
    backgroundColor: "#8ab4f8",
    padding: 8,
    height: 28,
    width: 28,
    borderRadius: 14,
    marginBottom: -4,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default GroupedExpense;
