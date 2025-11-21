import { Ionicons } from '@expo/vector-icons';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DrawerParamList } from '../DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'Cinemas'>;

export type Cinema = {
  id: number;
  nome: string;
  endereco: string;
  horario_de_abertura: string;
  horario_de_fechamento : string;
};

const CinemasScreen = ({ navigation }: Props) => {

  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCinemas = async () => {
    setLoading(true);
    const response = await fetch('http://localhost:8000/cinemas/');
    const data = await response.json();
    setCinemas(data);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchCinemas();
    }, [])
  );

  const handleDelete = async (id: number) => {
    const res = await fetch(`http://localhost:8000/cinemas/${id}/`, {
      method: 'DELETE',
    });
    setCinemas(prev => prev.filter(c => c.id !== id));
  };

  const renderItem = ({ item }: { item: Cinema }) => (
    <View style={styles.card}>
      <Text style={styles.nome}>{item.nome}</Text>
      <Text style={styles.endereco}>{item.endereco}</Text>
      <Text style={styles.horario_de_abertura}>{item.horario_de_abertura}</Text>
      <Text style={styles.horario_de_fechamento}>{item.horario_de_fechamento}</Text>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('EditCinema', { cinema: item })}
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
      <Text style={styles.title}>Cinemas</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <FlatList
          data={cinemas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
      <TouchableOpacity
      style={styles.fab}
      onPress={() => navigation.navigate('CreateCinema')}
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
  nome: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
  endereco: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  horario_de_abertura: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
  horario_de_fechamento: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
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

export default CinemasScreen;