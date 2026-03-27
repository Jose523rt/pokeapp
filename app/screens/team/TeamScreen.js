import { ScrollView, StyleSheet, View } from 'react-native'
import { Card, Text } from "react-native-paper"
import React from 'react'

export default function TeamScreen() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text variant='headlineLarge' style={styles.title}>Mi Equipo</Text>
        <Card style={styles.card}>
          <Text style={styles.text}>Placeholder</Text>
        </Card>
        <Card style={styles.card}>
          <Text style={styles.text}>Placeholder</Text>
        </Card>
        <Card style={styles.card}>
          <Text style={styles.text}>Placeholder</Text>
        </Card>
        <Card style={styles.card}>
          <Text style={styles.text}>Placeholder</Text>
        </Card>
        <Card style={styles.card}>
          <Text style={styles.text}>Placeholder</Text>
        </Card>
        <Card style={styles.card}>
          <Text style={styles.text}>Placeholder</Text>
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
  }
})