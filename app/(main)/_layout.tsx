import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Stack } from 'expo-router'
import userStore from '@/store/userStore'

const _layout = () => {

   const Mode = userStore(state => state.Mode)



  return (
   <SafeAreaProvider>
    
 {
      Mode === 'Admin' ? (

         <Stack>
        {/* This Stack.Screen loads the Tabs navigator */}

        <Stack.Screen name='(Dashboard)' options={{headerShown : false}} />
        <Stack.Screen name="(Notabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      </Stack>

        
      ) : (


         <Stack>
        {/* This Stack.Screen loads the Tabs navigator */}

        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name='(Dashboard)' options={{headerShown : false}} />
        {/* This Stack.Screen loads the NoTabScreen folder, which contains AdminUpdate.tsx */}
        <Stack.Screen name="(Notabs)" options={{ headerShown: false }} />

      </Stack>



        
      )

     }

    </SafeAreaProvider>
  )
}

export default _layout

