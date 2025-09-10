import TitleBar from '@/components/TitleBar';
import { useRouter } from 'expo-router';
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import SaltButton from "../components/SaltButton";
import YellowButton from "../components/YellowButton";

export default function Log() {
  const router = useRouter();
  return (
    <>
      <StatusBar style="light" />
      <TitleBar text="LOG A WORKOUT"></TitleBar> 
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
          backgroundColor: "#2e3c49ff",
          height: "100%",
          paddingBottom: "15%"
        }}
        
      >
        {/* Workout logs go here */}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            paddingHorizontal: 20,
          }}
        >
          <SaltButton text="Cancel" onPress={() => router.back()} />
          <YellowButton text="Save" onPress={() => router.back()} />
        </View>
      </View>
    </>
  );
}
