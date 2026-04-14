import { ScrollView, StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

export default function TypeSearch() {

  const [types, setTypes] = useState([]);
  const nav = useNavigation();

  const getPokemon = () => {
    const requestOptions = { method: "GET", redirect: "follow" };
    fetch(`https://pokeapi.co/api/v2/type?offset=0&limit=17`, requestOptions)
      .then((res) => res.json())
      .then((data) =>
        Promise.all(data.results.map((p) => fetch(p.url).then((r) => r.json())))
      )
      .then((allTypes) => setTypes(allTypes))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getPokemon();
  }, []);

  return (
    <View style={styles.screen}>

      <Image
        source={require("../../assets/pokebola.png")}
        style={styles.pokeballBg}
        resizeMode="contain"
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.grid}>
          {types.map((type, index) => (
            <TouchableOpacity
              key={index}
              style={styles.typeButton}
              onPress={() => nav.push('typetable', { id: type.id })}
            >
              <Image
                source={{ uri: type.sprites['generation-ix']['scarlet-violet'].name_icon }}
                style={styles.typeImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const C = {
  bg:     '#F0F0F0',
  red:    '#CD2B2B',
  text:   '#FFFFFF',
  border: '#E0E0E0',
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: C.bg,
    overflow: 'hidden',
  },
  pokeballBg: {
    position: 'absolute',
    width: 340,
    height: 340,
    top: '50%',
    left: '50%',
    marginTop: -170,
    marginLeft: -170,
    opacity: 0.12,
  },
  header: {
    backgroundColor: C.red,
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  headerTitle: {
    color: C.text,
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 0.5,
  },

  scrollContent: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
  },

  typeButton: {
    borderRadius: 30,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },

  typeImage: {
    width: 130,
    height: 40,
  },
});