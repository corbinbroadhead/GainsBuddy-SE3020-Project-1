import { Stack } from "expo-router";
{/*Header color = #18191dff*/}
{/*Background color = #2e3c49ff*/}
{/*Yellow = #efda22ff*/}
{/*Salt = #dde2e5ff*/}

{/*async storage */}
{/*dropdown picker */}

export default function RootLayout() {
  return <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#18191dff',
        },
        headerTintColor: '#dde2e5ff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen name="index" options={{ title: "Gains Buddy" , headerBackVisible: false}} />
      <Stack.Screen name="log" options={{ title: "Gains Buddy" , headerBackVisible: false}} />
      <Stack.Screen name="create" options={{ title: "Gains Buddy" , headerBackVisible: false}} />
    </Stack>;
}
