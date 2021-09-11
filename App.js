import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  ActivityIndicator,
} from "react-native";

/**
 * !todo
 * app loading screen ...
 * load/fetch friend ...
 * check that the amount is removed from the wallet... n stop it from changing on the backend as well.
 */

import gift from "./components/images/gift1.png";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./components/navigations/Home";
import LoadWallett from "./components/navigations/wallet/LoadWallet";
import AirtimeMany from "./components/navigations/airtime.jsx/AirtimeMany";
import Login from "./components/screens/Login";
import Register from "./components/screens/Register";
import Pay from "./components/screens/Paystack";
import DataHandler from "./components/navigations/data/Index";

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedin, setLoggedStatus] = useState(null);
  const [appLoading, setLoading] = useState(true);

  useEffect(() => {
    getData();
    // setLoading(false);
    // aysnc(() => {
    //   let vvalue = await AsyncStorage.getItem("isLoggedIn");
    //   if (vvalue !== null) {
    //     setLoading(false);
    //   } else {
    //     setLoading(false);
    //   }
    // })();
  }, [isLoggedin]);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("isLoggedIn");
      if (value !== null) {
        setLoggedStatus(true);
      } else setLoggedStatus(false);
    } catch (e) {
      console.log("app : error :", e.message);
    }
    setLoading(false);
  };

  if (appLoading) return <ActivityIndicator size="large" color="black" />;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isLoggedin && (
          <>
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
          </>
        )}

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
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

        <Stack.Screen
          name="paystack"
          component={Pay}
          options={{
            title: "Load Wallet",
          }}
        />
        <Stack.Screen
          name="data"
          component={DataHandler}
          options={{
            title: "Share Data",
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
