import React, { useState, useEffect } from "react";
import { AntDesign, EvilIcons } from "@expo/vector-icons";
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
import { sendAirtimeToOne } from "../../API";
import { getServiceNetwork } from "./../../logic/Index";

import AsyncStorage from "@react-native-async-storage/async-storage";

let dummyFriends = [
  {
    name: "Abiodun Mayowa",
    phone: "08051985616",
  },
  {
    name: "Abiodun Temitope",
    phone: "07087243455",
  },
  {
    name: "Abiodun Temitope",
    phone: "07087243453",
  },
  {
    name: "Abiodun Temitope",
    phone: "08087243455",
  },
  {
    name: "Abiodun Temitope",
    phone: "09087243455",
  },
];

const AirtimeMany = () => {
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [amount, setAmount] = useState("");
  const [notification, setNotification] = useState("");

  const [userData, setUserData] = useState({});

  useEffect(() => {
    (async () => {
      const details = await AsyncStorage.getItem("userdetails");
      setUserData(JSON.parse(details));
    })();
  }, [userData]);

  const addRemoveFriends = (number) => {
    const copyFriends = [...selectedFriends];
    const find = copyFriends.findIndex((friend) => friend === number);
    if (find === -1) {
      copyFriends.push(number);
      setSelectedFriends(copyFriends);
    } else {
      let filter = copyFriends.filter((friend) => friend !== number);
      setSelectedFriends(filter);
    }
  };

  const sendToMany = async () => {
    setNotification("Sending Crediting To Friends");

    if (selectedFriends.length * 4 > userData.wallet) {
      setNotification(
        "You have insufficient balance to share with all your selected " +
          selectedFriends.length +
          " friends"
      );

      return;
    }

    if (amount < 50) {
      setNotification("Minimum Amount Of N50 transferable!");
      return;
    }

    for (let i = 0; i < selectedFriends.length; i++) {
      const friend = selectedFriends[i];
      const ntw = getServiceNetwork(friend);
      const data = {
        amt: amount,
        mobile: friend,
        ntw,
      };

      await sendAirtimeToOne(data);

      let copyOfUserData = { ...userData };
      copyOfUserData.wallet -= 4;
      setUserData(copyOfUserData);
      await AsyncStorage.setItem("userdetails", JSON.stringify(copyOfUserData));

      setNotification(`${i} of ${selectedFriends.length} sent!`);
    }
    setNotification("Transfer Completed!!!");

    setTimeout(() => setNotification(""), 5000);
  };

  const [singleNotification, setSingleNotification] = useState(null);
  const [phone, setPhone] = useState(null);
  const [singleAmt, setSingleAmt] = useState(null);
  const [singleNtw, setSingleNtw] = useState(null);

  const sendSingle = async () => {
    setSingleNotification("sending credit!! Please Wait!!!");

    if (!phone) setSingleNotification("You Have Not Added A Phone Number!");
    else if (!singleAmt)
      setSingleNotification("You Have Not Add An Amount To Share");
    else if (singleAmt < 1 || !singleAmt)
      setSingleNotification("Invalid Amount Sent, must be above N50;");
    else if (!singleNtw) setSingleNotification("You Must Select A Network");
    else if (userData.wallet < 4)
      setSingleNotification(
        "You Don't Have Sufficient Balance To Sent This Message!"
      );
    else {
      const data = {
        amt: singleAmt,
        mobile: phone,
        ntw: singleNtw,
      };

      const anser = await sendAirtimeToOne(data);
      switch (anser.status) {
        case "INVALID_RECIPIENT":
          setSingleNotification("An invalid mobile phone number was entered");
          break;
        case "ORDER_RECEIVED":
          // remove N4.
          let copyOfUserData = { ...userData };
          copyOfUserData.wallet -= 4;
          setUserData(copyOfUserData);
          await AsyncStorage.setItem(
            "userdetails",
            JSON.stringify(copyOfUserData)
          );
          setSingleNotification("Transfer Successful!!!");
          break;
        case "INVALID_ AMOUNT":
          setSingleNotification("Invalid Amount Sent");
          break;
        case "INVALID_RECIPIENT":
          setSingleNotification("Mobile Network and Phone number Mismatch");
          break;
        case "INSUFFICIENT_BALANCE":
          setSingleNotification("Insufficient Balance");
          break;
        default:
          setSingleNotification("An Error Occured, Please Try Again Later");
          break;
      }
    }

    setTimeout(() => setSingleNotification(null), 5000);
  };

  const UpdateFriendsList = () => {
    const id = userData._id;
  };

  return (
    <>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={style.container}>
          <Text style={style.h1}>
            You currently have {userData.wallet || 0} units of Credits Left.
          </Text>
        </View>
        <View style={style.container}>
          <Text style={style.h1Left}>
            <AntDesign name="user" size={22} color="black" /> Send To One
          </Text>
          <View>
            <Text style={style.label}>Enter Phone Number *: </Text>
            <TextInput
              placeholder="Format : 080123456789"
              keyboardType="numeric"
              keyboardAppearance="dark"
              style={style.input}
              onChangeText={(text) => setPhone(text)}
              value={phone}
            />
            <Text style={style.label}>Enter Amount Of Unit *: </Text>
            <TextInput
              placeholder="Enter Amount Here."
              keyboardType="numeric"
              keyboardAppearance="dark"
              style={style.input}
              onChangeText={(text) => setSingleAmt(text)}
              value={singleAmt}
            />
            <Text style={style.label}>Select Network *: </Text>
            <View
              style={{
                borderBottomColor: "#731963",
                marginBottom: 10,
                borderBottomWidth: 1,
                backgroundColor: "#f6f6f6",
                paddingTop: 12,
              }}
            >
              <Picker
                selectedValue=""
                onValueChange={(itemValue, itemIndex) =>
                  setSingleNtw(itemValue)
                }
                style={style.dropDown}
              >
                <Picker.Item label="Tap To Select A Network" value="" />
                <Picker.Item label="MTN" value="01" />
                <Picker.Item label="GLO" value="02" />
                <Picker.Item label="AIRTEL" value="04" />
                <Picker.Item label="ETISALAT" value="03" />
              </Picker>
            </View>
            {singleNotification ? (
              <Text
                style={{
                  textAlign: "center",
                  backgroundColor: "red",
                  color: "#fff",
                  height: 20,
                  marginVertical: 10,
                }}
              >
                {singleNotification}
              </Text>
            ) : null}
            <TouchableOpacity style={style.customBtn} onPress={sendSingle}>
              <Text style={{ color: "#fff" }}>SEND CREDIT</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={style.container}>
          <Text style={style.h1Left}>
            <AntDesign name="contacts" size={24} color="black" /> Send To
            Friends' List.{" "}
          </Text>

          <Text onPress={UpdateFriendsList}>
            <EvilIcons name="refresh" size={19} color="red" /> Tap To Refresh
            Friends' List.
          </Text>

          <TextInput
            placeholder="Enter Amount To Share."
            keyboardType="numeric"
            keyboardAppearance="dark"
            style={style.input}
            onChangeText={(text) => setAmount(text)}
            value={amount}
          />
          {userData.friends && userData.friends.length === 0 ? (
            <Text style={{ textAlign: "center" }}>
              You have No Friend On Your List!
            </Text>
          ) : (
            <Text style={{ textAlign: "center" }}>Tap A Friend To Add</Text>
          )}

          <ScrollView
            persistentScrollbar={true}
            // contentContainerStyle={{
            //   height: 100,
            //   flex: 1,
            //   marginVertical: 10,
            // }}
          >
            {userData.friends &&
              userData.friends.map((friend, id) => (
                <Friend
                  key={id + 1}
                  friend={friend}
                  addRemove={addRemoveFriends}
                />
              ))}
          </ScrollView>

          {notification ? (
            <Text
              style={{
                textAlign: "center",
                backgroundColor: "red",
                color: "#fff",
                height: 30,
                marginVertical: 10,
                paddingVertical: 5,
              }}
            >
              {notification}
            </Text>
          ) : null}
          <TouchableOpacity style={style.customBtn} onPress={sendToMany}>
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

export default AirtimeMany;
