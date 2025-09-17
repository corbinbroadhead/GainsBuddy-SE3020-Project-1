import React from "react";
import { Keyboard, StyleSheet, Text, TextInput, View } from "react-native";


type FormTextInputProps = {
  label: string;
  placeholder: string;
  size?: number;
  textSize?: number;
  value: string;
  numberPad?: boolean;
  onChange: (text: string) => void;
};

const FormTextInput = ({ label, placeholder, size, textSize, onChange, value, numberPad=false }: FormTextInputProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.entry}>
        <TextInput
				style={[styles.text, {height: size || 35}, {fontSize: textSize || 18}]}
				placeholder={placeholder}
				value={value}
        keyboardType={numberPad ? "numeric" : "default"}
				onChangeText={onChange}
                multiline={true}
                textAlignVertical="top"
	            onKeyPress={({ nativeEvent }) => {
                    if (nativeEvent.key === "Enter") {
                        Keyboard.dismiss();
                }}}
			/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#425363ff",
    width: "90%",
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop: 10
  },
  label: {
    color: "#dde2e5ff",
    fontWeight: "bold",
    fontSize: 14,
    letterSpacing: 1.5,
    paddingLeft: 5
  },
  entry: {
    backgroundColor: "#dde2e5ff",
    width: "100%",
    borderColor: "#425363ff",
    borderWidth: 4,
    alignItems: "flex-start",
    "justifyContent": "flex-start",
  },
  text: {
    color: "#18191dff",
    fontWeight: "bold",
    paddingLeft: 5
  }
});

export default FormTextInput;