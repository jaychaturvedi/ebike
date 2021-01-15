import {Text, View} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Messaging from '../assets/svg/message';
import Promo from '../assets/svg/promo';
import Warning from '../assets/svg/warning';
import Card from '../screens/common/components/card';

const styles = StyleSheet.create({
  day: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 3,
    shadowOpacity: 0.25,
    shadowRadius: 1,
    shadowColor: 'black',
    shadowOffset: {height: 1, width: 1},
  },
});

export default function Notification() {
  return (
    <ScrollView
      contentContainerStyle={{
        width: '100%',
        paddingHorizontal: 12,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F6F6F6',
      }}>
      <View style={{marginVertical: 10, width: '100%'}}>
        <View style={styles.day}>
          <Text style={{color: 'rgba(0,0,0,0.4)'}}>Today</Text>
          <Text>Clear All</Text>
        </View>
        <View style={styles.container}>
          <Card
            title={'This is test titleThis is test title'}
            description={
              'This is test titleThis is test titleThis is test titleThis is test titletitleThis is test titleThis is test titletitleThis is test titleThis is test title'
            }
            time={'4:15 PM'}
            headerIcon={<Messaging style={{marginRight: 6}} />}
            headerImage={
              <Messaging style={{marginRight: 6}} width={48} height={48} />
            }
            bodyImage={
              <Messaging style={{marginRight: 6}} width={200} height={100} />
            }
          />
          <View style={{borderWidth: 1, borderColor: '#E5E5E5'}} />
          <Card
            title={'This is test titleThis is test title'}
            description={
              'This is test titleThis is test titleThis is test titleThis is test title'
            }
            time={'4:15 PM'}
            headerIcon={<Warning style={{marginRight: 6}} />}
          />
          <View style={{borderWidth: 1, borderColor: '#E5E5E5'}} />
          <Card
            title={'This is test titleThis is test title'}
            description={
              'This is test titleThis is test titleThis is test titleThis is test title'
            }
            time={'4:15 PM'}
            headerIcon={<Promo style={{marginRight: 6}} />}
          />
          <View style={{borderWidth: 1, borderColor: '#E5E5E5'}} />
          <Card
            title={'This is test titleThis is test title'}
            description={
              'This is test titleThis is test titleThis is test titleThis is test title'
            }
            time={'4:15 PM'}
          />
        </View>
      </View>
    </ScrollView>
  );
}
