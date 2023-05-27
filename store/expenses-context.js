import { createContext, useReducer } from "react";
// import moment from 'moment';

export const ExpensesContext = createContext();

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "SET":
      const inverted = action.payload.reverse();
      return inverted;
    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function setExpenses(expenses) {
    dispatch({ type: "SET", payload: expenses });
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  const calculateTotalMoneySpent = () => {
    let total = 0;
    expensesState.forEach((expense) => {
      total += expense.totalCost;
    });
    return total;
  };

  const calculateTotalFuel = () => {
    let totalFuel = 0;
    const totalExpenses = expensesState.length;

    for (let i = 1; i < totalExpenses; i++) {
      const expense = expensesState[i];
      if (expense.gas) {
        totalFuel += expense.gas;
      }
    }

    return totalFuel;
  };

  const findLargestOdometerValue = () => {
    let largestOdometer = 0;
    expensesState.forEach((expense) => {
      if (expense.odometer > largestOdometer) {
        largestOdometer = expense.odometer;
      }
    });
    return largestOdometer;
  };

  const findLatestDate = () => {
    let latestDate = null;
    expensesState.forEach((expense) => {
      const expenseDate = new Date(expense.date);
      if (!latestDate || expenseDate > latestDate) {
        latestDate = expenseDate;
      }
    });
    return latestDate ? latestDate.toISOString().slice(0, 10) : null;
  };

  const findSecondLargestOdometerValue = () => {
    let largestOdometer = -Infinity;
    let secondLargestOdometer = -Infinity;
    expensesState.forEach((expense) => {
      const odometerValue = expense.odometer;
      if (odometerValue > largestOdometer) {
        secondLargestOdometer = largestOdometer;
        largestOdometer = odometerValue;
      } else if (
        odometerValue > secondLargestOdometer &&
        odometerValue !== largestOdometer
      ) {
        secondLargestOdometer = odometerValue;
      }
    });
    return secondLargestOdometer !== -Infinity ? secondLargestOdometer : null;
  };

  const fetchLastPricePerLitre = () => {
    const lastExpense = expensesState[0];
    return lastExpense ? lastExpense.pricePerLitre : null;
  };

  const lastGas = () => {
    let largestOdometer = -Infinity;
    let secondLargestOdometer = -Infinity;
    let gasOfSecondLargestOdometer = null;
    expensesState.forEach((expense) => {
      const odometerValue = expense.odometer;
      if (odometerValue > largestOdometer) {
        secondLargestOdometer = largestOdometer;
        largestOdometer = odometerValue;
      } else if (
        odometerValue > secondLargestOdometer &&
        odometerValue !== largestOdometer
      ) {
        secondLargestOdometer = odometerValue;
        gasOfSecondLargestOdometer = expense.gas;
      }
    });
    return gasOfSecondLargestOdometer;
  };

  const amountSpentInKthMonth = (k) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const targetMonth = (currentMonth - k + 12) % 12;
    const targetYear = currentYear - Math.floor((currentMonth - k) / 12);

    let totalAmount = 0;
    expensesState.forEach((expense) => {
      const expenseDate = new Date(expense.date);
      const expenseMonth = expenseDate.getMonth();
      const expenseYear = expenseDate.getFullYear();
      if (expenseMonth === targetMonth && expenseYear === targetYear) {
        totalAmount += expense.totalCost;
      }
    });

    return totalAmount;
  };

  const getKthMonthYearNames = (k) => {
    const monthNames = [
      "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
      "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
    ];
  
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
  
    const targetMonthIndex = (currentMonth - k + 12) % 12;
    const targetYear = targetMonthIndex > currentMonth ? currentYear - 1 : currentYear;
  
    const targetMonthName = monthNames[targetMonthIndex];
    const targetYearName = targetYear.toString();
    // console.log(targetMonthName);
    return {
      targetMonthName,
      targetYearName
    };
  };

  const value = {
    expenses: expensesState,
    setExpenses: setExpenses,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
    calculateTotalMoneySpent: calculateTotalMoneySpent,
    findLargestOdometerValue: findLargestOdometerValue,
    calculateTotalFuel: calculateTotalFuel,
    findLatestDate: findLatestDate,
    findSecondLargestOdometerValue: findSecondLargestOdometerValue,
    fetchLastPricePerLitre: fetchLastPricePerLitre,
    lastGas: lastGas,
    amountSpentInKthMonth: amountSpentInKthMonth,
    getKthMonthYearNames: getKthMonthYearNames,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
