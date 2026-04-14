import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function AboutScreen() {
  return (
    <View style={styles.container}>


      <View style={styles.body}>
  
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarEmoji}>🧢</Text>
        </View>

        <Text style={styles.name}>Ash Ketchum</Text>
        <Text style={styles.region}>Pueblo Paleta · Kanto</Text>

        <View style={styles.divider} />

        <View style={styles.infoBlock}>
          <Row label="Correo"   value="ash@pokemon.com" />
          <Row label="Equipo"   value="Pikachu, Charizard..." />
          <Row label="Medallas" value="8" />
          <Row label="Pokédex"  value="142 capturados" />
        </View>
      </View>

    </View>
  )
}

function Row({ label, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  header: {
    backgroundColor: '#CC2222',
    paddingTop: 54,
    paddingBottom: 14,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: '#111',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  body: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 36,
    paddingHorizontal: 24,
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEmoji: {
    fontSize: 48,
  },
  name: {
    marginTop: 14,
    fontSize: 22,
    fontWeight: '700',
    color: '#111',
  },
  region: {
    marginTop: 4,
    fontSize: 13,
    color: '#888',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 24,
  },
  infoBlock: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 0.5,
    borderColor: '#dce1e8',
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  rowLabel: {
    fontSize: 14,
    color: '#888',
  },
  rowValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111',
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
})