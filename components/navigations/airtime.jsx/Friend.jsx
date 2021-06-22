import React, { useState } from "react";
import { Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";

const Friend = ({ friend }) => {
  const [selected, setSelected] = useState("");

  const select = () => {
    selected === "" ? setSelected("red") : setSelected("");
  };

  return (
    <View>
      <Text
        style={{
          backgroundColor: selected ? "red" : "#f6f6f6",
          marginVertical: 6,
          paddingVertical: 10,
          paddingHorizontal: 10,
          color: selected ? "#fff" : "#000",
        }}
        onPress={select}
      >
        {selected ? (
          <Entypo name="squared-cross" size={12} color="white" />
        ) : (
          <Entypo name="squared-plus" size={12} color="black" />
        )}{" "}
        {friend.name} - - {friend.phone}
      </Text>
    </View>
  );
};

export default Friend;
