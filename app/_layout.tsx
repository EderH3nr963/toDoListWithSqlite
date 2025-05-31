import { ApplicationProvider } from "@ui-kitten/components";
import "react-native-reanimated";

import Colors from "@/constants/Colors";
import { initializeTableTodo } from "@/database/queries/initialiaze";
import * as eva from "@eva-design/eva";
import { Stack } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  useEffect(() => {
    // Cria a tabela no banco de dados se não houver
    const initDB = async () => {
      try {
        await initializeTableTodo();
      } catch {
        // pass
      }
    };

    initDB();
  }, []);

  return (
    <>
      <ApplicationProvider {...eva} theme={Colors.light}>
        <Stack
          initialRouteName="HomeScreen"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="HomeScreen" />
        </Stack>
      </ApplicationProvider>
    </>
  );
}
