import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { supabase } from '../supabase/Config'

type Pedido = {
  producto_nombre: string
  cantidad: number
  usuario_id: string
  usuario_nombre: string
  total: number
  fecha?: string
}

export default function OrdenScreen() {
  const [pedidos, setPedidos] = useState<Pedido[]>([])

  useEffect(() => {
    const obtenerPedidos = async () => {
      const { data, error } = await supabase
        .from('pedidos')
        .select('*')
        .order('fecha', { ascending: false }) // opcional: para ver los últimos pedidos primero

      if (error) console.error('Error al traer pedidos', error)
      else setPedidos(data as Pedido[])
    }

    obtenerPedidos()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Pedidos realizados</Text>
      <FlatList
        data={pedidos}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.pedidoCard}>
            <Text style={styles.producto}>🛒 {item.producto_nombre}</Text>
            <Text style={styles.info}>Cantidad: {item.cantidad}</Text>
            <Text style={styles.info}>Cliente: {item.usuario_nombre} ({item.usuario_id})</Text>
            <Text style={styles.total}>Total: ${item.total.toFixed(2)}</Text>
            {item.fecha && <Text style={styles.fecha}>Fecha: {item.fecha}</Text>}
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f6f8fa',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#0a3d62',
  },
  pedidoCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  producto: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#e67e22'
  },
  info: {
    fontSize: 15,
    color: '#333',
    marginBottom: 2
  },
  total: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 4,
    color: '#28a745'
  },
  fecha: {
    marginTop: 4,
    fontSize: 13,
    color: '#555'
  }
})
