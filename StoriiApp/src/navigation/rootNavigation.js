import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { AuthStack } from './authStack'
import { SignInContext } from '../contexts/authContext'
import { AppStack } from './appStack';

export default function RootNavigator() {
  const { signedIn } = useContext(SignInContext)

  return (
    <NavigationContainer>
      {signedIn.userToken === null ? <AuthStack /> : <AppStack />}
    </NavigationContainer>
  )
}