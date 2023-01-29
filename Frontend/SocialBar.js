import * as React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Button, SegmentedButtons } from 'react-native-paper';
import Social from './Social';
import SocialFeed from './SocialFeed';
import IconButton from 'react-native-paper';
import { useFonts, Prompt_500Medium, Prompt_700Bold} from '@expo-google-fonts/prompt';

const SocialBar = () => {
  const [value, setValue] = React.useState('feed');
  let [fontsLoaded] = useFonts({
    Prompt_500Medium, Prompt_700Bold
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
<>

<SafeAreaView style={styles.container}>
<View style={{padding: 10, left: 150}}>
  <Button icon={require('./assets/search_icon.png')}></Button>
</View>

      <SegmentedButtons labelStyle={{fontFamily:'Prompt_700Bold'}}
        value={value}
        onValueChange={setValue}
        buttons={[
          {
            value: 'feed',
            label: 'Feed',
          },
          { 
            value: 'leaderboard',
            label: 'Leaderboard',
          }
        ]} />
    </SafeAreaView>
    {value == 'leaderboard' && <Social></Social>}
    {value == 'feed' && <SocialFeed></SocialFeed>}
    
    
</>
      
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    top: 50
  },
});

export default SocialBar;