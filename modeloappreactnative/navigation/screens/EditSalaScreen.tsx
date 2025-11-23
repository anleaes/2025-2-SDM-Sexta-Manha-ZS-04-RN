import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'EditSala'>;

const EditSalaScreen = ({ route, navigation }: Props) => {
  const { sala } = route.params;
  const [lotacao_maxima, setLotacaoMaxima] = useState(String(sala.lotacao_maxima));
  const [assentos_normais, setAssentosNormais] = useState(String(sala.assentos_normais));
  const [assentos_acessiveis, setAssentosAcessiveis] = useState(String(sala.assentos_acessiveis)); 
  const [cinema, setCinema] = useState(String(sala.cinema.id)); 
  const [saving, setSaving] = useState(false);

  const [cinemas, setCinemas] = useState<any[]>([]);
  const [loadingCinemas, setLoadingCinemas] = useState(true);

  useEffect(() => {
    setLotacaoMaxima(String(sala.lotacao_maxima));
    setAssentosNormais(String(sala.assentos_normais));
    setAssentosAcessiveis(String(sala.assentos_acessiveis));
    setCinema(String(sala.cinema.id));
  }, [sala]);  

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
    const res = await fetch(
      `http://localhost:8000/salas/${sala.id}/`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lotacao_maxima, assentos_normais, assentos_acessiveis, cinema }),
      }
    );
    navigation.navigate('Salas');        
    setSaving(false);  
  };

  return (
    <View style={styles.container}>
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
      {saving ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
      )}
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
  label: { 
    fontWeight: 'bold', 
    marginTop: 12, 
    marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },
});

export default EditSalaScreen;