import React from 'react'

import {View, Text, StyleSheet, StatusBar} from 'react-native'
import {colors} from './src/global/styles'
import HomeScreen from './src/screens/HomeScreen'

export default function App(){
  return (
    <View style = {styles.container}>
      <HomeScreen/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {flex:1}
})