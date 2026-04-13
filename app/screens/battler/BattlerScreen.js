import { StyleSheet, View, Image } from 'react-native'
import { Button, Card, Surface, Text, Portal, Modal } from "react-native-paper"
import React, { useState, useEffect } from 'react'

export default function BattlerScreen() {
  const ImgPlaceholder = require("../../assets/lucario.png");

  const [pokemonFoe, setPokemonFoe] = useState([]);
  const [pokemonMate, setPokemonMate] = useState([]);
  const [search, setSearch] = useState(4);
  const random = Math.floor(Math.random() * (151 - 1 + 1) + 1);

  function hasWon(){
    
  }

  const [visible, setVisible] = React.useState(false);
  const [visible1, setVisible1] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const showModal1 = () => setVisible1(true);
  const hideModal1 = () => setVisible1(false);

  const getPokemonFoe = (random)=> {
      const requestOptions = {
          method: "GET",
          redirect: "follow"
      }

      fetch(`https://pokeapi.co/api/v2/pokemon/${random}`, requestOptions)
      .then((response) => response.json())
      .then((result) => setPokemonFoe([result]))
      .catch((error) => console.error(error));
  }

  const getPokemonMate = (search)=> {
      const requestOptions = {
          method: "GET",
          redirect: "follow"
      }

      fetch(`https://pokeapi.co/api/v2/pokemon/${search}`, requestOptions)
      .then((response) => response.json())
      .then((result) => setPokemonMate([result]))
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    
    const delayTime = setTimeout(()=>{
      getPokemonFoe(random)
      getPokemonMate(search)
    }, 500) // Tiempo de delay
    return () => clearTimeout(delayTime)
  }, [search])

  //console.log(search)

  return (
    <View>
      <Surface style={styles.surface} mode='flat' elevation={4}>
        <View style={styles.containerS}>
          <View style={styles.typeItem}>
            <Text style={styles.value}>T</Text>
            <Text style={styles.value}>Y</Text>
            <Text style={styles.value}>P</Text>
            <Text style={styles.value}>E</Text>
            <Text style={styles.value}>S</Text>
          </View>
        </View>
      </Surface>
      <View style={[styles.containerD, {bottom:140}]}>
        {pokemonFoe.map((Pokemon, index)=>(
        <Card style={styles.card} key={index}>
          <View>
            <Image source={{uri: Pokemon.sprites.front_default}} style={styles.image}/>
          </View>
        </Card>
        ))}
      </View>

      <View style={{bottom: 130, left:170, margin: 0, padding:0}}><Text variant='displayMedium'>VS</Text></View>

      <View style={[styles.containerI, {bottom:120}]}>
        {pokemonMate.map((Pokemon,index)=>(
        <Card style={styles.card} key={index}>
          <View>
            <Image source={{uri: Pokemon.sprites.back_default}} style={styles.image}/>
          </View>
        </Card>
        ))}
      </View>

      <View style={{justifyContent:"center", alignContent:"center", alignItems:"center"}}>
        <Button mode='contained' style={[styles.button, {justifyContent:"center"}]}
        onPress={showModal}> 
          Fight!
        </Button>
      </View>

      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
          <Text variant='displayLarge' style={styles.text}>You Won</Text>
        </Modal>
        <Modal visible={visible1} onDismiss={hideModal1} contentContainerStyle={styles.modal}>
          <Text variant='displayLarge' style={styles.text}>You Loose</Text>
        </Modal>
      </Portal>
    </View>
  )
}

const styles = StyleSheet.create({
  surface: {
    marginTop: 10,
    padding: 16,
    width: 45
  },
  containerS: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: "flex-start",
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  image: {
    width: 230,
    height: 230,
    resizeMode: 'cover',
    marginTop: 0
  },
  card: {
    margin: 10,
    width: 230,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d9d9d9',
    elevation: 0,
    shadowColor: 'transparent',
  },
  containerD: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: "flex-end",
  },
  containerI: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: "flex-start",
  },
  button: {
    bottom:100,
    height:45,
    width:130
  },
  modal: {
    backgroundColor: 'white', 
    padding: 20,
    height:600
  },
  text: {
    justifyContent:"center",
    textAlign: "center"
  }
})