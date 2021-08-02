import React, { useState } from "react";
import { login } from "./../API";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import logo from "./../../assets/icon.png";

const Login = ({ navigation }) => {
  const [alert, setAlert] = useState({ status: false, message: "" });
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const loginUser = async () => {
    setAlert({ status: true, message: "Checking Your Credentials ..." });

    if (phone === "" || password === "") {
      setAlert({
        status: true,
        message: "Please Fill All Fields To Proceed!!!.",
      });
    } else {
      try {
        const response = await login({ phone, password });

        if (response.success === true) {
          setAlert({ status: true, message: "Logged Successfully ..." });
          await AsyncStorage.setItem("isLoggedIn", "true");
          await AsyncStorage.setItem(
            "userdetails",
            JSON.stringify(response.message)
          );

          navigation.navigate("Home");
        } else {
          setAlert({ status: true, message: response.message });
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <View style={myStyle.layout}>
      <View style={{ width: "70%", marginTop: 40 }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 40,
          }}
        >
          <Image source={logo} style={myStyle.logo} />
          <Text style={{ fontWeight: "bold" }}>Only Geng.</Text>
        </View>
        <Text
          style={[
            Style.label,
            {
              fontSize: 24,
              marginBottom: 10,
              textAlign: "center",
              fontWeight: "bold",
            },
          ]}
        >
          Login
        </Text>
        <View>
          <Text style={Style.label}>Phone Number * :</Text>
          <TextInput
            placeholder="<08051985616>"
            style={Style.inputText}
            onChangeText={(text) => setPhone(text)}
            value={phone}
            keyboardType="numeric"
          />
        </View>
        <View>
          <Text style={Style.label}>Password * :</Text>
          <TextInput
            placeholder="Enter  Your Password"
            style={Style.inputText}
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />
        </View>
        {alert.status && (
          <Text
            style={{
              backgroundColor: "red",
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            {alert.message}
          </Text>
        )}
        <TouchableOpacity style={Style.button} onPress={loginUser}>
          <Text style={{ color: "#fff" }}>LOGIN</Text>
        </TouchableOpacity>

        <Text
          style={{ textAlign: "center", marginTop: 10 }}
          onPress={() => navigation.navigate("register")}
        >
          CREATE AN ACCOUNT
        </Text>
      </View>
    </View>
  );

  return (
    <View style={Style.layout}>
      <View style={Style.form}>
        <Text style={{ fontSize: 24, marginBottom: 32 }}>LOGIN</Text>
        <View>
          <Text style={Style.label}>Phone Number * :</Text>
          <TextInput
            placeholder="<08051985616>"
            style={Style.inputText}
            onChangeText={(text) => setPhone(text)}
            value={phone}
            keyboardType="numeric"
          />
        </View>
        <View>
          <Text style={Style.label}>Password * :</Text>
          <TextInput
            placeholder="Enter  Your Password"
            style={Style.inputText}
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />
        </View>
        {alert.status && <Text>{alert.message}</Text>}
        <TouchableOpacity style={Style.button} onPress={loginUser}>
          <Text style={{ color: "#fff" }}>LOGIN</Text>
        </TouchableOpacity>

        <Text
          style={{ textAlign: "center", marginTop: 10 }}
          onPress={() => navigation.navigate("register")}
        >
          CREATE AN ACCOUNT
        </Text>
      </View>
    </View>
  );
};

const myStyle = StyleSheet.create({
  layout: {
    marginTop: 25,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: { width: 80, height: 80, borderRadius: 50 },
  form: {},
});

const Style = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: "#731963",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    backgroundColor: "#fff",
    width: "100%",
    height: 450,
    paddingVertical: 50,
    paddingHorizontal: 50,
  },
  label: {
    color: "#000",
    fontWeight: "bold",
  },
  inputText: {
    height: 45,
    borderBottomColor: "#731963",
    borderBottomWidth: 1,
    marginVertical: 10,
    backgroundColor: "#f8f8f8",
    paddingLeft: 20,
  },
  button: {
    backgroundColor: "#731963",
    borderRadius: 5,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Login;
