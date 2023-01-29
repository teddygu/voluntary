import * as React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Button, SegmentedButtons } from 'react-native-paper';
import Social from './Social';
import SocialFeed from './SocialFeed';
import IconButton from 'react-native-paper';

const SocialBar = () => {
  const [value, setValue] = React.useState('feed');

  return (
<>

<SafeAreaView style={styles.container}>
<View style={{padding: 10, left: 150}}>
  <Button icon={require('./assets/search_icon.png')}></Button>
</View>

      <SegmentedButtons
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