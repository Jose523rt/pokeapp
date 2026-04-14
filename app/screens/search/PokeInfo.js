import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { Portal, Modal } from "react-native-paper";
import{ TeamContext } from "../../context/Team";


export default function PokeInfo({ route }) {
  const id = route?.params?.id;
  const [pokemon, setPokemon] = useState([]);
  const [type1, setType1] = useState([]);
  const [type2, setType2] = useState([]);
  const [isT2, setIsT2] = useState(false);
  const { AddToTeam, visible, setVisible, showModal, hideModal } = useContext(TeamContext);


  function GetTypes(a, b) {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`https://pokeapi.co/api/v2/type/${a}/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
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
              onPress={() => {AddToTeam(pkmn)}}
              style={styles.add}
            >
              <Text style={styles.addText}>Agregar al equipo</Text>
            </TouchableOpacity>
          </View>
        ))}
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
          <Text variant='displayLarge' style={styles.text}>Pokemon agregado al equipo !!</Text>
        </Modal>
      </Portal>
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
    backgroundColor: "#f5f5f5",
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    textTransform: "capitalize",
    marginBottom: 10,
    color: "#1d2138", // azul oscuro
  },
  image: {
    width: 200,
    height: 200,
    borderWidth: 3,
    borderColor: "#CD2B2B", // rojo pokédex
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  types: {
    flexDirection: "row",
    gap: 20,
    marginTop: 5,
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#CD2B2B", // rojo pokédex
    borderWidth: 2,
    borderColor: "#CD2B2B",     // azul pokédex
  },
  typeImage: {
    width: 130,
    height: 30,
  },
  add: {
    marginTop: 20,
    backgroundColor: "#CD2B2B", // rojo pokédex
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: "#1d2138", // azul pokédex
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  addText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 0.5,
  },
  modal: {
    backgroundColor: "#1d2138", // azul pokédex
    padding: 20,
    height: 150,
    borderRadius: 16,
    margin:15,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
});
