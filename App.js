import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { MyNavigations} from "./app/screens/MyNavigations";
import { PaperProvider } from 'react-native-paper';
import { Team } from "../pokeapp/app/context/Team"

export default function App() {
  
  return (
    <Team>
      <PaperProvider>
        <NavigationContainer>
          <MyNavigations/>
        </NavigationContainer>
      </PaperProvider>
    </Team>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
