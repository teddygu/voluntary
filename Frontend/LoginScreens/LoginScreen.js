import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text, TextInput, Avatar, Appbar, Button } from 'react-native-paper'
import BottomNav from '../BottomNav';

export default function LoginScreen({ navigation }, isLoggedIn) {
     
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const Stack = createNativeStackNavigator();
  const HomeScreen = () => (
    <Stack.Navigator>
        <Stack.Screen name='bottomNav' component={BottomNav} />
      </Stack.Navigator>
  )
  console.log(HomeScreen)

  return (
    <View>
        <Appbar.Header>
            <Appbar.BackAction onPress={() => {navigation.goBack()}} />
        </Appbar.Header>
      <Avatar.Image size={400} source={require('../LoginAssets/logo.png')}/>
      <Text>Welcome back.</Text>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text >Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={()=> navigation.navigate('bottomNav')}>
        Login
      </Button>
      <View >
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text >Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
