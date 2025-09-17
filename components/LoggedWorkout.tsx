import React from "react";
import { StyleSheet, Text, View } from "react-native";

type LoggedWorkoutProps = {
  date: string;
  workoutName: string;
  totalReps: number;
  avgWeight: number;
};

const LoggedWorkout = ({ date, workoutName, totalReps, avgWeight }: LoggedWorkoutProps) => {
  return (
    <View style={styles.container}>
      {/* Date Bar */}
      <View style={styles.titleBar}>
        <Text style={styles.title}>{date}</Text>
      </View>

      {/* Workout Row */}
      <View style={styles.row}>
        {/* Workout Name */}
        <View style={styles.leftContainer}>
          <Text style={styles.workoutName}>{workoutName}</Text>
        </View>

        {/* Stats */}
        <View style={styles.rightContainer}>
          <View style={styles.statBlock}>
            <Text style={styles.label}>Total Reps</Text>
            <Text style={styles.value}>{totalReps}</Text>
          </View>
          <View style={styles.statBlock}>
            <Text style={styles.label}>Avg. Weight</Text>
            <Text style={[styles.value]}>{avgWeight}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#425363ff",
    width: "95%",
    borderRadius: 8,
    marginVertical: 8,
    overflow: "hidden",
    minWidth: 200,
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  leftContainer: {
    flex: 1,
  },
  workoutName: {
    color: "#dde2e5ff",
    fontWeight: "600",
    fontSize: 16,
  },
  rightContainer: {
    flexDirection: "row",
    gap: 20,
  },
  statBlock: {
    alignItems: "center",
  },
  label: {
    color: "#dde2e5ff",
    fontWeight: "500",
    fontSize: 13,
    marginBottom: 2,
  },
  value: {
    color: "#efda22ff",
    fontWeight: "bold",
    fontSize: 16,
  }
});

export default LoggedWorkout;
