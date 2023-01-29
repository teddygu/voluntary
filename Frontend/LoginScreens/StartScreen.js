import React from 'react'
import {Text, Button, Avatar} from 'react-native-paper'
import {View} from 'react-native'

export default function StartScreen({ navigation }) {
  return (
    <View>
      <Avatar.Image size={350} source={require('../LoginAssets/logo.png')}/>
      <Text>Login Template</Text>
      <Text>
        The easiest way to start with your amazing application.
      </Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        Sign Up
      </Button>
    </View>
  )
}