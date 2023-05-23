import { useState, useContext } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import Input from "./Input";
import CustomPicker from "../UI/CustomPicker";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";
import { ExpensesContext } from "../../store/expenses-context";

function Form({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {
  const options = ["Regular"];
  const [selectedOption, setSelectedOption] = useState("Regular");
  const expensesCtx = useContext(ExpensesContext);
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };
  const lastOdometerValue = expensesCtx.findLargestOdometerValue().toFixed(2);
  const [inputs, setInputs] = useState({
    totalCost: {
      value: defaultValues ? defaultValues.totalCost.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      isValid: true,
    },
    odometer: {
      value: defaultValues ? defaultValues.odometer : "",
      isValid: true,
    },
    gas: {
      value: defaultValues ? defaultValues.gas : "",
      isValid: true,
    },
    pricePerLitre: {
      value: defaultValues ? defaultValues.pricePerLitre : "",
      isValid: true,
    },
    time: {
      value: defaultValues ? defaultValues.pricePerLitre : "",
      isValid: true,
    },
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  const expenseData = {
    totalCost: +inputs.totalCost.value,
    date: new Date(inputs.date.value),
    odometer: +inputs.odometer.value,
    gas: +inputs.gas.value,
    pricePerLitre: +inputs.pricePerLitre.value,
  };

  const latestDate = expensesCtx.findLatestDate();

  function submitHandler() {
    const totalCostIsValid =
      !isNaN(expenseData.totalCost) && expenseData.totalCost > 0;
    const dateIsValid =
      expenseData.date.toString() !== "Invalid Date";
    const odometerIsValid =
      !isNaN(expenseData.odometer) && expenseData.odometer >= lastOdometerValue;
    const gasIsValid =
      !isNaN(expenseData.gas) && expenseData.gas.toString().trim().length !== 0;
    const pricePerLitreIsValid =
      !isNaN(expenseData.pricePerLitre) &&
      expenseData.pricePerLitre.toString().trim().length !== 0;

    if (
      !totalCostIsValid ||
      !dateIsValid ||
      !odometerIsValid ||
      !gasIsValid ||
      !pricePerLitreIsValid
    ) {
      setInputs((curInputs) => {
        return {
          totalCost: {
            value: curInputs.totalCost.value,
            isValid: totalCostIsValid,
          },
          date: {
            value: curInputs.date.value,
            isValid: dateIsValid,
          },
          odometer: {
            value: curInputs.odometer.value,
            isValid: odometerIsValid,
          },
          gas: {
            value: curInputs.gas.value,
            isValid: gasIsValid,
          },
          pricePerLitre: {
            value: curInputs.pricePerLitre.value,
            isValid: pricePerLitreIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  }

  const formIsInvalid =
    !inputs.totalCost.isValid ||
    !inputs.date.isValid ||
    !inputs.odometer.isValid;

  return (
    <>
      <View style={styles.form}></View>
      <View style={styles.form}>
        <Text style={styles.label}>Odometer Reading (in kms)</Text>
        <View style={styles.rowContainer}>
          <Input
            icon="speedometer"
            invalid={!inputs.odometer.isValid}
            placeholder="Odometer (in kms)"
            keyboardType="decimal-pad"
            onChangeText={inputChangedHandler.bind(this, "odometer")}
            value={inputs.odometer.value}
            widthInput="90%"
          />
        </View>
        <Text style={styles.textLabel}>
          Previous Odometer Reading: {lastOdometerValue} kms
        </Text>
        <Text style={styles.label}>Gas (l)</Text>
        <View style={styles.rowContainer}>
          <View>
            <Input
              icon="gas-station"
              invalid={!inputs.gas.isValid}
              value={inputs.gas.value}
              keyboardType="decimal-pad"
              placeholder="Gas (l)"
              onChangeText={inputChangedHandler.bind(this, "gas")}
              widthInput="55%"
            />
          </View>
          <View style={styles.pickerContainer}>
            <CustomPicker
              options={options}
              selectedOption={selectedOption}
              onSelect={handleOptionSelect}
            />
          </View>
        </View>
        <Text style={styles.label}>Cost</Text>
        <View style={styles.rowContainer}>
          <View>
            <Input
              icon="cash-multiple"
              invalid={!inputs.pricePerLitre.isValid}
              value={inputs.pricePerLitre.value}
              placeholder="Price/l"
              onChangeText={inputChangedHandler.bind(this, "pricePerLitre")}
              keyboardType="decimal-pad"
              widthInput="55%"
            />
          </View>
          <View style={styles.totalCostContainer}>
            <Input
              icon="currency-usd"
              invalid={!inputs.totalCost.isValid}
              value={inputs.totalCost.value}
              placeholder="Total Cost"
              onChangeText={inputChangedHandler.bind(this, "totalCost")}
              keyboardType="decimal-pad"
              widthInput="55%"
            />
          </View>
        </View>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Date & Time</Text>
        <View style={styles.rowContainer}>
          <View>
            <View>
              <Input
                icon="calendar"
                invalid={!inputs.date.isValid}
                widthInput="55%"
                onChangeText={inputChangedHandler.bind(this, "date")}
                value={inputs.date.value}
              />
            </View>
            <Text style={styles.textLabel}>
              Format: YYYY-MM-DD, Last: {latestDate}
            </Text>
          </View>
          <View style={styles.totalCostContainer}>
            <Input
              icon="clock"
              widthInput="55%"
              editable={false}
              placeholder="19:51"
            />
          </View>
        </View>
      </View>
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your entered data!
        </Text>
      )}
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </>
  );
}

export default Form;

const styles = StyleSheet.create({
  form: {
    borderBottomWidth: 2,
    borderColor: "#5f6467",
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  label: {
    fontSize: 12,
    color: "white",
    opacity: 0.5,
    marginVertical: 12,
  },
  textLabel: {
    color: "white",
    opacity: 0.5,
    fontSize: 8,
    marginLeft: 36,
  },
  rowContainer: {
    flexDirection: "row",
  },
  pickerContainer: {
    width: "40%",
  },
  totalCostContainer: {
    marginLeft: -62,
    marginRight: 30,
    height: 40,
    marginBottom: 40,
  },
  errorText: {
    textAlign: "center",
    color: "red",
    margin: 8,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
