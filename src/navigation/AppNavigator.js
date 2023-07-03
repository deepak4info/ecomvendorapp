import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import Splash from '../screen/Splash'
import Login from '../screen/Login'
import Signup from '../screen/Signup'
import Main from '../screen/Main'
import AddProducts from '../screen/AddProducts'
import Products from '../tabs/Products'



const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
  <NavigationContainer>
<Stack.Navigator>
    <Stack.Screen
    name='Splash'
    component={Splash}
    options={{headerShown:false}}
    />
        <Stack.Screen
    name='Signup'
    component={Signup}
    options={{headerShown:false}}
    />
            <Stack.Screen
    name='Login'
    component={Login}
    options={{headerShown:false}}
    />

<Stack.Screen
    name='Main'
    component={Main}
    options={{headerShown:false}}
    />

<Stack.Screen
    name='AddProducts'
    component={AddProducts}
    options={{headerShown:true}}
    />
    <Stack.Screen
    name='Products'
    component={Products}
    options={{headerShown:true}}
    />

</Stack.Navigator>
  </NavigationContainer>
  )
}

export default AppNavigator

