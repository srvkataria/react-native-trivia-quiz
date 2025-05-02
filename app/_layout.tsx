import { Stack } from "expo-router";
import { useFonts } from 'expo-font';
import { SoundProvider } from '../utils/SoundContext';

export default function RootLayout() {
  const [loaded] = useFonts({
    WendyOneRegular: require('../assets/fonts/WendyOne-Regular.ttf'),
    PoppinsRegular: require('../assets/fonts/Poppins-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <SoundProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: true, title: "Home" }} />
        <Stack.Screen name="quizSingle" 
          options={{ 
            headerShown: true, 
            title: "Play Solo",
            headerBackVisible: false,
            headerLeft: () => null, 
            gestureEnabled: false 
          }} 
        />

        <Stack.Screen name="quizResult" 
          options={{ 
            headerShown: true, 
            title: "ScoreBoard", 
            headerBackVisible: false,
            headerLeft: () => null, 
            gestureEnabled: false 
          }} 
        />
      </Stack>
    </SoundProvider>
  );
}
