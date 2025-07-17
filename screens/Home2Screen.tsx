import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'

export default function HomeScreen({ navigation }: any) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Panel de Administración</Text>
      <Text style={styles.subtitle}>Gestiona tus productos y pedidos</Text>

      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={[styles.card, styles.readCard]}
          onPress={() => navigation.navigate("Catalogo")}
        >
          <Text style={styles.cardIcon}>📦</Text>
          <Text style={styles.cardTitle}>Ver Productos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, styles.createCard]}
          onPress={() => navigation.navigate("AgregarP")}
        >
          <Text style={styles.cardIcon}>➕</Text>
          <Text style={styles.cardTitle}>Agregar Producto</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, styles.createCard]}
          onPress={() => navigation.navigate("Mapa")}
        >
          <Text style={styles.cardIcon}>🗺️</Text>
          <Text style={styles.cardTitle}>Ubicacion del Negocio</Text>
        </TouchableOpacity>


        <TouchableOpacity
          style={[styles.card, styles.createCard]}
          onPress={() => navigation.navigate("EditarUbicacion")}
        >
          <Text style={styles.cardIcon}>✏️</Text>
          <Text style={styles.cardTitle}>Editar Ubicación del Negocio</Text>
        </TouchableOpacity>


      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f6f8fa',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0a3d62',
    marginTop: 20,
    marginBottom: 6,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 30,
    textAlign: 'center'
  },
  cardContainer: {
    width: '100%',
    maxWidth: 400,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 25,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  createCard: {
    borderLeftWidth: 6,
    borderLeftColor: '#27ae60',
  },
  readCard: {
    borderLeftWidth: 6,
    borderLeftColor: '#2980b9',
  },
  cardIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
  },
})
