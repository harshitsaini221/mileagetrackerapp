import { FlatList, Text } from "react-native";
import ExpenseItem from "./ExpenseItem";
import React, { useEffect, useState } from "react";

function renderExpenseItem(itemData) {
  // console.log(itemData.item);
  // console.log(itemData)
  return <ExpenseItem {...itemData.item} />;
}

function ExpensesList({ expenses }) {
  const [updatedData, setUpdatedData] = useState(expenses);

  useEffect(() => {
    const newData = sortExpensesByDate(expenses);
    setUpdatedData(newData);
  }, []);

  const sortExpensesByDate = (expenses) => {
    console.log("AAAAAAAAA ", expenses);
    const sortedExpenses = expenses.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      console.log(dateA);
      console.log(dateB);
      return dateB - dateA;
    });
    return sortedExpenses;
  };

  const groupExpensesByMonth = (expenses) => {
    result = new Map();
    expenses.forEach(e=> {
      const date = new Date(e.date);
      const month = date.getMonth();
      const year = date.getFullYear();
      const key = `${year}-${month}`;
  
      if (!result.has(key)) {
        result.set(key, []);
      }
  
      result.get(key).push(e);
      
    });
    return result;
    // return expenses.reduce((result, expense) => {
    //   const date = new Date(expense.date);
    //   const month = date.getMonth();
    //   const year = date.getFullYear();
    //   const key = `${year}-${month}`;
  
    //   if (!result.has(key)) {
    //     result.set(key, []);
    //   }
  
    //   result.get(key).push(expense);
    //   return result;
    // }, new Map());
  };
  const groupedExpenses = groupExpensesByMonth(updatedData);
  const res = []
  
  let i = 0;
  for (const [key, value] of groupedExpenses) {
    // console.log(`Key: ${key}, Value: ${value}`);
    res.push({date: key, expenses: value, id: i})
    i++;
  }
  // groupedExpenses.forEach((key,value) => {
  //   // console.log("KEY:"+key);
    
  // });
  // console.log(groupedExpenses);
//   const res = Object.fromEntries(groupedExpenses);
//   [{
//     date: '',
//     expenses: [],
//   },
//   {date: '',
//   expenses: [],
// },
// ]
// console.log(res);
  return (
    <FlatList
      data={res}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default ExpensesList;
