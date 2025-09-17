import FormDropdown from '@/components/FormDropdown';
import FormTextInput from '@/components/FormTextInput';
import SetBox from '@/components/SetBox';
import TitleBar from '@/components/TitleBar';
import { useRouter } from 'expo-router';
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import SaltButton from "../components/SaltButton";
import YellowButton from "../components/YellowButton";

export default function Log() {
  const router = useRouter();

  const [setCount, setSetCount] = useState("");
  const [workout, setWorkout] = useState("");

  // Array of { weight, reps } for each set
  const [sets, setSets] = useState<{ weight: string; reps: string }[]>([]);

  // Whenever setCount changes, adjust the sets array length
  useEffect(() => {
    const count = parseInt(setCount) || 0;
    setSets(prev => {
      const newSets = [...prev];
      if (count > newSets.length) {
        // add more sets
        while (newSets.length < count) {
          newSets.push({ weight: "", reps: "" });
        }
      } else if (count < newSets.length) {
        // remove extra sets
        newSets.length = count;
      }
      return newSets;
    });
  }, [setCount]);

  const handleSave = () => {
    console.log("Workout:", workout);
    console.log("Sets:", sets);
    // TO DO: save to DB, send to API, etc.
    router.back();
  };

  const handleChangeWeight = (index: number, value: string) => {
    setSets(prev => {
      const newSets = [...prev];
      newSets[index].weight = value;
      return newSets;
    });
  };

  const handleChangeReps = (index: number, value: string) => {
    setSets(prev => {
      const newSets = [...prev];
      newSets[index].reps = value;
      return newSets;
    });
  };

  return (
    <>
      <StatusBar style="light" /> 
      <TitleBar text="LOG A WORKOUT" />
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "center",
          backgroundColor: "#2e3c49ff",
          paddingBottom: "15%",
          paddingTop: "10%"
        }}
      >
        <FormDropdown
          label="Workout"
          options={[
            { label: "Bench press", value: "bench press" },
            { label: "Bicep curls", value: "bicep curls" },
            { label: "Bulgarian split squat", value: "bulgarian split squat" },
            { label: "Calf raise", value: "calf raise" },
            { label: "Deadlift", value: "deadlift" }
          ]}
          selected={workout}
          onValueChange={setWorkout}
        />

        <FormTextInput
          label="Set Count"
          placeholder="Enter the number of sets..."
          value={setCount}
          onChange={setSetCount}
        />

        <ScrollView contentContainerStyle={styles.grid}>
          {sets.map((set, i) => (
            <SetBox
              key={i}
              number={i + 1}
              weight={set.weight}
              reps={set.reps}
              onChangeWeight={(val) => handleChangeWeight(i, val)}
              onChangeReps={(val) => handleChangeReps(i, val)}
            />
          ))}
        </ScrollView>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            paddingHorizontal: 20,
            marginTop: 20
          }}
        >
          <SaltButton text="Cancel" onPress={() => router.back()} />
          <YellowButton text="Save" onPress={handleSave} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  grid: {
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center", // keeps items centered when row not full
  gap: 12, // RN 0.71+ supports gap, otherwise use margin
  }
});
