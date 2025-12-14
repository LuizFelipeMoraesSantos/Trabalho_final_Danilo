import * as React from "react";
import { ScrollView, View, StyleSheet, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import axios from "axios";

export default function BuscarCep() {
  const [cep, setCep] = React.useState("");
  const [logradouro, setLogradouro] = React.useState("");
  const [bairro, setBairro] = React.useState("");
  const [localidade, setLocalidade] = React.useState("");
  const [uf, setUf] = React.useState("");

  async function buscarCep() {
    if (cep.length !== 8) {
      Alert.alert("Erro", "Digite um CEP válido com 8 números");
      return;
    }
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.data.erro) {
        Alert.alert("Erro", "CEP não encontrado");
        return;
      }
      setLogradouro(response.data.logradouro);
      setBairro(response.data.bairro);
      setLocalidade(response.data.localidade);
      setUf(response.data.uf);
    } catch (e) {
      Alert.alert("Erro", "Erro ao buscar cep");
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.row}>
        <TextInput 
          label="CEP" 
          mode="outlined" 
          value={cep} 
          onChangeText={setCep} 
          keyboardType="numeric"
          maxLength={8}
          style={{ flex: 1, marginRight: 10, backgroundColor: 'white' }} 
        />
        <Button mode="contained" onPress={buscarCep} style={{justifyContent: 'center'}}>
          Buscar
        </Button>
      </View>

      <TextInput label="Logradouro" mode="outlined" value={logradouro} style={styles.input} disabled />
      <TextInput label="Bairro" mode="outlined" value={bairro} style={styles.input} disabled />
      <TextInput label="Localidade" mode="outlined" value={localidade} style={styles.input} disabled />
      <TextInput label="UF" mode="outlined" value={uf} style={styles.input} disabled />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  row: { flexDirection: "row", marginBottom: 20 },
  input: { marginBottom: 15, backgroundColor: 'white' },
});