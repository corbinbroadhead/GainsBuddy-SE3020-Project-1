import React from "react";
import { StyleSheet, Text, View } from "react-native";

type TitleBarProps = {
  text: string;
};

const TitleBar = ({ text }: TitleBarProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#425363ff",
    paddingVertical: 12,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#dde2e5ff",
    fontWeight: "bold",
    fontSize: 12,
    letterSpacing: 6,
  },
});

export default TitleBar;
