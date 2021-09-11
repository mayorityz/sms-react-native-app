import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { bundles } from "./../../API";
import { Picker } from "@react-native-picker/picker";

const DataHandler = () => {
  const [bundle, setBundle] = useState({});
  const [providers, setProviders] = useState([]);
  useEffect(() => {
    (async () => {
      setBundle(await bundles());
    })();
  }, []);

  useEffect(() => {
    if (bundle.MOBILE_NETWORK) {
      const NTWs = bundle.MOBILE_NETWORK;
      setProviders(NTWs);
    }
  }, [bundle]);

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View>
        <Text>Share Data Screen</Text>
      </View>
      <Picker
        selectedValue=""
        onValueChange={(itemValue, itemIndex) => console.log(itemValue)}
        style={style.dropDown}
      >
        <Picker.Item label="Tap To Select A Network" value="" />
        {providers.map((_provider) => {
          <Picker.Item label={_provider} value={_provider} />;
        })}
      </Picker>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: "#fff",
    marginTop: 40,
    margin: 10,
    elevation: 2,
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
    height: 5,
    padding: 15,
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
    backgroundColor: "#070808",
    height: 50,
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DataHandler;
