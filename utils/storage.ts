// utils/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const CREATED_KEY = "createdWorkouts";
const LOGGED_KEY = "loggedWorkouts";

// ---- Created Workouts ----
export const getCreatedWorkouts = async () => {
  const raw = await AsyncStorage.getItem(CREATED_KEY);
  return raw ? JSON.parse(raw) : [];
};

export const saveCreatedWorkout = async (workout: any) => {
  const workouts = await getCreatedWorkouts();
  workouts.push(workout);
  await AsyncStorage.setItem(CREATED_KEY, JSON.stringify(workouts));
};

// ---- Logged Workouts ----
export const getLoggedWorkouts = async () => {
  const raw = await AsyncStorage.getItem(LOGGED_KEY);
  return raw ? JSON.parse(raw) : [];
};

export const saveLoggedWorkout = async (entry: any) => {
  const logs = await getLoggedWorkouts();
  logs.push(entry);
  await AsyncStorage.setItem(LOGGED_KEY, JSON.stringify(logs));
};

// ---- Generic Getter ----
export const getData = async (key: string) => {
  const raw = await AsyncStorage.getItem(key);
  return raw ? JSON.parse(raw) : [];
};
