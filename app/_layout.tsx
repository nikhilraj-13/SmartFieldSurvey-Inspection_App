import { DarkTheme, DefaultTheme, ThemeProvider, getFocusedRouteNameFromRoute } from "@react-navigation/native";
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
          options={({ route }) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? "index";
            let title = "Dashboard";

            switch (routeName) {
              case "index":
                title = "Dashboard";
                break;
              case "createSurvey":
                title = "New Survey";
                break;
              case "profile":
                title = "Profile";
                break;
              case "history":
                title = "Survey History";
                break;
              default:
                title = "Dashboard";
            }

            return {
              title,
              headerShown: true,
            };
          }}
        />

        <Drawer.Screen
          name="(drawer)/preview"
          options={{
            title: "Survey Preview",
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
          name="(drawer)/setting"
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