import { ScrollView, StyleSheet, View, Image, Text } from "react-native";
import React, { useState, useEffect } from "react";
import BuscadorPoke from "../../components/buscador/BuscadorPoke";
import { Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function SearchScreens() {
  const [search, setSearch] = useState("");
  const [pokemon, setPokemon] = useState([]);
  const [error, setError] = useState(false)


  const nav = useNavigation();

  const getPokemon = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    
    if (search === "") {
      fetch(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`, requestOptions)
       .then((res) => res.json())
       .then((data) =>
       Promise.all(
          data.results.map((p) => fetch(p.url).then((r) => r.json()))
        ))
        .then((allPokemon) => setPokemon(allPokemon))
  .catch((error) => console.error(error));
    }
    else {
      fetch(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`, requestOptions)
      .then((response) => response.json())
      .then((result) => setPokemon([result]))
      .catch((error) => setError(true));
      }
  };

  useEffect(() => {
    getPokemon();
  }, [search]);

  return (
    <View style={styles.view}>
      <BuscadorPoke style={{ paddingBottom: 15 }} search={search} setSearch={setSearch} />

      <ScrollView>
        {pokemon.map((pkmn, index) => (
          <Card key={index} style={styles.card} onPress={() => nav.push('info', { id: pkmn.id })}>
            <Image source={{ uri: pkmn.sprites.front_default }} style={styles.image} resizeMode="cover" />
            <Text style={styles.name}>{pkmn.name}</Text>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 10,
  },
  card: {
    marginVertical: 10,
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  name: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
});
