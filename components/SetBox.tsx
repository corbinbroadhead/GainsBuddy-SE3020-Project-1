import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

type SetBoxProps = {
  number: number;
  weight: string;
  reps: string;
  onChangeWeight: (text: string) => void;
  onChangeReps: (text: string) => void;
};

const SetBox = ({ number, weight, reps, onChangeWeight, onChangeReps }: SetBoxProps) => {
  return (
    <View style={styles.container}>
      {/* Title Bar */}
      <View style={styles.titleBar}>
        <Text style={styles.title}>Set {number}</Text>
      </View>

      {/* Weight + Reps Row */}
      <View style={styles.row}>
        {/* Weight */}
        <View style={styles.entryContainer}>
          <Text style={styles.label}>Weight</Text>
          <TextInput
            style={[styles.input, { width: 60 }]} 
            placeholder="0"
            keyboardType="numeric"
            maxLength={4}
            value={weight}
            onChangeText={onChangeWeight}
          />
        </View>

        {/* Reps */}
        <View style={styles.entryContainer}>
          <Text style={styles.label}>Reps</Text>
          <TextInput
            style={[styles.input, { width: 45 }]}
            placeholder="0"
            keyboardType="numeric"
            maxLength={3}
            value={reps}
            onChangeText={onChangeReps}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#425363ff",
    width: "45%",
    borderRadius: 8,
    marginVertical: 8,
    overflow: "hidden",
    minWidth: 140
  },
  titleBar: {
    backgroundColor: "#2c3945",
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  title: {
    color: "#dde2e5ff",
    fontWeight: "bold",
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingVertical: 10,
  },
  entryContainer: {
    alignItems: "center",
  },
  label: {
    color: "#dde2e5ff",
    fontWeight: "600",
    marginBottom: 4,
    fontSize: 14,
  },
  input: {
    backgroundColor: "#dde2e5ff",
    borderColor: "#425363ff",
    borderWidth: 2,
    borderRadius: 6,
    color: "#18191dff",
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 4,
  },
});

export default SetBox;
