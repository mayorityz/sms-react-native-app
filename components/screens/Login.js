import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const Login = () => {
  return (
    <View style={Style.form}>
      <View>
        <Text>Phone Number * :</Text>
        <TextInput placeholder="<+2348051985616>" />
      </View>
      <View>
        <Text>Password * :</Text>
        <TextInput placeholder="Enter  Your Password" />
      </View>
    </View>
  );
};

const Style = StyleSheet.create({
  form: {
    backgroundColor: "#f6f6f6",
  },
});

export default Login;
