import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <Stack>
        
        <Stack.Screen name='AuthScreen' options={{headerShown : false} }/>
        <Stack.Screen name='Login' options={{headerShown : false} }/>
        <Stack.Screen name='Signup' options={{headerShown : false} }/>
        <Stack.Screen name='UploadDetail' options={{headerShown : false} }/>
        <Stack.Screen name='forgetPassword' options={{headerShown : false}}/>
        <Stack.Screen name='OtpScreen' options={{headerShown : false}}/>
        <Stack.Screen name='ResetPassword' options={{headerShown : false}}/>
        

    </Stack>
  )
}

export default _layout