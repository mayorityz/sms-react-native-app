import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const LoadWallett = ({ navigation }) => {
  const [amount, setAmount] = useState("");
  return (
    <>
      <View style={{ margin: 20 }}>
        <Text style={{ fontSize: 30, padding: 5, textAlign: "center" }}>
          Hi, Mayowa!
        </Text>
        <Text style={{ fontSize: 20, paddingLeft: 5, textAlign: "center" }}>
          You currently have 5000 credit units left!!
        </Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <AntDesign name="wallet" size={67} color="black" />
      </View>
      <View style={style.formView}>
        <View>
          <Text style={{ fontSize: 20, textAlign: "center" }}>
            Buy More Units.
          </Text>
          <TextInput
            placeholder="Enter Amount ..."
            keyboardType="numeric"
            keyboardAppearance="dark"
            textAlign="center"
            value={amount}
            onChangeText={setAmount}
            style={{
              height: 50,
              padding: 10,
              borderColor: "#731963",
              borderWidth: 1,
              width: "100%",
              marginVertical: 20,
              fontSize: 30,
            }}
          />
          <TouchableOpacity style={style.customBtn}>
            <Text style={{ color: "#fff" }}>
              <AntDesign name="wallet" size={17} color="#fff" />{" "}
              {amount === "" ? "Buy Now" : ` Buy ${amount} More Units`}
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              marginVertical: 20,
              textAlign: "center",
              textDecorationStyle: "solid",
              textDecorationLine: "underline",
              textDecorationColor: "blue",
            }}
            onPress={() => navigation.navigate("SendAirTime")}
          >
            SEND CREDIT TO MY FRIENDS & FAMILY
          </Text>
        </View>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  formView: {
    margin: 20,
    height: 350,
    display: "flex",
    justifyContent: "center",
    // alignContent: "center",
    backgroundColor: "#f6f6f6",
    padding: 20,
  },
  customBtn: {
    backgroundColor: "#731963",
    height: 70,
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoadWallett;
