import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import {
  AntDesign,
  Feather,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";

function HomeScreen({ navigation }) {
  const [userDetails, setDetails] = useState([]);
  useEffect(() => {
    (async () => {
      const details = await AsyncStorage.getItem("userdetails");
      const json = JSON.parse(details);
      setDetails(json);
    })();
  }, []);

  return (
    <>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>https://www.gengonly.surge.sh/{userDetails.phone}</Text>
        <TouchableOpacity style={navBox.clipboard}>
          <Text style={{ textAlign: "center" }}>
            <Feather name="copy" size={14} color="black" /> Tap To Copy And
            Share Link
          </Text>
        </TouchableOpacity>
        <View style={navBox.centering}>
          <View
            style={{ ...navBox.boxes, ...navBox.box1 }}
            onStartShouldSetResponder={(e) => navigation.push("LoadWallet")}
          >
            <AntDesign name="creditcard" size={24} color="black" />
            <Text>My Wallet</Text>
          </View>
          <View
            style={{ ...navBox.boxes, ...navBox.box2 }}
            onStartShouldSetResponder={(e) => navigation.push("SendAirTime")}
          >
            <MaterialIcons name="send-to-mobile" size={24} color="black" />
            <Text>Send Airtime</Text>
          </View>
          <View style={{ ...navBox.boxes, ...navBox.box2 }}>
            <Feather name="users" size={24} color="black" />
            <Text>Friends' List</Text>
          </View>
          <View style={{ ...navBox.boxes, ...navBox.box1 }}>
            <MaterialCommunityIcons
              name="send-outline"
              size={24}
              color="black"
            />
            <Text>Send Data</Text>
          </View>
        </View>
      </View>
    </>
  );
}

const navBox = StyleSheet.create({
  centering: {
    width: "90%",
    height: "50%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  boxes: {
    height: "50%",
    width: "47%",
    backgroundColor: "#f6f6f5",
    padding: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 17,
    fontWeight: "bold",
    margin: 3,
  },
  box1: {
    backgroundColor: "#f0e100",
  },
  box2: {
    backgroundColor: "#6290c3",
    color: "#ffffff",
  },
  clipboard: {
    backgroundColor: "#fff",
    paddingVertical: 20,
    width: "100%",
    textAlign: "center",
    marginVertical: 12,
    elevation: 5,
  },
});

export default HomeScreen;
