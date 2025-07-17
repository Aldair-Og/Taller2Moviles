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
import EditarProductoScreen from '../screens/EditarProductoScreen';
import { Ionicons } from '@expo/vector-icons';

import MapaScreen from '../screens/MapaScreen';
import EditarUbicacionScreen from '../screens/EditarUbicacionScreen';



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
    return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Inicio" 
        component={Home2Screen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen 
        name="Ordenes" 
        component={OrdenScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen 
        name="Perfil" 
        component={PerfilScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          )
        }}
      />
      
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
      <Stack.Screen name='Editar' component={EditarProductoScreen}/>
      <Stack.Screen name="Catalogo" component={CatalogoScreen} />
      <Stack.Screen name='AgregarP' component={AgregarProductoScreen}/>
      <Stack.Screen name='Mapa' component={MapaScreen}/>
      <Stack.Screen name="EditarUbicacion" component={EditarUbicacionScreen} />

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
