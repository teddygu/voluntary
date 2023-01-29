import * as React from 'react';
import {View, ScrollView} from 'react-native'
import { Appbar, Divider, Card, Text } from 'react-native-paper';

const Rewards = () => (
    <View>
        <Appbar.Header>
                <Appbar.Content title="Rewards" />
            </Appbar.Header>
        <ScrollView>
            <Card>
                <Card.Cover source={{ uri: 'https://m.media-amazon.com/images/G/01/gc/designs/livepreview/a_generic_white_10_us_noto_email_v2016_us-main._CB627448186_.png' }} />
                <Card.Content>
                <Text variant="titleLarge">Amazon Gift Card</Text>
                <Text variant="bodyMedium">$50 Gift Card</Text>
                </Card.Content>
            </Card>
            <Divider/>
            <Card>
                <Card.Cover source={{ uri: 'https://nypost.com/wp-content/uploads/sites/2/2021/08/lululemon-leggings.jpg?quality=75&strip=all' }} />
                <Card.Content>
                <Text variant="titleLarge">Lululemon</Text>
                <Text variant="bodyMedium">%15 off any purchase</Text>
                </Card.Content>
            </Card>
            <Divider/>
            <Card>
                <Card.Cover source={{ uri: 'https://img.cdn4dd.com/cdn-cgi/image/fit=contain,width=1200,height=672,format=auto/https://doordash-static.s3.amazonaws.com/media/store/header/a1488871-8669-47a6-8446-4e83b44296f3.jpg' }} />
                <Card.Content>
                <Text variant="titleLarge">Chipotle</Text>
                <Text variant="bodyMedium">BOGO Burrito Bowl</Text>
                </Card.Content>
            </Card>
            <Divider/>
            <Card>
                <Card.Cover source={{ uri: 'https://www.therabody.com/dw/image/v2/BCWX_PRD/on/demandware.static/-/Sites-thg-master/default/dwd8c45c39/images/PDP/grid/PRO_BLACK_GRID_4.jpg?sw=720' }} />
                <Card.Content>
                <Text variant="titleLarge">Therabody</Text>
                <Text variant="bodyMedium">%20 off any purchase</Text>
                </Card.Content>
            </Card>
        </ScrollView>
        
            
    </View>
);

export default Rewards;