import FormDropdown from '@/components/FormDropdown';
import FormTextInput from '@/components/FormTextInput';
import TitleBar from '@/components/TitleBar';
import { useRouter } from 'expo-router';
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import SaltButton from "../components/SaltButton";
import YellowButton from "../components/YellowButton";

export default function Create() {
  const router = useRouter();
  return (
    <>
      <StatusBar style="light" /> 
      <TitleBar text="CREATE A WORKOUT"></TitleBar>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "center",
          backgroundColor: "#2e3c49ff",
          height: "100%",
          paddingBottom: "15%",
          paddingTop: "10%"
        }}
        
      >
        <FormTextInput label="Name" placeholder='Enter workout name...'></FormTextInput>
        <FormDropdown
            label="Category"
            options={[
                { label: "Arms", value: "arms" },
                { label: "Chest", value: "chest" },
                { label: "Back", value: "back" },
                { label: "Legs", value: "legs" },
                { label: "Abs", value: "abs" }
            ]}
        />

        <FormTextInput label="Notes" placeholder='Machine number, location, etc...' size={175} textSize={14}></FormTextInput>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            paddingHorizontal: 20,
          }}
        >
        </View>
        <View style={{
          flex: 1,
          backgroundColor: "#2e3c49ff",
          height: "100%",
          paddingBottom: "15%",
          flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            paddingHorizontal: 20,
        }}>
            <SaltButton text="Cancel" onPress={() => router.back()} />
            <YellowButton text="Save" onPress={() => router.back()} />
        </View>
      </View>
    </>
  );
}
