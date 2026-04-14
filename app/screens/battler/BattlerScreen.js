import { View, Image, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import { Button, Card, Surface, Text, Portal, Modal } from "react-native-paper"
import React, { useState, useEffect, useContext } from 'react'
import { TeamContext } from "../../context/Team";
import { useNavigation } from "@react-navigation/native";

export default function BattlerScreen() {

  const { slot1, slot2, slot3, slot4, slot5, slot6 } = useContext(TeamContext);
  const team = [slot1, slot2, slot3, slot4, slot5, slot6];
  const [hasTeam, setHasTeam] = useState(false);
  const [key, setKey] = useState(50);
  const [foeKey, setFoeKey] = useState(1);
  const [activePoke, setActivePoke] = useState();
  const [activePokeFoe, setActivePokeFoe] = useState([]);
  const [pokemonFoe, setPokemonFoe] = useState([]);
  const [randomPoke, setRandomPoke] = useState();
  const random = Math.floor(Math.random() * (151 - 1 + 1) + 1);

 function battle() {
    if (!activePoke) {
      Alert.alert("¡Espera!", "Selecciona un Pokémon antes de batallar.");
      return;
    }
    if (activePoke.stats[0].base_stat > activePokeFoe.stats[0].base_stat) {
      showWin();
      getPokemonFoe(random);
      setFoeKey(prevKey => prevKey + 1);
    } else if (activePoke.stats[0].base_stat === activePokeFoe.stats[0].base_stat) {
      Alert.alert("Empate", "Selecciona otro pokemon");
    } else {
      showLoose();
    }
  }
 
  const nav = useNavigation();

  const [winVisible, setWin] = useState(false);
  const [looseVisible, setLoose] = useState(false);
  const [teamVisible, setTeamVisible] = useState(false);

  const showWin = () => setWin(true);
  const hideWin = () => setWin(false);
  const showLoose = () => setLoose(true);
  const hideLoose = () => setLoose(false);
  const showTeam = () => setTeamVisible(true);
  const hideTeam = () => setTeamVisible(false);

  const getPokemonFoe = (random) => {
    const requestOptions = { method: "GET", redirect: "follow" };
    fetch(`https://pokeapi.co/api/v2/pokemon/${random}`, requestOptions)
      .then((response) => response.json())
      .then((result) => setPokemonFoe([result]))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (pokemonFoe && pokemonFoe.length > 0) {
      setActivePokeFoe(pokemonFoe[0]);
    }
  }, [pokemonFoe]);

  useEffect(() => {
    const delayTime = setTimeout(() => {
      getPokemonFoe(random);
    }, 500);
    return () => clearTimeout(delayTime);
  }, [randomPoke]);

  return (
    <View style={styles.screen}>
     <Image
        source={require("../../assets/pokebola.png")}
         style={styles.pokeballBg}
        resizeMode="contain"
              />

      {/* ── TYPES button lateral ── */}
      <TouchableOpacity onPress={() => nav.navigate('typesearch')} style={styles.typesBtn}>
        {['T','Y','P','E','S'].map((l, i) => (
          <Text key={i} style={styles.typesLetter}>{l}</Text>
        ))}
      </TouchableOpacity>

      {/* ── Arena ── */}
      <View style={styles.arena}>

        {/* Enemigo (arriba derecha) */}
        <View style={styles.foeSlot} key={foeKey}>
          {pokemonFoe.map((Pokemon, index) => (
            <Card
              key={index}
              style={styles.pokeCard}
              onPress={() => { getPokemonFoe(random); setFoeKey(prevKey => prevKey + 1); }}
            >
              <Image source={{ uri: Pokemon.sprites.front_default }} style={styles.pokeImage} />
            </Card>
          ))}
        </View>

        {/* VS */}
        <Text style={styles.vs}>VS</Text>

        {/* Jugador (abajo izquierda) */}
        <View style={styles.playerSlot} key={key}>
          {hasTeam === false ? (
            <Card style={[styles.pokeCard, styles.emptyCard]}>
              <Button
                onPress={() => showTeam()}
                labelStyle={styles.chooseLabel}
              >
                Elige un Pokémon
              </Button>
            </Card>
          ) : (
            <Card style={styles.pokeCard} onPress={() => showTeam()}>
              <Image source={{ uri: activePoke.sprites.back_default }} style={styles.pokeImage} />
            </Card>
          )}
        </View>
      </View>

      {/* ── Botón Fight ── */}
      <View style={styles.fightWrap}>
        <TouchableOpacity style={styles.fightBtn} onPress={() => battle()}>
          <Text style={styles.fightText}>Batallar</Text>
        </TouchableOpacity>
      </View>

      {/* ── Modales ── */}
      <Portal>
        <Modal visible={winVisible} onDismiss={hideWin} contentContainerStyle={styles.modal}>
          <Text style={styles.modalTitle}>¡Ganaste! 🎉</Text>
        </Modal>

        <Modal visible={looseVisible} onDismiss={hideLoose} contentContainerStyle={styles.modal}>
          <Text style={styles.modalTitle}>¡Perdiste! 😢</Text>
        </Modal>

        <Modal visible={teamVisible} onDismiss={hideTeam} contentContainerStyle={styles.modal}>
          <Text style={styles.modalSubtitle}>Selecciona un Pokémon</Text>
          <View style={styles.grid}>
            {team.map((slot, index) =>
              slot.length !== 0 && (
                <Card
                  key={index}
                  style={styles.gridCard}
                  onPress={() => {
                    setKey(prevKey => prevKey + 1);
                    setHasTeam(true);
                    setActivePoke(slot);
                    hideTeam();
                  }}
                >
                  <Image source={{ uri: slot.sprites.front_default }} style={styles.gridImage} />
                  <Text style={styles.gridName}>{slot.name}</Text>
                </Card>
              )
            )}
          </View>
        </Modal>
      </Portal>
    </View>
  );
}

const C = {
  bg:     '#F0F0F0',
  red:    '#CD2B2B',
  card:   '#FFFFFF',
  border: '#E0E0E0',
  dark:   '#1A1A1A',
  text:   '#FFFFFF',
  yellow: '#F8D000',
  navy:   '#1A3A5C',
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: C.bg,
    overflow: 'hidden',
  },

  // Pokeball fondo
  pokeballBg: {
    position: 'absolute',
    width: 340,
    height: 340,
    top: '30%',
    left: '15%',
    opacity: 0.12,
  },

  // Header rojo
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

  // Botón TYPES lateral izquierdo
  typesBtn: {
    position: 'absolute',
    top: 70,
    left: 0,
    backgroundColor: C.red,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'center',
    gap: 10,
    elevation: 4,
    zIndex: 10,
  },
  typesLetter: {
    color: C.text,
    fontSize: 13,
    fontWeight: '900',
    lineHeight: 18,
  },

  // Arena de batalla
  arena: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  // Enemigo — arriba a la derecha
  foeSlot: {
    alignItems: 'flex-end',
    marginBottom: 10,
  },

  // VS centrado
  vs: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '900',
    color: C.dark,
    marginVertical: 8,
  },

  // Jugador — abajo a la izquierda
  playerSlot: {
    alignItems: 'flex-start',
    marginTop: 10,
  },

  // Card pokémon
  pokeCard: {
    backgroundColor: C.card,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: C.border,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    overflow: 'hidden',
    padding: 4,
  },
  emptyCard: {
    width: 160,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pokeImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  chooseLabel: {
    color: C.navy,
    fontWeight: '800',
    fontSize: 13,
  },

  // Botón Batallar amarillo
  fightWrap: {
    alignItems: 'center',
    paddingBottom: 30,
    paddingTop: 10,
  },
  fightBtn: {
    backgroundColor: C.yellow,
    paddingHorizontal: 60,
    paddingVertical: 14,
    borderRadius: 30,
    elevation: 4,
    shadowColor: C.yellow,
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  fightText: {
    color: C.navy,
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 0.5,
  },

  // Modales
  modal: {
    backgroundColor: C.card,
    marginHorizontal: 30,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: C.dark,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 18,
    fontWeight: '800',
    color: C.dark,
    marginBottom: 16,
    textAlign: 'center',
  },

  // Grid de equipo en modal
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
  },
  gridCard: {
    backgroundColor: C.navy,
    borderRadius: 12,
    padding: 8,
    alignItems: 'center',
    width: 100,
  },
  gridImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  gridName: {
    color: C.text,
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'capitalize',
    textAlign: 'center',
    marginTop: 4,
  },
});