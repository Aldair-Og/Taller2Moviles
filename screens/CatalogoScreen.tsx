import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/Config'

type Producto = {
  id: string
  nombre: string
  precio: number
  imagenUrl: string
  descripcion: string
}

export default function CatalogoScreen() {
  const [productos, setProductos] = useState<Producto[]>([])

  async function leerProductos() {
    let arreglo: Producto[] = []
    const querySnapshot = await getDocs(collection(db, "productos"))
    querySnapshot.forEach((doc) => {
      arreglo.push({ id: doc.id, ...doc.data() } as Producto)
    })
    setProductos(arreglo)
  }

  useEffect(() => {
    leerProductos()
  }, [])

  return (
    <View style={styles.container}>
      <FlatList
        data={productos}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.imagenUrl }} style={styles.imagen} />
            <Text style={styles.nombre}>{item.nombre}</Text>
            <Text style={styles.precio}>${item.precio}</Text>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  card: {
    backgroundColor: '#f8f8f8',
    borderRadius: 15,
    padding: 10,
    marginBottom: 15,
    alignItems: 'center'
  },
  imagen: {
    width: 150,
    height: 150,
    borderRadius: 10
  },
  nombre: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10
  },
  precio: {
    fontSize: 18,
    color: '#333'
  }
})