import { ScrollView, StyleSheet, View, Image } from 'react-native'
import { Card, Text, Button } from "react-native-paper"
import React, {useContext} from 'react'
import{ TeamContext } from "../../context/Team";

export default function TeamScreen() {

  const { slot1, slot2, slot3, slot4, slot5, slot6 } = useContext(TeamContext);


  return (
    <ScrollView>
      <View style={styles.container}>
        <Text variant='headlineLarge' style={styles.title}>Mi Equipo</Text>
        <View style={{flexDirection:"row", alignItems:"center"}}>
          <Card style={styles.card}>
            {
              slot1.length === 0 ? <View style={{justifyContent:"center", alignItems:"center"}}><Text>Aún no tienes amigos</Text></View>:
              <View>
              <Image source={{uri: slot1.sprites.front_default}} style={styles.image}/>
              <Text style={styles.text}>{slot1.name}</Text>
              </View>
            }
          </Card>
        </View>
        <Card style={styles.card}>
          {
            slot2.length === 0 ? <View style={{justifyContent:"center", alignItems:"center"}}><Text>Aún no tienes amigos</Text></View>:
            <View>
            <Image source={{uri: slot2.sprites.front_default}} style={styles.image}/>
            <Text style={styles.text}>{slot2.name}</Text>
            </View>
          }
        </Card>
        <Card style={styles.card}>
          {
            slot3.length === 0 ? <View style={{justifyContent:"center", alignItems:"center"}}><Text>Aún no tienes amigos</Text></View>:
            <View>
            <Image source={{uri: slot3.sprites.front_default}} style={styles.image}/>
            <Text style={styles.text}>{slot3.name}</Text>
            </View>
          }
        </Card>
        <Card style={styles.card}>
          {
            slot4.length === 0 ? <View style={{justifyContent:"center", alignItems:"center"}}><Text>Aún no tienes amigos</Text></View>:
            <View>
            <Image source={{uri: slot4.sprites.front_default}} style={styles.image}/>
            <Text style={styles.text}>{slot4.name}</Text>
            </View>
          }
        </Card>
        <Card style={styles.card}>
          {
            slot5.length === 0 ? <View style={{justifyContent:"center", alignItems:"center"}}><Text>Aún no tienes amigos</Text></View>:
            <View>
            <Image source={{uri: slot5.sprites.front_default}} style={styles.image}/>
            <Text style={styles.text}>{slot5.name}</Text>
            </View>
          }
        </Card>
        <Card style={styles.card}>
          {
            slot6.length === 0 ? <View style={{justifyContent:"center", alignItems:"center"}}><Text>Aún no tienes amigos</Text></View>:
            <View>
            <Image source={{uri: slot6.sprites.front_default}} style={styles.image}/>
            <Text style={styles.text}>{slot6.name}</Text>
            </View>
          }
        </Card>
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
})