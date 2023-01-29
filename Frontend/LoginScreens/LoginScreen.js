import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text, TextInput, Avatar, Appbar, Button } from 'react-native-paper'

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  return (
    <View style={styles.container}>
        <View>
            <Appbar.Header style={styles.header}>
                <Appbar.BackAction style={styles.header} onPress={() => {navigation.goBack()}} />
            </Appbar.Header>
        </View>
        
        <View style={styles.avatar}>
            <Avatar.Image size={250} source={require('../LoginAssets/logo.png')}/>
        </View>
      
      <View>
            <Text style={styles.welcomeBack}>Welcome Back</Text>
        </View>
      
      <View >
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
      
      <View style={styles.view}>
        <TouchableOpacity 
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.title}>forgot your password?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.button}>
           <Button mode="contained" onPress={()=>navigation.replace('NavBar')}>
        Login
      </Button> 
        </View>
      
      <View style={styles.view}>
        <Text style={styles.description}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.signUp}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    header:{
        color:'white',
        fontColor:'white',
        backgroundColor:'black'
    },
    container: {
        height: '100%',
        width: '100%',
        backgroundColor:'black'
    },
    view: {
        height:'7%'
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
     title: {
        fontWeight: 'bold',
        display: 'flex',
        fontSize: '20',
        color: 'white'
    },
    signUp:{
        fontSize:'16',
        color: 'white',
        fontWeight:'bold'
    },
    description: {
        fontSize:'13',
        color: 'white'
    },
    button: {
        borderWidth:'1',
        fontSize:'30'
    }
    
    });
