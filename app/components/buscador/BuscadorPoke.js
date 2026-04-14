import { View, StyleSheet } from 'react-native'
import React from 'react'
import { Searchbar } from 'react-native-paper'

export default function BuscadorPoke({ search, setSearch }) {
  return (
    <View style={styles.wrapper}>
      <Searchbar
        placeholder="Search..."
        onChangeText={setSearch}
        value={search}
        style={styles.searchbar}
        inputStyle={styles.input}
        iconColor="#f5f5f5"
        placeholderTextColor="#f5f5f5"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 16,
    marginTop: 14,
    marginBottom: 10,
  },

  searchbar: {
    backgroundColor: '#1A3A5C',
    borderRadius: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    height: 48,
  },

  input: {
    color: '#f5f5f5',
    fontWeight: '700',
    fontSize: 15,
    alignSelf: 'center',
  },
})