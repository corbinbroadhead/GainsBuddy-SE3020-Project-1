import LoggedWorkout from '@/components/LoggedWorkout';
import TitleBar from '@/components/TitleBar';
import { useRouter } from 'expo-router';
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import SaltButton from "../components/SaltButton";
import YellowButton from "../components/YellowButton";
import { getData } from "../utils/storage";

export default function Index() {
  const router = useRouter();
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    const loadLogs = async () => {
      const savedLogs = await getData("loggedWorkouts");
      if (savedLogs) {
        setLogs(savedLogs);
      }
    };
    loadLogs();
  }, []);

  const getTotals = (sets: { weight: string; reps: string }[]) => {
    let totalReps = 0;
    let totalWeight = 0;

    sets.forEach(s => {
      const reps = parseInt(s.reps) || 0;
      const weight = parseInt(s.weight) || 0;
      totalReps += reps;
      totalWeight += weight * reps;
    });

    const avgWeight = totalReps > 0 ? Math.round(totalWeight / totalReps) : 0;
    return { totalReps, avgWeight };
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
          {logs.slice(-5).reverse().map((log, index) => {
            const { totalReps, avgWeight } = getTotals(log.sets);
            return (
              <LoggedWorkout
                key={index}
                date={log.date}
                workoutName={log.workout}
                totalReps={totalReps}
                avgWeight={avgWeight}
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
