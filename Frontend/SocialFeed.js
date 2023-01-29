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
    <List.Item titleStyle={{fontFamily:'Prompt_700Bold'}} descriptionStyle={{fontFamily:'Prompt_500Medium'}}
    title="BobSmith"
    description="earned 170 kudos volunteering at Minnehack 2023!"
  />
  <List.Item titleStyle={{fontFamily:'Prompt_700Bold'}} descriptionStyle={{fontFamily:'Prompt_500Medium'}}
    title="joeyb_9"
    description="earned 244 kudos volunteering at Touchstone Mental Health!"
  />
  <List.Item titleStyle={{fontFamily:'Prompt_700Bold'}} descriptionStyle={{fontFamily:'Prompt_500Medium'}}
    title="patrickmahomes"
    description="earned 199 kudos volunteering at Epilepsy Foundation of Minnesota!"
  />
  <List.Item titleStyle={{fontFamily:'Prompt_700Bold'}} descriptionStyle={{fontFamily:'Prompt_500Medium'}}
    title="weijini"
    description="earned 190 kudos volunteering at Bolder Options!"
  />
  <List.Item titleStyle={{fontFamily:'Prompt_700Bold'}} descriptionStyle={{fontFamily:'Prompt_500Medium'}}
    title="jalenhurts"
    description="earned 312 kudos volunteering at Longfellow/Seward Healthy Seniors!"
  />
  <List.Item titleStyle={{fontFamily:'Prompt_700Bold'}} descriptionStyle={{fontFamily:'Prompt_500Medium'}}
    title="brock.purdy13"
    description="earned 109 kudos volunteering at Project Success!"

  />
  </ScrollView>
  )
  
  
  }
  
  

export default SocialFeed;