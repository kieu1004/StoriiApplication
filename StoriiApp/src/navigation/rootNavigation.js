import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { AuthStack } from './authStack'
import { AppStack } from './appStack'
import { AdminStack } from './adminStack'
import { SignInContext } from '../contexts/authContext'



export default function RootNavigator() {

  const { signedIn } = useContext(SignInContext)

  return (
    <NavigationContainer>
      {signedIn.userToken === null ? (
        <AuthStack />
      ) : signedIn.role === 'admin' ? (
        <AdminStack />
      ) : (
        <AppStack />
      )}
    </NavigationContainer>
  )
}