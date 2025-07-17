import { FlatList, Image, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase/Config'

type Producto = {
  id: string
  nombre: string
  precio: number
  imagenUrl: string
  descripcion: string
}

export default function CatalogoScreen({ navigation }: any) {
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
    const unsubscribe = navigation.addListener('focus', () => {
      leerProductos()
    })
    return unsubscribe
  }, [navigation])

  async function eliminarProducto(id: string) {
    Alert.alert(
      "Confirmar eliminación",
      "¿Estás seguro que quieres eliminar este producto?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Eliminar", 
          style: "destructive",
          onPress: async () => {
            await deleteDoc(doc(db, "productos", id))
            leerProductos()
          } 
        }
      ]
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={productos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.imagenUrl }} style={styles.imagen} />
            <Text style={styles.nombre}>{item.nombre}</Text>
            <Text style={styles.precio}>${item.precio}</Text>

            <View style={styles.botones}>
              <TouchableOpacity 
                style={styles.editar} 
                onPress={() => navigation.navigate("Editar", { producto: item })}
              >
                <Text style={styles.btnText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.eliminar} 
                onPress={() => eliminarProducto(item.id)}
              >
                <Text style={styles.btnText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
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
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3
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
    color: '#333',
    marginBottom: 10
  },
  botones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 10
  },
  editar: {
    backgroundColor: '#2980b9',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8
  },
  eliminar: {
    backgroundColor: '#c0392b',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8
  },
  btnText: {
    color: '#fff',
    fontWeight: '600'
  }
})
