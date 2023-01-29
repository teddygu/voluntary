import React from 'react'
import { Button, Avatar} from 'react-native-paper'
import {StyleSheet, View, Text} from 'react-native'
import { useFonts, Prompt_500Medium, Prompt_700Bold} from '@expo-google-fonts/prompt';

export default function StartScreen({ navigation }) {
  let [fontsLoaded] = useFonts({
    Prompt_500Medium, Prompt_700Bold
  });

  if (!fontsLoaded) {
    return null;
  }

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
        backgroundColor:'black',
        fontFamily:'Prompt_500Medium'
    },
    view: {
        height:'7%'
    },
     title: {
        fontFamily:'Prompt_700Bold',
        fontWeight: 'bold',
        display: 'flex',
        fontSize: '45',
        color: 'white'
    },
    description: {
        fontFamily:'Prompt_500Medium',
        color: 'white',
        fontSize: '15'
    },
    button: {
      borderWidth:'1'
    }
    
    });