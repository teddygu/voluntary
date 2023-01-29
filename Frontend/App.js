import { StyleSheet, View, Text, Image } from 'react-native';
import { Provider as PaperProvider, Button, List } from 'react-native-paper';
import BottomNav from './BottomNav';
import Login from './Login';
import { useFonts, Prompt_500Medium} from '@expo-google-fonts/prompt';

export default function App() {
  let [fontsLoaded] = useFonts({
    Prompt_500Medium,
  });
  var loggedIn = true;

  if (!fontsLoaded) {
    return null;
  }

  return (
    <PaperProvider>
      {!loggedIn && <Login />}
      {loggedIn && <BottomNav />}
    </PaperProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     flexDirection: 'column',
//     paddingTop: 50
//   }
// });
