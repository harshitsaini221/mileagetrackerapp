import axios from "axios";

const BACKEND_URL =
  "Enter Your DB Link Here (I Used Firebase)";

export async function storeExpense(expenseData) {
  const response = await axios.post(
    BACKEND_URL + "/expenses.json",
    expenseData
  );
  const id = response.data.name;
  return id;
}

export async function fetchExpenses() {
  const response = await axios.get(BACKEND_URL + "expenses.json");

  const expenses = [];

  console.log(response.data);

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      totalCost: response.data[key].totalCost,
      date: new Date(response.data[key].date),
      odometer: response.data[key].odometer,
      gas: response.data[key].gas,
      pricePerLitre: response.data[key].pricePerLitre,
    };
    expenses.push(expenseObj);
  }
  return expenses;
}

export function updateExpense(id, expenseData) {
  return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
}

export function deleteExpense(id) {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}
