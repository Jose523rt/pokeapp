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
      <Text style={styles.title}>{`Tipo: ${typeName}`}</Text>

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

const C = {
  bg:       '#F5F5F5',
  red:      '#CD2B2B',
  dark:     '#1A1A1A',
  white:    '#FFFFFF',
  card:     '#1A3A5C',
  border:   '#2A2A2A',
  section:  '#2D2D2D',
  subtext:  '#444444',
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: C.bg,
    padding: 14,
    paddingBottom: 30,
  },

  // Título principal "Tipo: fire"
  title: {
    fontSize: 26,
    fontWeight: '900',
    color: C.dark,
    textTransform: 'capitalize',
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: 0.5,
  },

  // "Ofensiva" / "Defensiva"
  header: {
    fontSize: 18,
    fontWeight: '900',
    color: C.white,
    backgroundColor: C.red,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    letterSpacing: 0.5,
    overflow: 'hidden',
  },

  // "Doble daño a:", etc.
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: C.subtext,
    textTransform: 'capitalize',
    marginBottom: 6,
    marginTop: 4,
    letterSpacing: 0.3,
  },

  // Fila de badges
  typeList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },

  // Badge individual de tipo
  typeBadge: {
    backgroundColor: C.card,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: C.border,
    paddingHorizontal: 14,
    paddingVertical: 5,
    elevation: 2,
    shadowColor: C.dark,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
  },

  typeText: {
    color: C.white,
    fontSize: 13,
    fontWeight: '800',
    textTransform: 'capitalize',
    letterSpacing: 0.3,
  },

  // "Ningún tipo"
  none: {
    fontSize: 13,
    color: '#AAAAAA',
    fontStyle: 'italic',
    marginBottom: 4,
  },
});