import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import userStore from '@/store/userStore';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
   
    return null;
  }


  
  return (
    
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <SafeAreaProvider>
      <Stack>
        
          <Stack.Screen name="(main)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          
        <Stack.Screen name="+not-found" />
        
      </Stack>
      </SafeAreaProvider>
      <StatusBar style="auto" />
      
    </ThemeProvider>
    
  );
}
