import React, {useState, useContext, useEffect} from "react";
import { View, Text, StyleSheet, Platform, ScrollView } from "react-native";
import Card from "../components/UI/Card";
import Title from "../components/UI/Title";
import CostCardComponent from "../components/HomeScreen/CostCardComponent";
import GasCardComponent from "../components/HomeScreen/GasCardComponent";
import ListCardComponent from "../components/HomeScreen/ListCardComponent";
import { ExpensesContext } from "../store/expenses-context";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import {fetchExpenses} from '../util/http'

const HomeScreen = () => {
  const [isFetching, setIsFetching] = useState(true);
  const expensesCtx = useContext(ExpensesContext);
  const [error, setError] = useState();

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

  const odometer = expensesCtx.findLargestOdometerValue();
  const totalMoney = expensesCtx.calculateTotalMoneySpent();
  const totalFuel = expensesCtx.calculateTotalFuel();
  const latestDate = expensesCtx.findLatestDate();
  const secondLargestOdometer = expensesCtx.findSecondLargestOdometerValue();
  let ppl;
  const thisMonth = expensesCtx.amountSpentInKthMonth(0).toFixed(2);
  const previousMonth = expensesCtx.amountSpentInKthMonth(1).toFixed(2);
  const thirdMonth = expensesCtx.amountSpentInKthMonth(2).toFixed(2);
  const fourthMonth = expensesCtx.amountSpentInKthMonth(3).toFixed(2);
  const fifthMonth = expensesCtx.amountSpentInKthMonth(4).toFixed(2);
  const sixthMonth = expensesCtx.amountSpentInKthMonth(5).toFixed(2);
  const gasConsumption = expensesCtx.lastGas();
  let lastAverage = ((odometer - secondLargestOdometer)/gasConsumption).toFixed(3);
  let average = (odometer/totalFuel).toFixed(3);
  if(expensesCtx.fetchLastPricePerLitre()){
    ppl = expensesCtx.fetchLastPricePerLitre().toFixed(2);
  }else{
    ppl = 0.00
  }
  ppl = "₹ "+ppl;
  average = isNaN(average) ? "0.00" : average;
  average = average.toString() + " km/l"
  lastAverage = isNaN(lastAverage) ? "0.00" : lastAverage;
  lastAverage = lastAverage.toString() + " km/l"
  const arr = [];
  for(let i = 2; i<=5;i++){
    const { targetMonthName, targetYearName } = expensesCtx.getKthMonthYearNames(i);
    arr.push(targetMonthName); // -> even idexes: monthNames, 0 -> 2, 2 -> 3, 4-> 4
    arr.push(targetYearName); // -> odd indexes: year
  }

  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.section}>
        <Title icon="local-gas-station" text="Gas" />
        {/* Add your components for the mileage summary here */}
        <Card>
          <GasCardComponent
            title="Average Fuel Consumption"
            iconName="droplet"
            colorHex="#8ab4f8"
            content={average}
          />
          <GasCardComponent
            title="Last Fuel Consumption"
            iconName="trending-up"
            colorHex="#58a447"
            content={lastAverage}
          />
          <GasCardComponent
            title="Last Fuel Cost"
            iconName="dollar-sign"
            colorHex="#e45942"
            content={ppl}
          />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}></Text>
            <Text style={styles.summaryLabel}>Last Updated: {latestDate}</Text>
          </View>
        </Card>
      </View>

      <View style={styles.section}>
        <Title icon="attach-money" text="Costs" />
        <Card>
          <View style={styles.costCard}>
            <Text style={styles.expenditureMonthText}>THIS MONTH</Text>
            <CostCardComponent
              iconName="gas-pump"
              category="Gas"
              content={thisMonth}
            />
            <CostCardComponent
              iconName="money-bill"
              category="Others"
              content="0.00"
            />
          </View>
          <View style={styles.costCard}>
            <Text style={styles.expenditureMonthText}>PREVIOUS MONTH</Text>
            <CostCardComponent
              iconName="gas-pump"
              category="Gas"
              content={previousMonth}
            />
            <CostCardComponent
              iconName="money-bill"
              category="Others"
              content="0.00"
            />
          </View>
        </Card>
      </View>

      <View style={styles.section}>
        <Title icon="timeline" text="Last Entries" />
        {/* Add your components for last entries here */}
        <Card>
          <View>
            <Text style={styles.expenditureMonthText}>{arr[0]} {arr[1]}</Text>
            <ListCardComponent content={thirdMonth} />
          </View>
          <View>
            <Text style={styles.expenditureMonthText}>{arr[2]} {arr[3]}</Text>
            <ListCardComponent content={fourthMonth} />
          </View>
          <View>
            <Text style={styles.expenditureMonthText}>{arr[4]} {arr[5]}</Text>
            <ListCardComponent content={fifthMonth} />
          </View>
          <View>
            <Text style={styles.expenditureMonthText}>{arr[6]} {arr[7]}</Text>
            <ListCardComponent content={sixthMonth} />
          </View>
        </Card>
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202124",
    padding: 16,
  },
  icon: {
    paddingRight: 8,
    alignSelf: "center",
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  section: {
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
  },
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
  entryText: {
    color: "#fff",
  },
  thisMonthConatiner: {
    flexDirection: "column",
  },
  costCard: {
    marginBottom: 5,
  },
});

export default HomeScreen;
