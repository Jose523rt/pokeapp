import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { MyNavigations} from "./app/screens/MyNavigations";
import { PaperProvider } from 'react-native-paper';

export default function App() {
  
  return (
    <PaperProvider>
      <NavigationContainer>
        <MyNavigations/>
      </NavigationContainer>
    </PaperProvider>
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
