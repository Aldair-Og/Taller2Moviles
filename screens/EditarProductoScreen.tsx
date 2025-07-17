import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ScrollView } from 'react-native';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/Config';


  export default function EditarProductoScreen({ route, navigation }: any) {
  const { producto } = route.params;

  const [nombre, setNombre] = useState(producto.nombre);
  const [precio, setPrecio] = useState(String(producto.precio));
  const [imagenUrl, setImagenUrl] = useState(producto.imagenUrl);
  const [descripcion, setDescripcion] = useState(producto.descripcion);


  async function actualizarProducto() {
    await updateDoc(doc(db, "productos", producto.id), {
      nombre,
      precio: parseFloat(precio),
      imagenUrl,
      descripcion
    });
    Alert.alert("Actualizado", "Producto actualizado correctamente");
    navigation.goBack();
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Editar Producto</Text>
      <TextInput
        placeholder='Nombre'
        placeholderTextColor="#7f8c8d"
        value={nombre}
        onChangeText={setNombre}
        style={styles.input}
      />
      <TextInput
        placeholder='Precio'
        placeholderTextColor="#7f8c8d"
        value={precio}
        onChangeText={setPrecio}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder='Imagen URL'
        placeholderTextColor="#7f8c8d"
        value={imagenUrl}
        onChangeText={setImagenUrl}
        style={styles.input}
      />
      <TextInput
        placeholder='Descripción'
        placeholderTextColor="#7f8c8d"
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
        numberOfLines={3}
        style={[styles.input, styles.textarea]}
      />
      <TouchableOpacity style={styles.button} onPress={actualizarProducto}>
        <Text style={styles.buttonText}>Actualizar</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f6f8fa',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0a3d62',
    marginBottom: 30,
    textAlign: 'center'
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
  textarea: {
    height: 100,
    textAlignVertical: 'top'
  },
  button: {
    backgroundColor: '#27ae60',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginTop: 20,
    width: '85%',
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600'
  }
});
