import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase/Config';
import { doc, getDoc } from 'firebase/firestore';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../supabase/Config';
const { width } = Dimensions.get('window');

export default function PerfilScreen({ navigation }: any) {
  const [image, setImage] = useState<string | null>(null);
  const [uid, setUid] = useState<string | null>(null);


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && uid) {
      setImage(result.assets[0].uri);
      subir(result.assets[0].uri, uid);
    }
  };

  async function subir(uri: string, uid: string) {
    if (!uri) return;

    const fileName = `avatar_${uid}.png`;

    const { data, error } = await supabase
      .storage
      .from('perfil')
      .upload(`public/${fileName}`, {
        cacheControl: '3600',
        upsert: true,
        uri: uri
      } as any, {
        contentType: 'image/png'
      });

    if (error) {
      console.error("Error subiendo imagen:", error);
      return;
    }

    console.log("Archivo subido:", fileName, data);
  }

  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState(0);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
        leer(user.uid);
      }
    });
  }, []);

  function leer(uid: string) {
    const docRef = doc(db, "usuarios", uid);
    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setNombre(data.nombre);
          setEdad(data.edad);
        }
      })
      .catch((error) => console.error("Error al leer datos:", error));
  }

  function logout() {
    signOut(auth)
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      })
      .catch((error) => console.error("Error al cerrar sesión", error));
  }

  return (
    <LinearGradient
      colors={['#ff6a00', '#ee0979']}
      style={styles.container}
      start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
    >
      <View style={styles.uploadContainer}>
        <Button title="Seleccionar foto de perfil" onPress={pickImage} color={'#0a3d62'} />
        {image && <Image source={{ uri: image }} style={styles.logo} />}
      </View>

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
  uploadContainer: {
    width: '80%',
    alignItems: 'center',
    marginVertical: 20,
  },
  btnGuardar: {
    marginTop: 10,
    width: '50%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginTop: 15,
    borderWidth: 3,
    borderColor: '#fff',
  },
  titulo: {
    fontSize: 30,
    color: '#fff',
    fontWeight: '700',
    marginBottom: 25,
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
    marginBottom: 50,
  },
  nombre: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  dato: {
    fontSize: 20,
    color: '#666',
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
    elevation: 5,
  },
  btnTexto: {
    color: '#fff',
    fontSize: 19,
    fontWeight: '600',
  },
});
