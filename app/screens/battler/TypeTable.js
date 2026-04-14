import { ScrollView, StyleSheet, View, Text } from "react-native";
import React, { useState, useEffect } from "react";

export default function TypeTable({ route }) {
  const id = route?.params?.id;
  const [dmgrel, setDmgrel] = useState(null);
  const [typeName, setTypeName] = useState('');
  const [isOffx2, setIsOffx2] = useState(false);
  const [isDefx2, setIsDefx2] = useState(false);
  const [isOffx05, setIsOffx05] = useState(false);
  const [isDefx05, setIsDefx05] = useState(false);
  const [isOffnull, setIsOffnull] = useState(false);
  const [isDefnull, setIsDefnull] = useState(false);

  function getDmgRel(a) {
    const requestOptions = { method: "GET", redirect: "follow" };

    fetch(`https://pokeapi.co/api/v2/type/${a}/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const rel = result.damage_relations;
        setTypeName(result.name);
        setDmgrel(rel);
        setIsOffx2(rel.double_damage_to.length > 0);
        setIsDefx2(rel.double_damage_from.length > 0);
        setIsOffx05(rel.half_damage_to.length > 0);
        setIsDefx05(rel.half_damage_from.length > 0);
        setIsOffnull(rel.no_damage_to.length > 0);
        setIsDefnull(rel.no_damage_from.length > 0);
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    if (id) getDmgRel(id);
  }, [id]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Tipo: {typeName}</Text>

      <Text style={styles.header}>Ofensiva</Text>

      <Text style={styles.sectionTitle}>Doble daño a:</Text>
      <View style={styles.typeList}>
        {isOffx2 ? dmgrel.double_damage_to.map((t, i) => (
          <View key={i} style={styles.typeBadge}>
            <Text style={styles.typeText}>{t.name}</Text>
          </View>
        )) : <Text style={styles.none}>Ningún tipo</Text>}
      </View>

      <Text style={styles.sectionTitle}>Mitad de daño a:</Text>
      <View style={styles.typeList}>
        {isOffx05 ? dmgrel.half_damage_to.map((t, i) => (
          <View key={i} style={styles.typeBadge}>
            <Text style={styles.typeText}>{t.name}</Text>
          </View>
        )) : <Text style={styles.none}>Ningún tipo</Text>}
      </View>

      <Text style={styles.sectionTitle}>No daña a:</Text>
      <View style={styles.typeList}>
        {isOffnull ? dmgrel.no_damage_to.map((t, i) => (
          <View key={i} style={styles.typeBadge}>
            <Text style={styles.typeText}>{t.name}</Text>
          </View>
        )) : <Text style={styles.none}>Ningún tipo</Text>}
      </View>

      <Text style={styles.header}>Defensiva</Text>

      <Text style={styles.sectionTitle}>Recibe doble daño de:</Text>
      <View style={styles.typeList}>
        {isDefx2 ? dmgrel.double_damage_from.map((t, i) => (
          <View key={i} style={styles.typeBadge}>
            <Text style={styles.typeText}>{t.name}</Text>
          </View>
        )) : <Text style={styles.none}>Ningún tipo</Text>}
      </View>

      <Text style={styles.sectionTitle}>Recibe la mitad del daño de:</Text>
      <View style={styles.typeList}>
        {isDefx05 ? dmgrel.half_damage_from.map((t, i) => (
          <View key={i} style={styles.typeBadge}>
            <Text style={styles.typeText}>{t.name}</Text>
          </View>
        )) : <Text style={styles.none}>Ningún tipo</Text>}
      </View>

      <Text style={styles.sectionTitle}>No recibe daño de:</Text>
      <View style={styles.typeList}>
        {isDefnull ? dmgrel.no_damage_from.map((t, i) => (
          <View key={i} style={styles.typeBadge}>
            <Text style={styles.typeText}>{t.name}</Text>
          </View>
        )) : <Text style={styles.none}>Ningún tipo</Text>}
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginBottom: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 6,
  },
  typeList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  typeBadge: {
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  typeText: {
    textTransform: 'capitalize',
    fontWeight: '500',
  },
  none: {
    color: '#aaa',
    fontStyle: 'italic',
  },
});