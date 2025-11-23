import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../DrawerNavigator';
import { Picker } from '@react-native-picker/picker';

type Props = DrawerScreenProps<DrawerParamList, 'CreateSala'>;

const CreateSalaScreen = ({ navigation }: Props) => {

  const [lotacao_maxima, setLotacaoMaxima] = useState('');
  const [assentos_normais, setAssentosNormais] = useState('');
  const [assentos_acessiveis, setAssentosAcessiveis] = useState(''); 
  const [cinema, setCinema] = useState(''); 
  const [saving, setSaving] = useState(false);

  const [cinemas, setCinemas] = useState<any[]>([]);
  const [loadingCinemas, setLoadingCinemas] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setLotacaoMaxima('');
      setAssentosNormais('');
      setAssentosAcessiveis('');
      setCinema('');
    }, [])
  );

  useEffect(() => {
      const fetchCinemas = async () => {
        try {
          const res = await fetch('http://localhost:8000/cinemas/');
          const data = await res.json();
          setCinemas(data);
        } catch (err) {
          console.log("Erro ao buscar cinemas:", err);
        } finally {
          setLoadingCinemas(false);
        }
      };
  
      fetchCinemas();
    }, []);
  

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch('http://localhost:8000/salas/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lotacao_maxima, assentos_normais, assentos_acessiveis, cinema }),
    });
    navigation.navigate('Salas');  
    setSaving(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova Sala</Text>
      <Text style={styles.label}>Lotação Máxima</Text>
      <TextInput
        value={lotacao_maxima}
        onChangeText={setLotacaoMaxima}
        keyboardType = 'numeric'
        style={styles.input}
      />
      <Text style={styles.label}>Assentos Normais</Text>
      <TextInput
        value={assentos_normais}
        onChangeText={setAssentosNormais}
        keyboardType = 'numeric'
        style={styles.input}
      />
      <Text style={styles.label}>Assentos Acessíveis</Text>
      <TextInput
        value={assentos_acessiveis}
        onChangeText={setAssentosAcessiveis}
        keyboardType = 'numeric'
        style={styles.input}
      />
      <Text style={styles.label}>Cinema</Text>
      <Picker
        selectedValue={cinema}
        onValueChange={setCinema}
        style={styles.input}
        >
        {cinemas.map(cinema => (
            <Picker.Item key={cinema.id} label={cinema.nome} value={String(cinema.id)} />
        ))}
      </Picker>
      {saving
        ? <ActivityIndicator size="large" color="#4B7BE5" />
        : <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
      }
      <Button title="Voltar" onPress={() => navigation.navigate('Salas')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: '#fff' 
  },
  title: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginBottom: 12, 
    alignSelf: 'center' },
  label: { 
    fontWeight: '600', 
    marginTop: 12, 
    marginBottom: 4 
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },
});

export default CreateSalaScreen;