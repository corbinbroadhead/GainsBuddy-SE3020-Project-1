import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

type YellowButtonProps = {
  text: string;
  altColor?: string;
  onPress?: () => void;
  children?: React.ReactNode;
};

const YellowButton = ({ text, altColor, onPress, children }: YellowButtonProps) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={[styles.text, { color: altColor || "#18191dff" }]}>
        {text}
      </Text>
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#efda22ff",
    paddingVertical: 12,
    width: 160,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default YellowButton;
