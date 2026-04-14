import { ScrollView, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

export default function TypeSearch() {

  const [types, setTypes] = useState([]);

  const nav = useNavigation();

  const getPokemon = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    
      fetch(`https://pokeapi.co/api/v2/type?offset=0&limit=17`, requestOptions)
       .then((res) => res.json())
       .then((data) =>
       Promise.all(
          data.results.map((p) => fetch(p.url).then((r) => r.json()))
        ))
        .then((allTypes) => setTypes(allTypes))
        .catch((error) => console.error(error));
  };

  useEffect(() => {
  getPokemon();
}, []);

  return (
    <ScrollView>
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
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  typeButton: {
    width: 100,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeImage: {
    width: '100%',
    height: '100%',
  },
})