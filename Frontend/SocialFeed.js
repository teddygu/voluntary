import * as React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { List } from 'react-native-paper';
import { useFonts, Prompt_500Medium, Prompt_700Bold} from '@expo-google-fonts/prompt';

const SocialFeed = () => {
  let [fontsLoaded] = useFonts({
    Prompt_500Medium, Prompt_700Bold
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
<ScrollView>
    <List.Item titleStyle = {{fontFamily: 'Prompt_700Bold'}} descriptionStyle = {{fontFamily: 'Prompt_500Medium'}}
    title="Bob Smith"
    description="earned 170 kudos volunteering at Minnehack 2023!"
  />
  <List.Item titleStyle = {{fontFamily: 'Prompt_700Bold'}} descriptionStyle = {{fontFamily: 'Prompt_500Medium'}}
    title="First Item"
    description="Item description"
  />
  <List.Item titleStyle = {{fontFamily: 'Prompt_700Bold'}} descriptionStyle = {{fontFamily: 'Prompt_500Medium'}}
    title="First Item"
    description="Item description"
  />
  <List.Item titleStyle = {{fontFamily: 'Prompt_700Bold'}} descriptionStyle = {{fontFamily: 'Prompt_500Medium'}}
    title="First Item"
    description="Item description"
  />
  <List.Item titleStyle = {{fontFamily: 'Prompt_700Bold'}} descriptionStyle = {{fontFamily: 'Prompt_500Medium'}}
    title="First Item"
    description="Item description"
  />
  <List.Item titleStyle = {{fontFamily: 'Prompt_700Bold'}} descriptionStyle = {{fontFamily: 'Prompt_500Medium'}}
    title="First Item"
    description="Item description"
  />
  </ScrollView>
  
  )
  
  
  };

export default SocialFeed;