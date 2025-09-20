import LoggedWorkout from '@/components/LoggedWorkout';
import TitleBar from '@/components/TitleBar';
import { useFocusEffect, useRouter } from 'expo-router';
import { StatusBar } from "expo-status-bar";
import { useCallback, useState } from "react";
import { ScrollView, View } from "react-native";
import SaltButton from "../components/SaltButton";
import YellowButton from "../components/YellowButton";
import { getData } from "../utils/storage";

export default function Index() {
  const router = useRouter();
  const [logs, setLogs] = useState<any[]>([]);

  const loadLogs = async () => {
    const savedLogs = await getData("loggedWorkouts");
    if (savedLogs) {
      setLogs(savedLogs);
    } else {
      setLogs([]);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadLogs();
    }, [])
  );

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }) + " " + date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getTotals = (sets: { weight: string; reps: string }[]) => {
    let totalReps = 0;
    let totalWeight = 0;
    let maxWeight = 0;

    sets.forEach(s => {
      const reps = parseInt(s.reps) || 0;
      const weight = parseInt(s.weight) || 0;
      totalReps += reps;
      totalWeight += weight * reps;
      if (weight > maxWeight) {
        maxWeight = weight;
      }
    });

    const avgWeight = totalReps > 0 ? Math.round(totalWeight / totalReps) : 0;
    return { totalReps, avgWeight, maxWeight };
  };

  return (
    <>
      <StatusBar style="light" /> 
      <TitleBar text="RECENT WORKOUTS" />

      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#2e3c49ff",
          paddingBottom: "15%",
          paddingTop: "5%",
          width: "100%",
        }}
      >
        <ScrollView style={{ width: "100%" }} contentContainerStyle={{ alignItems: "center" }}>
          {logs
            .filter(log => {
              const logDate = new Date(log.date);
              const now = new Date();

              const diffMs = now.getTime() - logDate.getTime();
              const diffDays = diffMs / (1000 * 60 * 60 * 24);

              return diffDays <= 2;
            })
            .reverse()
            .map((log, index) => {
              const { totalReps, avgWeight, maxWeight } = getTotals(log.sets);
              return (
                <LoggedWorkout
                  key={index}
                  date={formatDate(log.date)}
                  workoutName={log.workout}
                  totalReps={totalReps}
                  avgWeight={avgWeight}
                  maxWeight={maxWeight}
                />
              );
            })}
        </ScrollView>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            paddingHorizontal: 20,
          }}
        >
          <SaltButton text="Create Workout" onPress={() => router.push("/create")} />
          <YellowButton text="Log Workout" onPress={() => router.push("/log")} />
        </View>
      </View>
    </>
  );
}
