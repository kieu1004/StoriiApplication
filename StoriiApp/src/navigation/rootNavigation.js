import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'

import { AuthStack } from './authStack'
import { SignInContext } from '../contexts/authContext'
import AppStackNavigator from './appStack'






export default function RootNavigator() {
  const { signedIn } = useContext(SignInContext);

  return (
    <NavigationContainer>
      {signedIn.userToken === null ? <AuthStack /> : <AppStackNavigator />}
    </NavigationContainer>
  )
}
