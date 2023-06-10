import React from 'react'

import {View, Text, StyleSheet, StatusBar} from 'react-native'
import {colors} from './src/global/styles'
import SignInScreen from './src/screens/authScreens/SignInScreen'
import SplashScreen from './src/screens/authScreens/SplashScreen'

export default function App(){
  return (
    <View style = {styles.container}>

      {/* Status Bar */}
      <StatusBar
       barStyle = "light-content"
       backgroundColor = {colors.statusbar}
      />

      <SplashScreen/>
    
    </View>
  )
}

const styles = StyleSheet.create({
  container: {flex:1}
})