import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'CreateCinema'>;

const CreateCinemaScreen = ({ navigation }: Props) => {

  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [horario_de_abertura, setHorarioAbertura] = useState(''); 
  const [horario_de_fechamento, setHorarioFechamento] = useState(''); 
  const [saving, setSaving] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setNome('');
      setEndereco('');
      setHorarioAbertura('');
      setHorarioFechamento('');
    }, [])
  );

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch('http://localhost:8000/cinemas/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, endereco, horario_de_abertura, horario_de_fechamento }),
    });
    navigation.navigate('Cinemas');  
    setSaving(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo Cinema</Text>
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
      {saving
        ? <ActivityIndicator size="large" color="#4B7BE5" />
        : <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
      }
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

export default CreateCinemaScreen;