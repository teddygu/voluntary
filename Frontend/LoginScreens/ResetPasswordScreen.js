import React, { useState } from 'react'
import { View} from 'react-native'
import {Button, Avatar, Text} from 'react-native-paper'

export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })

  const sendResetPasswordEmail = () => {
    navigation.navigate('LoginScreen')
  }

  return (
    <View>
      <BackButton goBack={navigation.goBack} />
      <Avatar.Image size={400} source={require('../LoginAssets/logo.png')}/>
      <Text>Restore Password</Text>
      <TextInput
        label="E-mail address"
        returnKeyType="done"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        description="You will receive email with password reset link."
      />
      <Button
        mode="contained"
        onPress={sendResetPasswordEmail}
        style={{ marginTop: 16 }}
      >
        Send Instructions
      </Button>
    </View>
  )
}