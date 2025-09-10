import FormDropdown from '@/components/FormDropdown';
import FormTextInput from '@/components/FormTextInput';
import TitleBar from '@/components/TitleBar';
import { useRouter } from 'expo-router';
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { View } from "react-native";
import SaltButton from "../components/SaltButton";
import YellowButton from "../components/YellowButton";

export default function Create() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [notes, setNotes] = useState("");

  const handleSave = () => {
    console.log("Name:", name);
    console.log("Category:", category);
    console.log("Notes:", notes);

    // TO DO: save to DB, send to API, etc.
    router.back();
  };

  return (
    <>
      <StatusBar style="light" /> 
      <TitleBar text="CREATE A WORKOUT" />
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
        <FormTextInput
          label="Name"
          placeholder="Enter name..."
          value={name}
          onChange={setName}
        />

        <FormDropdown
          label="Workout Category"
          options={[
            { label: "Arms", value: "arms" },
            { label: "Chest", value: "chest" },
            { label: "Back", value: "back" },
            { label: "Legs", value: "legs" },
            { label: "Abs", value: "abs" }
          ]}
          selected={category}
          onValueChange={setCategory}
        />

        <FormTextInput
          label="Notes"
          placeholder="Enter notes..."
          size={175}
          textSize={14}
          value={notes}
          onChange={setNotes}
        />

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
