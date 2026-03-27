import { View, Text } from 'react-native'
import React from 'react'
import { Searchbar } from 'react-native-paper'

export default function BuscadorPoke({search, setSearch}) {
  return (
    <View>
      <Searchbar
        placeholder='Buscar'
        onChangeText={setSearch}
        value={search}
        />
    </View>
  )
}