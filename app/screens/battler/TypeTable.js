import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

export default function TypeTable() {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    // Llamada a la PokeAPI para obtener los tipos
    fetch("https://pokeapi.co/api/v2/type")
      .then((res) => res.json())
      .then((data) => setTypes(data.results))
      .catch((err) => console.error(err));
  }, []);

  // Renderizar cada tipo con categorías ficticias (ejemplo)
  const renderType = ({ item })  => (
    <View style={styles.card}>
      <Text style={styles.typeName}>{item.name.toUpperCase()}</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Eficaz:</Text>
        <Text style={styles.value}>Ejemplo</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Súper eficaz:</Text>
        <Text style={styles.value}>Ejemplo</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Debilidades:</Text>
        <Text style={styles.value}>Ejemplo</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Súper debilidades:</Text>
        <Text style={styles.value}>Ejemplo</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tabla de Tipos Pokémon</Text>
      <FlatList
        data={types}
        keyExtractor={(item) => item.name}
        renderItem={renderType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 12 },
  card: {
    backgroundColor: "#f4f4f4",
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
  },
  typeName: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  row: { flexDirection: "row", marginBottom: 4 },
  label: { fontWeight: "bold", marginRight: 6 },
  value: { color: "#333" },
});