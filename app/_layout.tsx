import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Drawer } from "expo-router/drawer";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { SurveyProvider } from "../context/SurveyContext";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <SurveyProvider>
      <ThemeProvider
        value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      >
        <Drawer>
        <Drawer.Screen
          name="(tabs)"
          options={{
            title: "Dashboard",
            headerShown: true,
          }}
        />

        <Drawer.Screen
          name="(drawer)/camera"
          options={{
            title: "Camera",
            headerShown: true,
          }}
        />
        <Drawer.Screen
          name="(drawer)/clipboard"
          options={{
            title: "Clipboard",
            headerShown: true,
          }}
        />
        <Drawer.Screen
          name="(drawer)/contacts"
          options={{
            title: "Contacts",
            headerShown: true,
          }}
        />
        <Drawer.Screen
          name="(drawer)/location"
          options={{
            title: "Location",
            headerShown: true,
          }}
        />
        <Drawer.Screen
          name="(drawer)/seeting"
          options={{
            title: "Settings",
            headerShown: true,
          }}
        />
      </Drawer>

        <StatusBar style="auto" />
      </ThemeProvider>
    </SurveyProvider>
  );
}