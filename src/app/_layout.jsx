import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Products",
          headerShown: false, 
        }}
      />

      <Stack.Screen
        name="[id]/index"
        options={{ 
          title: "Product" 
        }}
      />

      <Stack.Screen
        name="[id]/update"
        options={{ title: "Update Item" }}
      />

      <Stack.Screen
        name="CreateScreen"
        options={{ title: "Create New Item" }}
      />

      
    </Stack>
  );
}