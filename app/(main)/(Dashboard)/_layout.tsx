import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import OrginationTab from '@/components/OrgnisationTab'


const _layout = () => {
  return (
    <Tabs  tabBar={(props)=><OrginationTab {...props} />} >
        <Tabs.Screen name='org' options={{headerShown : false , title : 'Org'}}/>
         <Tabs.Screen name='Batches' options={{headerShown : false , title : 'Batches'}} />

          <Tabs.Screen name='Post' options={{headerShown : false, title : 'Post' }}/>
          <Tabs.Screen name='Profile' options={{headerShown : false , title : 'Profile'}}/>
           
    </Tabs>
  )
}

export default _layout