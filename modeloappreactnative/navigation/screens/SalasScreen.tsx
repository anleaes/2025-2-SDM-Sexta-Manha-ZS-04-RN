import { Ionicons } from '@expo/vector-icons';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DrawerParamList } from '../DrawerNavigator';
import { Cinema } from './CinemasScreen';

type Props = DrawerScreenProps<DrawerParamList, 'Salas'>;

export type Sala = {
  id: number;
  lotacao_maxima: number;
  assentos_normais: number;
  assentos_acessiveis: number;
  cinema : number;
};

const SalasScreen = ({ navigation }: Props) => {

  const [salas, setSalas] = useState<Sala[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSalas = async () => {
    setLoading(true);
    const response = await fetch('http://localhost:8000/salas/');
    const data = await response.json();
    setSalas(data);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchSalas();
    }, [])
  );

  const handleDelete = async (id: number) => {
    const res = await fetch(`http://localhost:8000/salas/${id}/`, {
      method: 'DELETE',
    });
    setSalas(prev => prev.filter(c => c.id !== id));
  };

  const renderItem = ({ item }: { item: Sala }) => (
    <View style={styles.card}>
        <Text style={styles.lotacao_maxima}>Lotação Máxima: {item.lotacao_maxima}</Text>
        <Text style={styles.assentos_normais}>Assentos Normais: {item.assentos_normais}</Text>
        <Text style={styles.assentos_acessiveis}>Assentos Acessíveis: {item.assentos_acessiveis}</Text>
        <Text style={styles.cinema}>Cinema (ID): {item.cinema}</Text>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('EditSala', { sala: item })}
      >
      <Text style={styles.editText}>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item.id)}
      >
      <Text style={styles.editText}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );

  return ( 
    <View style={styles.container}>
      <Text style={styles.title}>Salas</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <FlatList
          data={salas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
      <TouchableOpacity
      style={styles.fab}
      onPress={() => navigation.navigate('CreateSala')}
    >
      <Ionicons name="add" size={28} color="#fff"  />
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#f0f4ff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  cinema: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  lotacao_maxima: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  assentos_normais: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  assentos_acessiveis: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  editButton: {
    backgroundColor: '#4B7BE5',
    padding: 8,
    borderRadius: 6,
    marginRight: 8,
  },
  editText: { 
    color: '#fff', 
    fontWeight: '500' 
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#0D47A1',
    borderRadius: 28,
    padding: 14,
    elevation: 4,
  },
  deleteButton: {
    backgroundColor: '#E54848',
    padding: 8,
    borderRadius: 6,
    marginRight: 8,
  },
  row: { 
    flexDirection: 'row', 
    marginTop: 8, 
    alignSelf: 'flex-end' 
  },
});

export default SalasScreen;