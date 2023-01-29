import * as React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { List } from 'react-native-paper';

const SocialFeed = () => (
  <ScrollView>
    <List.Item
    title="Bob Smith"
    description="earned 170 kudos volunteering at Minnehack 2023!"
  />
  <List.Item
    title="First Item"
    description="Item description"
  />
  <List.Item
    title="First Item"
    description="Item description"
  />
  <List.Item
    title="First Item"
    description="Item description"
  />
  <List.Item
    title="First Item"
    description="Item description"
  />
  <List.Item
    title="First Item"
    description="Item description"
  />
  </ScrollView>
  
  
);

export default SocialFeed;