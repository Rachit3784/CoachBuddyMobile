import React from 'react';
import { Stack, Tabs } from 'expo-router';
import CustomNavigation from '@/components/CustomNavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const _layout = () => {
  return (
    
      
        <Tabs tabBar={(props) => <CustomNavigation {...props} />} >
        <Tabs.Screen  name="index" options={{ title: "Home" , headerShown : false}} />
        <Tabs.Screen name="search" options={{ title: "Search", headerShown : false }} />
        
        <Tabs.Screen name="Mybatches" options={{ title: "Batch" , headerShown : false}} />
        
        <Tabs.Screen name="profile" options={{ title: "Profile" , headerShown : false}} />
        
      </Tabs>

  );
};

export default _layout;
