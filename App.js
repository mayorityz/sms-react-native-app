import React from "react";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";

import gift from "./components/images/gift1.png";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./components/navigations/Home";
import LoadWallett from "./components/navigations/wallet/LoadWallet";
import AirtimeMany from "./components/navigations/airtime.jsx/AirtimeMany";
import Login from "./components/screens/Login";
import Register from "./components/screens/Register";

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="register"
          component={Register}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Welcome",
          }}
        />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen
          name="LoadWallet"
          component={LoadWallett}
          options={{
            title: "Load Your Wallet!",
          }}
        />
        <Stack.Screen
          name="SendAirTime"
          component={AirtimeMany}
          options={{
            title: "Share Air Time",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const landingPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome Mayor</Text>
      <View style={styles.scrollContainer}>
        <ScrollView style={styles.scroll} horizontal={true}>
          <View style={styles.intro_cards}>
            <Image source={gift} style={{ width: "100%", height: "100%" }} />
            <Text style={styles.card_text}>Gift Your Friend & Family</Text>
          </View>
          <View style={styles.intro_cards}>
            <Text style={styles.card_text}>My Name</Text>
          </View>
          <View style={styles.intro_cards}>
            <Text style={styles.card_text}>My Name</Text>
          </View>
          <View style={styles.intro_cards}>
            <Text style={styles.card_text}>My Name</Text>
          </View>
        </ScrollView>
      </View>

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9c2fff",
    marginTop: 29,
    // alignItems: "center",
    // justifyContent: "center",
  },
  intro_cards: {
    height: 500,
    width: Dimensions.get("window").width - 50,
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#b16def",
    marginRight: 10,
  },
  welcomeText: {
    fontSize: 30,
    padding: 10,
  },
  scrollContainer: {
    paddingLeft: 15,
  },
  card_text: {
    width: 200,
    fontWeight: "bold",
    fontSize: 20,
    position: "absolute",
    top: 0,
    right: 0,
    padding: 10,
  },
});
