import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/Config';

type Location = {
  latitude: number;
  longitude: number;
  direccion: string;
};

export default function MapaScreen() {
  const [location, setLocation] = useState<Location>({
    latitude: -0.2526,
    longitude: -78.5224,
    direccion: "Cargando...",
  });

  useEffect(() => {
    const fetchLocation = async () => {
      const docRef = doc(db, "config", "ubicacion");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data() as Location;
        setLocation({
          latitude: data.latitude,
          longitude: data.longitude,
          direccion: data.direccion,
        });
      }
    };
    fetchLocation();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Ubicación del Negocio</Text>
        <Text style={styles.address}>{location.direccion}</Text>
      </View>

      <MapView
        style={styles.map}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.002,
          longitudeDelta: 0.002,
        }}
      >
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title="Ubicación actual"
          description={location.direccion}
        />
      </MapView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8fa',
  },
  header: {
    padding: 16,
    backgroundColor: '#0a3d62',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  address: {
    marginTop: 4,
    fontSize: 14,
    color: 'white',
  },
  map: {
    flex: 1,
  },
});
