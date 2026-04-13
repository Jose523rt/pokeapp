import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import{ TeamContext } from "../../context/Team";
//import EstadoGlobalUser, { EstadoGlobalUserContext } from './app/context/EstadoGlobalUser';


export default function PokeInfo({ route }) {
  const id = route?.params?.id;
  const [pokemon, setPokemon] = useState([]);
  const [type1, setType1] = useState([]);
  const [type2, setType2] = useState([]);
  const [isT2, setIsT2] = useState(false);
  const { AddToTeam } = useContext(TeamContext);

  function GetTypes(a, b) {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`https://pokeapi.co/api/v2/type/${a}/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        //console.log(JSON.stringify(result.sprites));
        setType1([result]);
      })
      .catch((error) => console.error(error));

    if (b != undefined) {
      fetch(`https://pokeapi.co/api/v2/type/${b}/`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setType2([result]);
          setIsT2(true);
        })
        .catch((error) => console.error(error));
    }
  }

  useEffect(() => {
    if (!id) return;

    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setPokemon([result]);
        GetTypes(result.types[0].type.name, result.types[1]?.type.name);
      })
      .catch((error) => console.error(error));
  }, [id]);

  return (
    
    <ScrollView>
      <View>
        {pokemon.map((pkmn, index) => (
          <View key={index} style={styles.view}>
            <Text style={styles.name}>{pkmn.name}</Text>
            <Image
              source={{ uri: pkmn.sprites.front_default }}
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.types}>
              <Image
                style={styles.typeImage}
                source={{
                  uri: type1[0]?.sprites?.["generation-ix"]?.["scarlet-violet"]
                    ?.name_icon,
                }}
              />
              {isT2 && (
                <Image
                  style={styles.typeImage}
                  source={{
                    uri: type2[0]?.sprites?.["generation-ix"]?.[
                      "scarlet-violet"
                    ]?.name_icon,
                  }}
                />
              )}
            </View>
            <TouchableOpacity
              onPress={() => AddToTeam(pkmn)}
              style={styles.add}
            >
              <Text style={styles.addText}>Agregar al equipo</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: "#fff",
  },
  view: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    textTransform: "capitalize",
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
  },
  types: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
  typeImage: {
    width: 100,
    height: 30,
  },
  add: {
    marginTop: 20,
    backgroundColor: "#1d2138",
    padding: 10,
    borderRadius: 10,
  },
  addText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
