import React from 'react'
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native'
import { colors } from '../global/styles'






const PrimaryButton = ({title, onPress = () => {}}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={styles.btnContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}


const SecondaryButton = ({title, onPress = () => {}}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={{...styles.btnContainer, backgroundColor: colors.primary_normal}}>
        <Text style={{...styles.title, color: colors.text_white}}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

export {PrimaryButton, SecondaryButton}

const styles = StyleSheet.create({
  title: {color: colors.text_white, fontWeight: 'bold', fontSize: 18},
  btnContainer: {
    backgroundColor: colors.primary_bold,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
})