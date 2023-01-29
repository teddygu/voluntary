import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text, TextInput, Button, Avatar, Appbar } from 'react-native-paper'


export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const onSignUpPressed = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    })
  }

  return (
    <View style={styles.container}>
        <View>
        <Appbar.Header style={styles.header}>
            <Appbar.BackAction onPress={() => {navigation.goBack()}} />
        </Appbar.Header>
        </View>
     
        <View style={styles.avatar}>
            <Avatar.Image size={250} source={require('../LoginAssets/logo.png')}/>
        </View>
      
      <View>
            <Text style={styles.welcomeBack}>Create Account</Text>
        </View>
      
      <View>
            <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />
        </View>
      
      <View>
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
        </View>
     
      <View style={styles.view}>
            <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
        </View>
      
      <View>
             <Button
        mode="contained"
        onPress={onSignUpPressed}>
        Sign Up
      </Button>
        </View>
     
      <View >
        <Text style={styles.description}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.title}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor:'black'
    },
    header:{
        color:'white',
        fontColor:'white',
        backgroundColor:'black'
    },
    view: {
        height:'9%'
    },
    welcomeBack:{
        fontWeight: 'bold',
        display: 'flex',
        fontSize: '25',
        color: 'white'
    },
    avatar:{
        alignItems:"center",
    },
    backButton: {
        fontSize:"5"
    },
     title: {
        fontWeight: 'bold',
        display: 'flex',
        fontSize: '16',
        color: 'white'
    },
    description: {
        fontSize:'14',
        color: 'white'
    },
    button: {
        borderWidth:'1',
        fontSize:'30'
    }
    
    });

