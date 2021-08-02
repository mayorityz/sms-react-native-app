import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { newRecord } from "../API";
import logo from "./../../assets/icon.png";

const Register = ({ navigation }) => {
  const [alert, setAlert] = useState({ status: false, message: "" });

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const saveUserAccount = async () => {
    console.log("match");
    setAlert({ status: true, message: "Creating Your Account!" });

    if (username === "" || email === "" || phone === "" || password === "") {
      setAlert({ status: true, message: "All Inputs Fields Must Be Filled!" });
    } else {
      const saveRecord = await newRecord({ username, email, phone, password });
      setAlert({ status: true, message: saveRecord.message });
      navigation.navigate("Login");
    }

    setTimeout(() => {
      setAlert({ status: false, message: "" });
    }, 4000);
  };

  return (
    // new registration idea
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
          Create An Account.
        </Text>
        <View>
          <Text style={Style.label}>Username * :</Text>
          <TextInput
            placeholder="Enter  Your Username"
            style={Style.inputText}
            onChangeText={(text) => setUsername(text)}
            value={username}
          />
        </View>
        <View>
          <Text style={Style.label}>Email Address * :</Text>
          <TextInput
            placeholder="Enter Email Address"
            style={Style.inputText}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
            value={email}
          />
        </View>
        <View>
          <Text style={Style.label}>Phone Number * :</Text>
          <TextInput
            placeholder="<08051985616>"
            keyboardType="numeric"
            onChangeText={(text) => setPhone(text)}
            value={phone}
            style={Style.inputText}
          />
        </View>
        <View>
          <Text style={Style.label}>Password * :</Text>
          <TextInput
            placeholder="Enter  Your Password"
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            value={password}
            style={Style.inputText}
          />
        </View>

        {alert.status && (
          <Text
            style={[
              Style.notification,
              Style.success,
              {
                marginTop: 10,
                textAlign: "center",
                color: "#fff",
              },
            ]}
          >
            {alert.message}
          </Text>
        )}

        <TouchableOpacity style={Style.button} onPress={saveUserAccount}>
          <Text style={{ color: "#fff", fontWeight: "bold" }}>REGISTER</Text>
        </TouchableOpacity>

        <Text
          style={{ textAlign: "center", marginTop: 10 }}
          onPress={() => navigation.navigate("login")}
        >
          LOGIN
        </Text>
      </View>
    </View>
  );

  return (
    <View style={Style.layout}>
      <View style={Style.form}>
        <Text style={{ fontSize: 24, marginBottom: 32, textAlign: "center" }}>
          CREATE AN ACCOUNT
        </Text>
        <View>
          <Text style={Style.label}>Username * :</Text>
          <TextInput
            placeholder="Enter  Your Username"
            style={Style.inputText}
            onChangeText={(text) => setUsername(text)}
            value={username}
          />
        </View>
        <View>
          <Text style={Style.label}>Email Address * :</Text>
          <TextInput
            placeholder="Enter Email Address"
            style={Style.inputText}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
            value={email}
          />
        </View>
        <View>
          <Text style={Style.label}>Phone Number * :</Text>
          <TextInput
            placeholder="<08051985616>"
            keyboardType="numeric"
            onChangeText={(text) => setPhone(text)}
            value={phone}
            style={Style.inputText}
          />
        </View>
        <View>
          <Text style={Style.label}>Password * :</Text>
          <TextInput
            placeholder="Enter  Your Password"
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            value={password}
            style={Style.inputText}
          />
        </View>

        {alert.status && (
          <Text
            style={[
              Style.notification,
              Style.success,
              {
                marginTop: 10,
                textAlign: "center",
                color: "#fff",
              },
            ]}
          >
            {alert.message}
          </Text>
        )}

        <TouchableOpacity style={Style.button} onPress={saveUserAccount}>
          <Text style={{ color: "#fff" }}>REGISTER</Text>
        </TouchableOpacity>

        <Text
          style={{ textAlign: "center", marginTop: 10 }}
          onPress={() => navigation.navigate("login")}
        >
          LOGIN
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
    height: 490,
    paddingVertical: 50,
    paddingHorizontal: 50,
  },
  label: {
    color: "#000",
    marginBottom: -11,
    fontWeight: "bold",
  },
  inputText: {
    height: 35,
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
  notification: {
    height: 20,
    width: "100%",
    marginBottom: 4,
  },
  success: {
    backgroundColor: "#11d492",
  },
  danger: {
    backgroundColor: "#ff7360",
  },
});

export default Register;
