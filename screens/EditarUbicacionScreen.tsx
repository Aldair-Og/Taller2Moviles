import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/Config';

export default function EditarUbicacionScreen({ navigation }: any) {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [direccion, setDireccion] = useState('');

  useEffect(() => {
    const fetchLocation = async () => {
      const docRef = doc(db, "config", "ubicacion");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setLatitude(String(data.latitude));
        setLongitude(String(data.longitude));
        setDireccion(data.direccion);
      }
    };
    fetchLocation();
  }, []);

  const guardarUbicacion = async () => {
    const latNum = parseFloat(latitude);
    const lngNum = parseFloat(longitude);

    if (isNaN(latNum) || isNaN(lngNum) || direccion.trim() === '') {
      Alert.alert('Error', 'Por favor ingresa valores válidos');
      return;
    }

    try {
      await setDoc(doc(db, "config", "ubicacion"), {
        latitude: latNum,
        longitude: lngNum,
        direccion: direccion.trim(),
      });
      Alert.alert('Éxito', 'Ubicación guardada correctamente');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar la ubicación');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Latitud:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={latitude}
        onChangeText={setLatitude}
        placeholder="Ejemplo: -0.2526"
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Longitud:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={longitude}
        onChangeText={setLongitude}
        placeholder="Ejemplo: -78.5224"
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Dirección:</Text>
      <TextInput
        style={[styles.input, styles.inputDireccion]}
        value={direccion}
        onChangeText={setDireccion}
        placeholder="Ejemplo: Av. Pedro Vicente Maldonado S11-122, Quito"
        placeholderTextColor="#999"
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={guardarUbicacion}>
        <Text style={styles.buttonText}>Guardar Ubicación</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8fa',
    padding: 20,
  },
  label: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 6,
    marginTop: 15,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 16,
    color: '#333',
  },
  inputDireccion: {
    height: 80,
    textAlignVertical: 'top',
  },
  button: {
    marginTop: 30,
    backgroundColor: '#0a3d62',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
