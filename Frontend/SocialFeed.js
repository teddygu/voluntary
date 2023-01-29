import * as React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { List } from 'react-native-paper';
import { useFonts, Prompt_500Medium, Prompt_700Bold} from '@expo-google-fonts/prompt';

const SocialFeed = () => (
  <ScrollView>
    <List.Item
    title="BobSmith"
    description="earned 170 kudos volunteering at Minnehack 2023!"
  />
  <List.Item
    title="joeyb_9"
    description="earned 244 kudos volunteering at Touchstone Mental Health!"
  />
  <List.Item
    title="patrickmahomes"
    description="earned 199 kudos volunteering at Epilepsy Foundation of Minnesota!"
  />
  <List.Item
    title="weijini"
    description="earned 190 kudos volunteering at Bolder Options!"
  />
  <List.Item
    title="jalenhurts"
    description="earned 312 kudos volunteering at Longfellow/Seward Healthy Seniors!"
  />
  <List.Item
    title="brock.purdy13"
    description="earned 109 kudos volunteering at Project Success!"
  />
  </ScrollView>
  )
  
  
  
  
  

export default SocialFeed;