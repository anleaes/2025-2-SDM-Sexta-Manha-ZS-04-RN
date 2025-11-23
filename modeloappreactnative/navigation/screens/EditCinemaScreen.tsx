import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'EditCinema'>;

const EditCinemaScreen = ({ route, navigation }: Props) => {
  const { cinema } = route.params;
  const [nome, setNome] = useState(cinema.nome);
  const [endereco, setEndereco] = useState(cinema.endereco);
  const [horario_de_abertura, setHorarioAbertura] = useState(cinema.horario_de_abertura); 
  const [horario_de_fechamento, setHorarioFechamento] = useState(cinema.horario_de_fechamento); 
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setNome(cinema.nome);
    setEndereco(cinema.endereco);
    setHorarioAbertura(cinema.horario_de_abertura);
    setHorarioFechamento(cinema.horario_de_fechamento);
  }, [cinema]);  

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch(
      `http://localhost:8000/cinemas/${cinema.id}/`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, endereco, horario_de_abertura, horario_de_fechamento }),
      }
    );
    navigation.navigate('Cinemas');        
    setSaving(false);  
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome</Text>
      <TextInput
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />
      <Text style={styles.label}>Endereço</Text>
      <TextInput
        value={endereco}
        onChangeText={setEndereco}
        style={[styles.input, { height: 100 }]}
        multiline
      />
      <Text style={styles.label}>Horário de Abertura</Text>
      <TextInput
        value={horario_de_abertura}
        onChangeText={setHorarioAbertura}
        style={styles.input}
      />
      <Text style={styles.label}>Horário de Fechamento</Text>
      <TextInput
        value={horario_de_fechamento}
        onChangeText={setHorarioFechamento}
        style={styles.input}
      />
      {saving ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
      )}
      <Button title="Voltar" onPress={() => navigation.navigate('Cinemas')} />
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

export default EditCinemaScreen;