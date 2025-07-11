import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegistroScreen from "../screens/RegistroScreen";
import PerfilScreen from "../screens/PerfilScreen";
import RestablecerScreen from "../screens/RestablecerScreen";
import Home2Screen from '../screens/Home2Screen';
import CatalogoScreen from '../screens/CatalogoScreen';
import AgregarProductoScreen from '../screens/AgregarProductoScreen';
import OrdenScreen from '../screens/OrdenScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator initialRouteName="Home2">
      <Tab.Screen name="Home2" component={Home2Screen} />
      <Tab.Screen name="Ordenes" component={OrdenScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />

    </Tab.Navigator>
  );
}

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />

      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Registro" component={RegistroScreen} />
      <Stack.Screen name="Restablecer" component={RestablecerScreen} />
      <Stack.Screen name="Catalogo" component={CatalogoScreen} />
      <Stack.Screen name='AgregarP' component={AgregarProductoScreen}/>

      <Stack.Screen 
        name="HomeTabs" 
        component={HomeTabs}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default function Navegador() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
