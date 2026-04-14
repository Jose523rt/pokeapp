import { ScrollView, View, Image, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import BuscadorPoke from "../../components/buscador/BuscadorPoke";
import { Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function SearchScreens() {
  const [search, setSearch] = useState("");
  const [pokemon, setPokemon] = useState([]);
  const [error, setError] = useState(false);

  const nav = useNavigation();

  const getPokemon = () => {
    const requestOptions = { method: "GET", redirect: "follow" };

    if (search === "") {
      fetch(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`, requestOptions)
        .then((res) => res.json())
        .then((data) =>
          Promise.all(data.results.map((p) => fetch(p.url).then((r) => r.json())))
        )
        .then((allPokemon) => setPokemon(allPokemon))
        .catch((error) => console.error(error));
    } else {
      fetch(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`, requestOptions)
        .then((response) => response.json())
        .then((result) => setPokemon([result]))
        .catch(() => setError(true));
    }
  };

  useEffect(() => {
    getPokemon();
  }, [search]);

  return (
        <View style={styles.view}>
    
          {/* ── Pokeball centrada ── */}
          <Image
            source={require("../../assets/pokebola.png")}
            style={styles.pokeballBg}
            resizeMode="contain"
          />
    
      
      <BuscadorPoke style={{ paddingBottom: 40 }} search={search} setSearch={setSearch} />

      <ScrollView>
        
        {pokemon.map((pkmn, index) => (
          <Card key={index} style={styles.card} onPress={() => nav.push("info", { id: pkmn.id })}>
            <View style={styles.cardInner}>
              
              <Image
                source={{ uri: pkmn.sprites.front_default }}
                style={styles.image}
                resizeMode="contain"
              />
              <Text style={styles.name}>{pkmn.name}</Text>
            </View>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}

const C = {
  bg:     '#F5F5F5',
  card:   '#1A3A5C',
  celda: '#446384',
  border: '#2A2A2A',
  panel:  '#2A2A2A',
  text:   '#F5F5F5',
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: C.bg,
    paddingTop: 12,
    paddingHorizontal: 12,
  },

  card: {
    backgroundColor: C.card,
    borderRadius: 14,
    borderWidth: 3,
    borderColor: C.border,
    elevation: 6,
    shadowColor: C.panel,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    overflow: 'hidden',
    marginBottom: 10,
  },

  cardInner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 6,
  },

  image: {
    width: 90,
    height: 90,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: C.border,
    backgroundColor: C.celda,
    marginRight: 14,
  },

  name: {
    flex: 1,
    fontSize: 20,
    fontWeight: '900',
    color: C.text,
    textTransform: 'capitalize',
    letterSpacing: 0.3,
  },
    // Pokeball fondo
  pokeballBg: {
    position: 'absolute',
    width: 340,
    height: 340,
    top: '23%',
    left: '5%',
    opacity: 0.12,
  },
});