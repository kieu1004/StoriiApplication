import React from 'react'

import {View, Text, StyleSheet, StatusBar} from 'react-native'
import {colors} from './src/global/styles'
import RootNavigator from './src/navigation/RootNavigator'
import HomeHeader from './src/components/HomeHeader'

export default function App(){
  return (
    <View style = {styles.container}>

      {/* Status Bar */}
      <StatusBar
       barStyle = "light-content"
       backgroundColor = {colors.statusbar}
      />

      {/* <RootNavigator/> */}

      <HomeHeader/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {flex:1}
})