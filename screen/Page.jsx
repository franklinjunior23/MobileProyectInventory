import React from "react";
import { ScrollView, View } from "react-native";
import Header from "./components/Header";

function Page({ scrollEnabled = true, children }) {
  if (scrollEnabled) {
    return (
      <ScrollView
        style={{
          paddingHorizontal: 20,

          height: "100%",
          backgroundColor: "#292929",
        }}
      >
        <Header />
        {children}
      </ScrollView>
    );
  }

  return (
    <View
      style={{
        paddingHorizontal: 20,
        position: "relative",
        height: "100%",
        backgroundColor: "#292929",
        flex: 1,
      }}
    >
      {children}
    </View>
  );
}

export default Page;
