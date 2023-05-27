import { useState, useContext, useEffect } from "react";
import { ExpensesContext } from "../store/expenses-context";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import { fetchExpenses } from "../util/http";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";

function TimelinesScreen() {
  const [isFetching, setIsFetching] = useState(true);
  const expensesCtx = useContext(ExpensesContext);
  const [error, setError] = useState();

  // console.log(expensesCtx);

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      let expenses;
      try {
        expenses = await fetchExpenses();
      } catch (error) {
        setError("Unable to Fetch Expenses");
      }
      setIsFetching(false);
      expensesCtx.setExpenses(expenses);
    }
    getExpenses();
  }, []);

  function errorHandler() {
    setError(null);
  }

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <ExpensesOutput
      expenses={expensesCtx.expenses}
      expensesPeriod="Total"
      fallbackText="No Expenses Registered"
    />
  );
}

export default TimelinesScreen;



//component for Timeline Screen
