import { Alert, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/Config';

export default function RestablecerScreen({ navigation }: any) {
    const [correo, setcorreo] = useState("")

    function Restablecer() {
        sendPasswordResetEmail(auth, correo)
            .then(() => {
                Alert.alert("Enviado", "Te enviamos un enlace para restablecer tu contraseña.")
                navigation.goBack()
            })
            .catch((error) => {
                console.error("Error al enviar:", error)
                Alert.alert("Error", "No se pudo enviar el correo. Revisa el email ingresado.")
            });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recuperar contraseña</Text>
            <Text style={styles.subtitle}>Ingresa tu correo para enviarte un enlace de recuperación</Text>

            <TextInput
                placeholder='Correo electrónico'
                placeholderTextColor="#999"
                onChangeText={(texto) => setcorreo(texto)}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TouchableOpacity style={styles.button} onPress={Restablecer}>
                <Text style={styles.buttonText}>Enviar solicitud</Text>
            </TouchableOpacity>

            <Text 
                style={styles.irLogin}
                onPress={() => navigation.goBack()}
            >
                ¿Recordaste tu contraseña? Inicia sesión
            </Text>
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
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 6,
      color: '#0a3d62'
    },
    subtitle: {
      fontSize: 16,
      color: '#34495e',
      marginBottom: 40,
      textAlign: 'center'
    },
    input: {
      backgroundColor: "#fff",
      fontSize: 18,
      width: '90%',
      marginVertical: 8,
      padding: 12,
      borderRadius: 10,
      elevation: 2
    },
    button: {
      backgroundColor: '#0a3d62',
      paddingVertical: 14,
      paddingHorizontal: 40,
      borderRadius: 12,
      marginVertical: 10,
      width: '80%',
      alignItems: 'center'
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: '600'
    },
    irLogin: {
      marginTop: 15,
      fontSize: 16,
      color: '#0a3d62',
      textDecorationLine: 'underline'
    }
})

