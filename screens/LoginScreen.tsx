import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/Config'

export default function LoginScreen({ navigation }: any) {
  const [correo, setCorreo] = useState("")
  const [contraseña, setContraseña] = useState("")

  function login() {
    signInWithEmailAndPassword(auth, correo, contraseña)
      .then((userCredential) => {
        Alert.alert("Mensaje","Inicio sesion con exito")
        navigation.replace('HomeTabs')
      })
      .catch((error) => {
        let errorCode = error.code
        let errorMessage = error.message

        if (errorCode === "auth/invalid-credential") {
          errorCode = "Credenciales inválidas"
          errorMessage = "Verifica correo y contraseña"
        } else if (errorCode === "auth/missing-password") {
          errorCode = "Error en contraseña"
          errorMessage = "No se reconoció la contraseña"
        } else {
          errorCode = "Error"
          errorMessage = "Verifica tus credenciales"
        }

        Alert.alert(errorCode, errorMessage)
      })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>

      <TextInput
        placeholder='Correo electrónico'
        placeholderTextColor="#7f8c8d"
        onChangeText={setCorreo}
        style={styles.input}
        keyboardType='email-address'
        autoCapitalize='none'
      />

      <TextInput
        placeholder='Contraseña'
        placeholderTextColor="#7f8c8d"
        onChangeText={setContraseña}
        style={styles.input}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Restablecer')}>
        <Text style={styles.forgot}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8fa',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0a3d62',
    marginBottom: 30
  },
  input: {
    backgroundColor: '#ecf0f1',
    width: '85%',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 15
  },
  button: {
    backgroundColor: '#0a3d62',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginVertical: 10,
    width: '85%',
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600'
  },
  forgot: {
    color: '#2980b9',
    marginTop: 12,
    fontSize: 15
  }
})
