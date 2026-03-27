import { ScrollView, StyleSheet, View, Image } from 'react-native'
import React, { useState } from 'react'
import BuscadorPoke from "../../components/buscador/BuscadorPoke";
import { Card, Text } from 'react-native-paper';

export default function SearchScreens() {
  const ImgPlaceholder = require("../../assets/ditto.png");
  const [search, setSearch] = useState("");

  return (
    <View style={{padding:15}}><BuscadorPoke search={search} setSearch={setSearch}/>
      <ScrollView>
        <View style={styles.main}>
          <View style={styles.grid}>

            <Card style={styles.card}>
              <View>
                <Card.Title title="Ditto" style={[{left:37, position:"absolute" }, styles.text]}/>
                <Image
                  source={ImgPlaceholder}
                  style={styles.image}
                />
              </View>
            </Card>

            <Card style={styles.card}>
              <View>
                <Card.Title title="Ditto" style={[{left:37, position:"absolute" }, styles.text]}/>
                <Image
                  source={ImgPlaceholder}
                  style={styles.image}
                />
              </View>
            </Card>

            <Card style={styles.card}>
              <View>
                <Card.Title title="Ditto" style={[{left:37, position:"absolute" }, styles.text]}/>
                <Image
                  source={ImgPlaceholder}
                  style={styles.image}
                />
              </View>
            </Card>

            <Card style={styles.card}>
              <View>
                <Card.Title title="Ditto" style={[{left:37, position:"absolute" }, styles.text]}/>
                <Image
                  source={ImgPlaceholder}
                  style={styles.image}
                />
              </View>
            </Card>

          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  main:{
    justifyContent:"center",
    fontFamily: "Arial",
    padding:20,
    flex:1,
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
  },
  card:{
    margin: 10,
    width: 150,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d9d9d9',
    elevation: 0,
    shadowColor: 'transparent',
  },
  text: {
    justifyContent:"center",
    textAlign:"center",
  },
  grid: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    marginTop: 0
  },
})