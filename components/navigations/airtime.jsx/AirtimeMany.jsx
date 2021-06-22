import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { Picker } from "@react-native-picker/picker";
import Friend from "./Friend";
// const [selectedLanguage, setSelectedLanguage] = useState();

let dummyFriends = [
  {
    name: "Abiodun Mayowa",
    phone: "08051985616",
  },
  {
    name: "Abiodun Temitope",
    phone: "07087243455",
  },
];

const AirtimeMany = () => {
  return (
    <>
      <ScrollView style={{ flex: 1 }}>
        <View style={style.container}>
          <Text style={style.h1}>
            You currently have 500 units of Credits Left.
          </Text>
        </View>
        <View style={style.container}>
          <Text style={style.h1Left}>
            <AntDesign name="user" size={22} color="black" /> Send To One
          </Text>
          <View>
            <Text style={style.label}>Enter Phone Number *: </Text>
            <TextInput
              placeholder="+2340123456789"
              keyboardType="numeric"
              keyboardAppearance="dark"
              style={style.input}
            />
            <Text style={style.label}>Enter Amount Of Unit *: </Text>
            <TextInput
              placeholder="Enter Amount Here."
              keyboardType="numeric"
              keyboardAppearance="dark"
              style={style.input}
            />
            {/* <Text style={style.label}>Select Network *: </Text> */}
            {/* <Picker
              selectedValue="MTN"
              onValueChange={(itemValue, itemIndex) =>
                setSelectedLanguage(itemValue)
              }
              style={style.dropDown}
            >
              <Picker.Item label="MTN" value="MTN" />
              <Picker.Item label="GLO" value="GLO" />
              <Picker.Item label="AIRTEL" value="AIRTEL" />
              <Picker.Item label="ETISALAT" value="ETISALAT" />
            </Picker> */}

            <TouchableOpacity
              style={style.customBtn}
              onPress={() => alert("Pressed!")}
            >
              <Text style={{ color: "#fff" }}>SEND CREDIT</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={style.container}>
          <Text style={style.h1Left}>
            <AntDesign name="contacts" size={24} color="black" /> Send To
            Friends' List.
          </Text>
          <Text style={{ textAlign: "center" }}>Tap A Friend To Add</Text>
          {dummyFriends.map((friend, id) => (
            <Friend key={id + 1} friend={friend} />
          ))}
          <TouchableOpacity
            style={style.customBtn}
            onPress={() => alert("Pressed!")}
          >
            <Text style={{ color: "#fff" }}>SHARE TO SELECTED</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const style = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: "#fff",
    marginTop: 40,
    margin: 10,
  },
  h1: {
    textAlign: "center",
    color: "#000345",
    fontSize: 13,
    textTransform: "uppercase",
  },
  h1Left: {
    fontSize: 21,
    marginBottom: 20,
  },
  input: {
    height: 40,
    padding: 10,
    borderColor: "#731963",
    borderBottomWidth: 1,
    marginBottom: 20,
    backgroundColor: "#f2f4f7",
  },
  dropDown: {
    height: 40,
    padding: 10,
    borderColor: "#731963",
    borderBottomWidth: 1,
    marginBottom: 20,
    backgroundColor: "red",
  },
  label: {
    marginTop: 2,
    marginBottom: 8,
    fontSize: 12,
    fontWeight: "bold",
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

export default AirtimeMany;
