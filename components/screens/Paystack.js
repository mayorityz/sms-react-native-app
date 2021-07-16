import React from "react";
import { View } from "react-native";
// import reactNativePaystackWebview from "react-native-paystack-webview";
import * as PaystackWebView from "react-native-paystack-webview";

// PaystackWebView

const Pay = () => {
  return (
    <View style={{ flex: 1 }}>
      <PaystackWebView
        buttonText="Pay Now"
        showPayButton={true}
        paystackKey="pk_test_bc48b82a5b55f798dc32585168da50254ab0f9c9"
        amount={120000}
        billingEmail="paystackwebview@something.com"
        billingMobile="09787377462"
        billingName="Oluwatobi Shokunbi"
        ActivityIndicatorColor="green"
        SafeAreaViewContainer={{ marginTop: 5 }}
        SafeAreaViewContainerModal={{ marginTop: 5 }}
        onCancel={(e) => {
          // handle response here
        }}
        onSuccess={(res) => {
          // handle response here
        }}
        autoStart={false}
      />
    </View>
  );
};

export default Pay;
