import React from 'react';
import {View, ScrollView} from 'react-native';
import Footer from './components/footer';
import Header from './components/header';
import Colors from '../../styles/colors';
import Timeline from './components/timeline';

export default class Notifications extends React.PureComponent<{}, {}> {
  render() {
    return (
      <View
        style={{
          height: '100%',
          width: '100%',
          backgroundColor: Colors.BG_GREY,
        }}>
        <Header
          backgroundColor={'white'}
          hasBackButton
          hasSubtitle
          title={'Notifications'}
          subtitle={'Cycle A'}
        />
        <ScrollView style={{flex: 1, paddingVertical: 16}}>
          <Timeline
            title={'13/04/2020 - Mon'}
            data={[
              {
                time: '09:00',
                title: 'Archery Training',
                description:
                  'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ',
                hasFollow: true,
                viewed: true,
              },
              {
                time: '10:45',
                title: 'Play Badminton',
                viewed: true,
                description:
                  'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.',
              },
              {
                time: '12:00',
                title: 'Lunch',
                viewed: true,
              },
              {
                time: '14:00',
                title: 'Watch Soccer',
                description:
                  'Team sport played between two teams of eleven players with a spherical ball. ',
              },
              {
                time: '16:30',
                title: 'Go to Fitness center',
                description:
                  'Look out for the Best Gym & Fitness Centers around me :)',
              },
            ]}
          />
          <Timeline
            title={'15/04/2020 - Wed'}
            data={[
              {
                time: '09:00',
                title: 'Archery Training',
                description:
                  'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ',
                hasFollow: true,
                viewed: true,
              },
            ]}
          />
        </ScrollView>
        <Footer
          lockOnlyVisible={false}
          locked={false}
          onItemSelect={() => {}}
          onLockClick={() => {}}
          selectedItem={'home'}
        />
      </View>
    );
  }
}
