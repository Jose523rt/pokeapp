import { ScrollView, StyleSheet, View, Image } from 'react-native'
import { Card, Text, Button } from "react-native-paper"
import React, {useContext, useState} from 'react'
import{ TeamContext } from "../../context/Team";

export default function TeamScreen() {

  const { slot1, slot2, slot3, slot4, slot5, slot6 } = useContext(TeamContext);
  const team = [slot1, slot2, slot3, slot4, slot5, slot6];
  const [index, setIndex] = useState(1);

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
                    <View style={{flex: 1, flexDirection: 'column'}}>
                      <Text style={styles.text}>{slot.name}</Text>
                      <Button onPress={()=> {slot = 0, index = index + 1}}>Eliminar del equipo</Button>
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
    justifyContent: 'center',
    padding: 25,
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
  },
  card: {
    margin:10,
    justifyContent:"center", 
    height:180,
    width: 340,
  },
  text: {
    justifyContent:"center",
    textAlign:"center"
  },
  image: {
    width: 150,
    height: 150,

  },
  cardGrid:{
    margin: 10,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  grid: {
    flexDirection: 'column',
    gap: 12,
  },
})