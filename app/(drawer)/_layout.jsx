import { Stack } from "expo-router";

export default function DrawerLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="camera"
        options={{
          title: "Camera",
        }}
      />
      <Stack.Screen
        name="contacts"
        options={{
          title: "Contacts",
        }}
      />
      <Stack.Screen
        name="location"
        options={{
          title: "Location",
        }}
      />
      <Stack.Screen
        name="clipboard"
        options={{
          title: "Clipboard",
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          title: "Settings",
        }}
      />
    </Stack>
  );
}
