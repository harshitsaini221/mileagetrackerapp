import { FlatList, Text } from "react-native";
import ExpenseItem from "./ExpenseItem";

function renderExpenseItem(itemData) {
  // console.log(itemData.item);
  // console.log(itemData)
  return <ExpenseItem {...itemData.item} />;
}

function ExpensesList({ expenses }) {
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
  const groupedExpenses = groupExpensesByMonth(expenses);
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
