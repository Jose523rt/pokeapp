import {
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { Portal, Modal } from "react-native-paper";
import { TeamContext } from "../../context/Team";

const typeColors = {
  normal: "#A8A878", fire: "#F08030", water: "#6890F0",
  grass: "#78C850", electric: "#F8D030", ice: "#98D8D8",
  fighting: "#C03028", poison: "#A040A0", ground: "#E0C068",
  flying: "#A890F0", psychic: "#F85888", bug: "#A8B820",
  rock: "#B8A038", ghost: "#705898", dragon: "#7038F8",
  dark: "#705848", steel: "#B8B8D0", fairy: "#EE99AC",
};

export default function PokeScreen({ route }) {
  const id = route?.params?.id;
  const [pokemon, setPokemon] = useState([]);
  const { AddToTeam, visible, hideModal } = useContext(TeamContext);

  useEffect(() => {
    if (!id) return;
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, { method: "GET", redirect: "follow" })
      .then((r) => r.json())
      .then((result) => setPokemon([result]))
      .catch(console.error);
  }, [id]);

  return (
    <ScrollView style={styles.scroll}>
      {pokemon.map((pkmn, index) => {
        const t1Name = pkmn.types[0]?.type.name ?? "";
        const t2Name = pkmn.types[1]?.type.name;
        const stats = pkmn.stats;

        return (
          <View key={index}>

            <View style={styles.header}>
              <Text style={styles.headerName}>{pkmn.name}</Text>
            </View>
            <Image
              source={require("../../assets/pokebola.png")}
              style={styles.pokeballBg}
              resizeMode="contain"
             />

            {/* ── Imagen ── */}
            <View style={styles.imageWrap}>
              <Image
                source={{ uri: pkmn.sprites.front_default }}
                style={styles.image}
                resizeMode="contain"
              />
            </View>

            {/* ── Badges de tipo ── */}
            <View style={styles.typesRow}>
              <View style={[styles.badge, { backgroundColor: typeColors[t1Name] ?? "#2A2A2A" }]}>
                <Text style={styles.badgeText}>{t1Name}</Text>
              </View>
              {t2Name && (
                <View style={[styles.badge, { backgroundColor: typeColors[t2Name] ?? "#2A2A2A" }]}>
                  <Text style={styles.badgeText}>{t2Name}</Text>
                </View>
              )}
            </View>

            {/* ── Info ── */}
            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>{pkmn.name}</Text>
              <Text style={styles.infoLine}>{`Número: #${String(pkmn.id).padStart(4, "0")}`}</Text>
              <Text style={styles.infoLine}>{`Tipo: ${pkmn.types.map((t) => t.type.name).join(" / ")}`}</Text>
              <Text style={styles.infoLine}>{`Altura: ${pkmn.height / 10} m`}</Text>
              <Text style={styles.infoLine}>{`Peso: ${pkmn.weight / 10} kg`}</Text>
              {pkmn.abilities[0] && (
                <Text style={styles.infoLine}>{`Habilidad: ${pkmn.abilities[0].ability.name}`}</Text>
              )}
              {pkmn.abilities[1] && (
                <Text style={styles.infoLine}>{`Habilidad oculta: ${pkmn.abilities[1].ability.name}`}</Text>
              )}

              {/* Stats */}
              <Text style={styles.sectionTitle}>Stats</Text>
              {stats.map((s, i) => (
                <View key={i} style={styles.statRow}>
                  <Text style={styles.statLabel}>{`${s.stat.name}:`}</Text>
                  <View style={styles.statBarBg}>
                    <View
                      style={[
                        styles.statBarFill,
                        {
                          width: `${Math.min((s.base_stat / 255) * 100, 100)}%`,
                          backgroundColor:
                            s.base_stat >= 90 ? "#78C850" :
                            s.base_stat >= 60 ? "#F8D030" : "#F08030",
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.statValue}>{s.base_stat}</Text>
                </View>
              ))}
            </View>
          </View>
        );
      })}

      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
          <Text style={styles.modalText}>¡Pokémon agregado al equipo!</Text>
        </Modal>
      </Portal>
    </ScrollView>
  );
}

const C = {
  bg:     "#F0F0F0",
  red:    "#CD2B2B",
  card:   "#1A3A5C",
  border: "#E0E0E0",
  text:   "#FFFFFF",
  dark:   "#1A1A1A",
  sub:    "#444444",
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: C.bg,
  },
  header: {
    backgroundColor: C.red,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  headerName: {
    color: C.text,
    fontSize: 26,
    fontWeight: "900",
    textTransform: "capitalize",
    letterSpacing: 0.5,
  },
  imageWrap: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: C.border,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    overflow: "hidden",
    height: 220,
  },
  image: {
    width: 200,
    height: 200,
  },
  typesRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginTop: 14,
    marginBottom: 4,
  },
  badge: {
    paddingHorizontal: 22,
    paddingVertical: 8,
    borderRadius: 30,
    elevation: 2,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
    textTransform: "capitalize",
    letterSpacing: 0.4,
  },
  infoBox: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: C.border,
    padding: 16,
    elevation: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: C.dark,
    textTransform: "capitalize",
    marginBottom: 4,
  },
  infoLine: {
    fontSize: 13,
    color: C.sub,
    textTransform: "capitalize",
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "900",
    color: C.dark,
    marginTop: 12,
    marginBottom: 6,
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    gap: 8,
  },
  statLabel: {
    fontSize: 12,
    color: C.sub,
    textTransform: "capitalize",
    width: 110,
  },
  statBarBg: {
    flex: 1,
    height: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    overflow: "hidden",
  },
  statBarFill: {
    height: "100%",
    borderRadius: 4,
  },
  statValue: {
    fontSize: 12,
    fontWeight: "700",
    color: C.dark,
    width: 28,
    textAlign: "right",
  },
  addBtn: {
    backgroundColor: C.red,
    marginHorizontal: 20,
    marginTop: 18,
    marginBottom: 30,
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: "center",
    elevation: 3,
    shadowColor: C.red,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  addText: {
    color: C.text,
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  modal: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 40,
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "800",
    color: C.dark,
    textAlign: "center",
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

});