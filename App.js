import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import RecentExpensesScreen from "./screens/RecentExpensesScreen";
import HomeScreen from "./screens/HomeScreen";
import TimelinesScreen from "./screens/TimelinesScreen";
import AddExpenseScreen from "./screens/AddExpenseScreen";
import FloatingButton from "./components/UI/FloatingButton";
import { StatusBar } from "expo-status-bar";
import IconButton from "./components/UI/IconButton";
import ExpensesContextProvider from "./store/expenses-context";

const BottomTab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigation({ navigation }) {
  return (
    <>
      <BottomTab.Navigator
        screenOptions={({ navigation }) => ({
          headerStyle: { backgroundColor: "#2e2f32" },
          headerTintColor: "white",
          tabBarStyle: { backgroundColor: "#2e2f32" },
          tabBarActiveTintColor: "#8ab4f8",
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="history"
              size={24}
              color={tintColor}
              onPress={() => {
                navigation.navigate("RecentExpenses");
              }}
            />
          ),
        })}
      >
        <BottomTab.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: "Summary",
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="home" size={size} color={color} />
            ),
          }}
        />
        <BottomTab.Screen
          name="TimelineScreen"
          component={TimelinesScreen}
          options={{
            title: "Timeline",
            tabBarLabel: "Timeline",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="timeline" size={size} color={color} />
            ),
          }}
        />
      </BottomTab.Navigator>
      <FloatingButton
        icon="add-outline"
        size={24}
        color="white"
        onPress={() => navigation.navigate("AddExpense")}
      />
    </>
  );
}

const App = () => {
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="bottomTab"
              component={TabNavigation}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddExpense"
              component={AddExpenseScreen}
              options={{
                title: "Add Expense",
                presentation: "modal",
                headerStyle: { backgroundColor: "#2e2f32" },
                headerTintColor: "white",
              }}
            />
            <Stack.Screen
              name="RecentExpenses"
              component={RecentExpensesScreen}
              options={{
                title: "Recents",
                presentation: "modal",
                headerStyle: { backgroundColor: "#2e2f32" },
                headerTintColor: "white",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
};

export default App;
