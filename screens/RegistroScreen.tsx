import { Alert, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase/Config';
import { doc, setDoc } from 'firebase/firestore';

export default function RegistroScreen({ navigation }: any) {

    const [correo, setcorreo] = useState("")
    const [contraseña, setcontraseña] = useState("")
    const [nombre, setnombre] = useState("")
    const [edad, setedad] = useState(0)

    function guardar(uid: string) {
        setDoc(doc(db, "usuarios", uid), {
            nombre: nombre,
            correo: correo,
            edad: edad
        })
            .then(() => {
                console.log("Datos guardados en Firestore");
                Alert.alert("Guardado", "Usuario registrado correctamente");
            })
            .catch((error) => {
                console.error("Error al guardar datos:", error);
                Alert.alert("Error", "No se pudo guardar en Firestore");
            });
    }

    function Registro() {
        createUserWithEmailAndPassword(auth, correo, contraseña)
            .then((userCredential) => {
                const user = userCredential.user;
                guardar(user.uid);
                navigation.navigate('Login')
            })
            .catch((error) => {
                console.error("Error al registrar:", error)
                Alert.alert("Error", "No se pudo registrar el usuario. Revisa los datos.")
            });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registro</Text>
            <Text style={styles.subtitle}>Crea tu cuenta para continuar</Text>

            <TextInput
                placeholder='Correo electrónico'
                placeholderTextColor="#888"  
                value={correo}               
                onChangeText={(texto) => setcorreo(texto)}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                placeholder='Contraseña'
                placeholderTextColor="#888"  
                value={contraseña}           
                onChangeText={(texto) => setcontraseña(texto)}
                style={styles.input}
                secureTextEntry
            />

            <TextInput
                placeholder='Nombre completo'
                placeholderTextColor="#888"  
                value={nombre}               
                onChangeText={(texto) => setnombre(texto)}
                style={styles.input}
            />

            <TextInput
                placeholder='Edad'
                placeholderTextColor="#888"  
                value={edad ? edad.toString() : ''}  
                onChangeText={(texto) => setedad(+texto)}
                style={styles.input}
                keyboardType="numeric"
            />


            <TouchableOpacity style={styles.button} onPress={Registro}>
                <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>

            <Text
                style={styles.irLogin}
                onPress={() => navigation.navigate('Login')}
            >
                ¿Ya tienes cuenta? Inicia sesión
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
        marginBottom: 40
    },
    input: {
        backgroundColor: "#fff",
        fontSize: 18,
        width: '90%',
        marginVertical: 8,
        padding: 12,
        borderRadius: 10,
        elevation: 2,
        color: '#000'
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
});
