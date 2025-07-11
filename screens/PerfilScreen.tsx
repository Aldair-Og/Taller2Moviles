import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../firebase/Config'
import { doc, getDoc } from 'firebase/firestore'
import { LinearGradient } from 'expo-linear-gradient'
import * as Animatable from 'react-native-animatable'
import { Ionicons } from '@expo/vector-icons'

const { width } = Dimensions.get('window');

export default function PerfilScreen({ navigation }: any) {
  const [nombre, setNombre] = useState("")
  const [edad, setEdad] = useState(0)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        leer(user.uid)
      }
    })
  }, [])

  function leer(uid: string) {
    const docRef = doc(db, "usuarios", uid)
    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data()
          setNombre(data.nombre)
          setEdad(data.edad)
        }
      })
      .catch((error) => console.error("Error al leer datos:", error))
  }

  function logout() {
    signOut(auth)
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        })
      })
      .catch((error) => console.error("Error al cerrar sesión", error))
  }

  return (
    <LinearGradient
      colors={['#ff6a00', '#ee0979']}
      style={styles.container}
      start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
    >
      <Animatable.Image
        animation="fadeInDown"
        duration={1000}
        source={{ uri: 'https://scontent.fuio35-1.fna.fbcdn.net/v/t39.30808-6/498619487_710673041338907_7993682079893736557_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=IVklalmmbycQ7kNvwG-tEIa&_nc_oc=AdlFs4Qh56J-5mTWivLKCNDRNDqnnTMma8LU9IPSN1kQ3_mqH0RiGaEcVASRopElVC9dZAZbS6HQafbzNHkMGO2l&_nc_zt=23&_nc_ht=scontent.fuio35-1.fna&_nc_gid=j5ZZVY0cLLzm_wcMXtUOcg&oh=00_AfSGvDyb5h75O5-FCNgnqf-Uk4gYWo-CipUZB50nuvuG0Q&oe=68747ADE' }}
        style={styles.logo}
      />

      <Animatable.Text animation="fadeIn" duration={1500} style={styles.titulo}>
        Mi Perfil
      </Animatable.Text>

      <Animatable.View animation="fadeInUp" duration={1500} style={styles.card}>
        <Text style={styles.nombre}>{nombre}</Text>
        <Text style={styles.dato}>Edad: {edad}</Text>
      </Animatable.View>

      <TouchableOpacity onPress={logout} activeOpacity={0.8}>
        <LinearGradient
          colors={['#ff512f', '#dd2476']}
          style={styles.btnCerrar}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
        >
          <Ionicons name="log-out-outline" size={24} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.btnTexto}>Cerrar sesión</Text>
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  logo: {
    width: 130,
    height: 130,
    borderRadius: 65,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#fff'
  },
  titulo: {
    fontSize: 30,
    color: '#fff',
    fontWeight: '700',
    marginBottom: 25
  },
  card: {
    backgroundColor: '#fff',
    width: width * 0.85,
    borderRadius: 18,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 50
  },
  nombre: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10
  },
  dato: {
    fontSize: 20,
    color: '#666'
  },
  btnCerrar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 40,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5
  },
  btnTexto: {
    color: '#fff',
    fontSize: 19,
    fontWeight: '600'
  }
})
