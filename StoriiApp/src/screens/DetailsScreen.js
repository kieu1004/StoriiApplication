import React from 'react'
import { SafeAreaView, StyleSheet, View, Text, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { colors } from '../global/styles'
import { SecondaryButton } from '../components/Button'






const DetailsScreen = ({ navigation, route }) => {
  const item = route.params

  return (
    <SafeAreaView style={{ backgroundColor: colors.text_white }}>


      <View style={style.header}>
        <Icon name="arrow-back-ios" size={28} marginTop={10}  onPress={navigation.goBack} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 280,
          }}>
          <Image source={{ uri: item.image }} style={{ height: 300, width: 300 }} />
        </View>
        <View style={style.details}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{ fontSize: 25, fontWeight: 'bold', color: colors.text_white }}>
              {item.name}
            </Text>
            <View style={style.iconContainer}>
              <Icon name="favorite-border" color={colors.primary_bold} size={25} />
            </View>
          </View>

          <Text style={style.priceText}>
            $ {item.price}
          </Text>

          <Text style={style.detailsText}>
            {item.detals}
          </Text>

          

          <View style={{ marginTop: 40, marginBottom: 40}}>
            <SecondaryButton title="Add To Cart" />
          </View>
        </View>
      </ScrollView>

    </SafeAreaView>
  )
}






const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    paddingTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },

  details: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 60,
    backgroundColor: colors.banner_sale,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    marginTop: 30
  },

  iconContainer: {
    backgroundColor: colors.text_white,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },

  detailsText: {
    marginTop: 10,
    marginBottom: 10,
    lineHeight: 22,
    fontSize: 16,
    color: colors.text_white,
  },

  priceText:{
    marginTop: 10,
    marginBottom: 10,
    fontSize: 35,
    color: colors.text_white
  }
})

export default DetailsScreen