import { StyleSheet, View, Text, Image } from 'react-native';
import { Provider as PaperProvider, Button, List } from 'react-native-paper';
import BottomNav from './BottomNav';

export default function App() {
  
  return (
    <PaperProvider>
      <BottomNav></BottomNav>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: 50
  }
});
