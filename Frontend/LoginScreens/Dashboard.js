import React from 'react'
import { View } from 'react-native'
import {Text, Avatar, Button} from 'react-native-paper'

export default function Dashboard({ navigation }) {
  return (
    <View>
      <Avatar.Image size={400} source={require('../LoginAssets/logo.png')}/>
      <Text>Let’s start</Text>
      <Text>
        Your amazing app starts here. Open you favorite code editor and start
        editing this project.
      </Text>
      <Button
        mode="outlined"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'StartScreen' }],
          })
        }
      >
        Logout
      </Button>
    </View>
  )
}
