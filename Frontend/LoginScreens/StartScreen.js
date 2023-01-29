import React from 'react'
import {Text, Button, Avatar} from 'react-native-paper'
import {StyleSheet, View} from 'react-native'

export default function StartScreen({ navigation }) {
  return (
        <View style={styles.container}>
            <View>
            <Avatar.Image size={300} source={require('../LoginAssets/logo.png')}/>
            </View>
      
      <View style={styles.text}>
        <Text style={styles.title}>Project Title</Text>
      </View>
      <View style={styles.view}>
              <Text style = {styles.description}>
        Short project description or catch phrase
      </Text>
      </View>
      <View style={styles.view}>
        <Button style={styles.button}
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}>
        Login
      </Button>
      </View>
      <View>
        <Button style={styles.button}
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        Sign Up
      </Button>
      </View>
      
        </View>
  )

}

const styles = StyleSheet.create({
    container: {
        color: 'white',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:"center",
        backgroundColor:'black'
    },
    view: {
        height:'7%'
    },
     title: {
        fontWeight: 'bold',
        display: 'flex',
        fontSize: '45',
        color: 'white'
    },
    description: {
        color: 'white',
        fontSize: '15'
    },
    button: {
        borderWidth:'1'
    }
    
    });