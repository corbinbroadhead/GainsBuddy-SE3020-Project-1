import FormDropdown from '@/components/FormDropdown';
import FormTextInput from '@/components/FormTextInput';
import SetBox from '@/components/SetBox';
import TitleBar from '@/components/TitleBar';
import { getCreatedWorkouts, saveLoggedWorkout } from '@/utils/storage';
import { useFocusEffect, useRouter } from 'expo-router';
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import SaltButton from "../components/SaltButton";
import YellowButton from "../components/YellowButton";

export default function Log() {
  const router = useRouter();

  const [setCount, setSetCount] = useState("");
  const [workout, setWorkout] = useState("");
  const [sets, setSets] = useState<{ weight: string; reps: string }[]>([]);
  const [workoutOptions, setWorkoutOptions] = useState<{ label: string; value: string }[]>([]);

  const loadWorkouts = useCallback(async () => {
    try {
      const saved = await getCreatedWorkouts();
      console.log("Log.tsx — loaded created workouts:", saved);

      if (Array.isArray(saved) && saved.length > 0) {
        const opts = saved.map((w: any) => {
          const label = w?.name ?? w?.label ?? String(w);
          const value = w?.name ?? w?.value ?? label;
          return { label, value };
        });
        opts.sort((a, b) => a.label.localeCompare(b.label));

        setWorkoutOptions(opts);

        setWorkout(prev => (prev && prev.length > 0 ? prev : opts[0].value));
      } else {
        setWorkoutOptions([]);
        setWorkout("");
      }
    } catch (err) {
      console.error("Log.tsx — error loading created workouts:", err);
      setWorkoutOptions([]);
      setWorkout("");
    }
  }, []);

  useEffect(() => {
    loadWorkouts();
  }, [loadWorkouts]);

  useFocusEffect(
    useCallback(() => {
      let mounted = true;
      (async () => {
        await loadWorkouts();
        if (mounted) {
          console.log("Log.tsx — refocused and refreshed workouts");
        }
      })();
      return () => {
        mounted = false;
      };
    }, [loadWorkouts])
  );

  useEffect(() => {
    const count = parseInt(setCount) || 0;
    setSets(prev => {
      const newSets = [...prev];
      if (count > newSets.length) {
        while (newSets.length < count) newSets.push({ weight: "", reps: "" });
      } else if (count < newSets.length) {
        newSets.length = count;
      }
      return newSets;
    });
  }, [setCount]);

  const handleSave = async () => {
    const entry = {
      workout,
      sets,
      date: new Date().toISOString(),
    };
    await saveLoggedWorkout(entry);
    alert("Workout logged!")
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
      <View style={styles.screen}>
        <FormDropdown
          label="Workout"
          options={workoutOptions}
          selected={workout}
          onValueChange={setWorkout}
        />

        <FormTextInput
          label="Set Count"
          placeholder="Enter the number of sets..."
          value={setCount}
          onChange={setSetCount}
          numberPad={true}
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

        <View style={styles.buttonRow}>
          <SaltButton text="Cancel" onPress={() => router.back()} />
          <YellowButton text="Save" onPress={handleSave} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#2e3c49ff",
    paddingBottom: "15%",
    paddingTop: "10%",
    width: "100%",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
    width: "100%",
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 20,
  },
});
