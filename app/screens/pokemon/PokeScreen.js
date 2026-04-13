import { ScrollView, StyleSheet, View, Image, Text, Button } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { TeamContext } from "../../context/Team";

export default function PokeScreen() {
 
  const { slot1, slot2, slot3, slot4, slot5, slot6, isTeam } = useContext(TeamContext);
  const team = [slot1, slot2, slot3, slot4, slot5, slot6];

  return (
    <ScrollView>
      <View style={styles.view}>
        {team.map((slot, index) => (
          <View key={index} style={styles.card}>
            {slot.length === 0 ? null : (
              <>
                <Image
                  source={{ uri: slot.sprites.front_default }}
                  style={styles.image}
                />
                <Text style={styles.name}>{slot.name}</Text>
              </>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 10,
  },
  card: {
    alignItems: 'center',
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});