import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper'; 
import api from '../services/api';

export default function Edit({ route, navigation }: any) {
  const { usuario } = route.params;
  const [nome, setNome] = useState(usuario.nome);
  const [email, setEmail] = useState(usuario.email);

  const handleSalvar = async () => {
    try {
      await api.put(`/usuarios/${usuario.id}`, { nome, email });
      Alert.alert("Sucesso", "Usuário atualizado!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar o usuário.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Nome"
        mode="outlined"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />
      <TextInput
        label="Email"
        mode="outlined"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />
      <Button mode="contained" onPress={handleSalvar} style={styles.button}>
        Salvar Alterações
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { marginBottom: 12 },
  button: { marginTop: 8 }
});