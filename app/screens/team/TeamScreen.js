import { ScrollView, StyleSheet, View, Image } from 'react-native'
import { Card, Text, Button } from "react-native-paper"
import React, {useContext, useState} from 'react'
import { TeamContext } from "../../context/Team";

export default function TeamScreen() {
  const { slot1, slot2, slot3, slot4, slot5, slot6 } = useContext(TeamContext);
  const team = [slot1, slot2, slot3, slot4, slot5, slot6];
  const [index, setIndex] = useState(1);
  const [boton, setboton] = useState(true);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text variant='headlineLarge' style={styles.title}>Mi Equipo</Text>
        <View style={styles.grid}>
          {team.map((slot, index) => (
            slot.length !== 0 && (
              <Card key={index} style={styles.cardGrid}>
                <View style={styles.cardContent}>
                  <Image source={{uri: slot.sprites.front_default}} style={styles.image}/>
                  <View style={styles.infoBox}>
                    <Text style={styles.text}>{slot.name}</Text>
                    {!boton && <Button 
                      mode="contained-tonal" 
                      style={styles.button} 
                      onPress={()=> {slot = 0, index = index + 1}}
                    >
                      Eliminar del equipo
                    </Button>}
                  </View>
                </View>  
              </Card>
            )))}
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: "#F5F5F5",
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: "bold",
    color: "#333",
  },
  grid: {
    flexDirection: 'column',
    gap: 16,
  },
  cardGrid:{
    marginVertical: 8,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: "#1A3A5C",
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 16,
  },
  infoBox: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "700",
    textTransform: "capitalize",
    marginBottom: 8,
    color: "#ffffff",
  },
  button: {
    borderRadius: 8,
    alignSelf: "flex-start",
    color: "#0073ff",
  },
})
