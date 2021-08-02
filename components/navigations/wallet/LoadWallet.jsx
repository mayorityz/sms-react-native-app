import React, { useState, useRef, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import PaystackWebView from "react-native-paystack-webview";
import { updateWallet } from "./../../API";

const LoadWallett = ({ navigation }) => {
  const paystackWebViewRef = useRef();
  const [amount, setAmount] = useState("");
  const [userData, setUserData] = useState({});

  useEffect(() => {
    (async () => {
      const details = await AsyncStorage.getItem("userdetails");
      setUserData(JSON.parse(details));
    })();
  }, []);

  const success = async (res) => {
    try {
      // update the wallet
      await updateWallet({
        username: userData.username,
        email: userData.email,
        amountPaid: amount,
        userid: userData._id,
      });

      // update the local wallet...
      const dataClone = { ...userData };

      dataClone.wallet
        ? (dataClone.wallet = parseInt(amount) + parseInt(dataClone.wallet))
        : (dataClone.wallet = amount);
      await AsyncStorage.setItem("userdetails", JSON.stringify(dataClone));

      setUserData(dataClone);
      setAmount("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View style={style.banner}>
        <Text
          style={{
            fontSize: 30,
            padding: 5,
            textAlign: "center",
            color: "#fff",
          }}
        >
          Hi, {userData.username}!
        </Text>
        <Text
          style={{
            fontSize: 20,
            paddingLeft: 5,
            textAlign: "center",
            color: "#fff",
          }}
        >
          You currently have {userData.wallet || 0} credit units left!!
        </Text>
        <View>
          <AntDesign name="wallet" size={47} color="white" />
        </View>
      </View>

      <View style={style.formView}>
        <View>
          <Text style={{ fontSize: 20, textAlign: "center" }}>
            Buy More Credit Units.
          </Text>
          <TextInput
            placeholder="Enter Amount ..."
            keyboardType="numeric"
            keyboardAppearance="dark"
            textAlign="center"
            value={amount}
            onChangeText={setAmount}
            style={{
              height: 40,
              padding: 5,
              borderColor: "#070808",
              borderWidth: 1,
              width: "100%",
              marginVertical: 10,
              fontSize: 20,
            }}
          />
          <TouchableOpacity
            style={style.customBtn}
            onPress={() => paystackWebViewRef.current.StartTransaction()}
          >
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
        <PaystackWebView
          buttonText="Pay Now"
          showPayButton={false}
          paystackKey="pk_test_bc48b82a5b55f798dc32585168da50254ab0f9c9"
          amount={amount}
          billingEmail={userData.email}
          billingMobile={userData.phone}
          billingName={userData.username}
          ActivityIndicatorColor="green"
          SafeAreaViewContainer={{ marginTop: 5 }}
          SafeAreaViewContainerModal={{ marginTop: 5 }}
          onCancel={(e) => {
            // handle response here
            // just show and every message
            console.log(e);
            console.log(e.status);
          }}
          onSuccess={success}
          autoStart={false}
          ref={paystackWebViewRef}
          refNumber={
            userData.username + +Math.floor(Math.random() * 1000000000 + 1)
          }
        />
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
    backgroundColor: "#070808",
    height: 50,
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  banner: {
    height: 250,
    width: "100%",
    backgroundColor: "#070808",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoadWallett;
