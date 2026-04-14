import { StyleSheet, View, Image, TouchableOpacity, Alert } from 'react-native'
import { Button, Card, Surface, Text, Portal, Modal } from "react-native-paper"
import React, { useState, useEffect, useContext } from 'react'
import{ TeamContext } from "../../context/Team";
import { useNavigation } from "@react-navigation/native";

export default function BattlerScreen() {

  const { slot1, slot2, slot3, slot4, slot5, slot6 } = useContext(TeamContext);
  const team = [slot1, slot2, slot3, slot4, slot5, slot6];
  const [hasTeam, setHasTeam] = useState(false);
  const [key, setKey] = useState(50);
  const [foeKey, setFoeKey] = useState(1);
  const [ activePoke, setActivePoke ] = useState();
  const [activePokeFoe, setActivePokeFoe] = useState([])
  

  const [pokemonFoe, setPokemonFoe] = useState([]);
  const [pokemonMate, setPokemonMate] = useState([]);
  const [randomPoke, setRandomPoke] = useState();
  const random = Math.floor(Math.random() * (151 - 1 + 1) + 1);

  function battle() {
    if (activePoke.stats[0].base_stat > activePokeFoe.stats[0].base_stat) {
      showWin()
      getPokemonFoe(random)
      setFoeKey(prevKey => prevKey + 1)
      //console.log(`La vida de tu pokemon es de: ${activePoke.stats[0].base_stat}`)
      //console.log(`La vida de tu enemigo es de: ${activePokeFoe.stats[0].base_stat}`)
    } else if(activePoke.stats[0].base_stat === activePokeFoe.stats[0].base_stat){
      Alert.alert("Empate", "Selecciona otro pokemon")
      //console.log(`La vida de tu pokemon es de: ${activePoke.stats[0].base_stat}`)
      //console.log(`La vida de tu enemigo es de: ${activePokeFoe.stats[0].base_stat}`)
    } else {
      showLoose()
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

  useEffect(() => {
    if (pokemonFoe && pokemonFoe.length > 0) {
      setActivePokeFoe(pokemonFoe[0]);
    }
  }, [pokemonFoe]);

  useEffect(() => {
    
    const delayTime = setTimeout(()=>{
      getPokemonFoe(random)
    }, 500) // Tiempo de delay
    return () => clearTimeout(delayTime)
  }, [randomPoke])

  //console.log(search)
  // {setKey(prevKey => prevKey + 1), setHasTeam(true)}

  return (
    <View>
      <TouchableOpacity onPress={() => nav.navigate('typesearch')}>
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
      </TouchableOpacity>
      <View key={foeKey} style={[styles.containerD, {bottom:140}]}>
        {pokemonFoe.map((Pokemon, index)=>(
        <Card style={styles.card} onPress={()=> {getPokemonFoe(random), setFoeKey(prevKey => prevKey + 1) }} key={index}>
          <View>
            <Image source={{uri: Pokemon.sprites.front_default}} style={styles.image}/>
          </View>
        </Card>
        ))}
      </View>

      <View style={{bottom: 130, left:170, margin: 0, padding:0}}><Text variant='displayMedium'>VS</Text></View>
      <View key={key}>
        { 
          hasTeam === false ? 
          <View style={[styles.containerI, {bottom:120}]}>
            <Card style={[styles.card, {height:230, width:230}]}>
              <View>
                <Button style={{justifyContent:"center", alignItems:"center", alignSelf:"center"}}
                  onPress={() => showTeam()}>Elije un Pokemon</Button>
              </View>
            </Card>
          </View>:
          
          <View style={[styles.containerI, {bottom:120}]}>
            <Card style={styles.card} onPress={()=> showTeam()}>
              <View>
                <Image source={{uri: activePoke.sprites.back_default}} style={styles.image}/>
              </View>
            </Card>
          </View>
        }
      </View>

      <View style={{justifyContent:"center", alignContent:"center", alignItems:"center"}}>
        <Button mode='contained' style={[styles.button, {justifyContent:"center"}]}
        onPress={()=> battle()}> 
          Fight!
        </Button>
      </View>

      <Portal>
        <Modal visible={winVisible} onDismiss={hideWin} contentContainerStyle={styles.modal}>
          <Text variant='displayLarge' style={styles.text}>You Won</Text>
        </Modal>
        <Modal visible={looseVisible} onDismiss={hideLoose} contentContainerStyle={styles.modal}>
          <Text variant='displayLarge' style={styles.text}>You Loose</Text>
        </Modal>
        <Modal visible={teamVisible} onDismiss={hideTeam} contentContainerStyle={styles.modal}>
          <Text variant='displaySmall' style={styles.text}>Selecciona al equipo</Text>
          <View style={styles.grid}>
            {team.map((slot, index) => (
              slot.length !== 0 && (
                <Card key={index} style={styles.cardGrid} 
                  onPress={()=> {setKey(prevKey => prevKey + 1), setHasTeam(true), setActivePoke(slot), hideTeam()}}>
                  <View>
                    <Image source={{uri: slot.sprites.front_default}} style={styles.team}/>
                    <Text style={styles.text}>{slot.name}</Text>
                  </View>
                </Card>
                )))}
          </View>
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
  },
  grid: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  cardGrid:{
    margin: 10,
    width: 150,
  },
  team: {
    width:80,
    height:80,
  },
})