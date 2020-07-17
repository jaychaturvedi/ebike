import React from 'react';
import {View} from 'react-native';
import Header from '../home/components/header';
import Footer from '../home/components/footer';
import Colors from '../../styles/colors';
import {scale} from '../../styles/size-matters';
import ExpandCard from './QnACard';

const data = [
  {
    title: 'How can I upgrade to premium?',
    description:
      'You can upgrade to premium by making the payment for the required features in the upgrades page. Steps: More>Upgrades>Feature>Payment',
  },
  {
    title: 'How can I upgrade to premium?',
    description:
      'You can upgrade to premium by making the payment for the required features in the upgrades page. Steps: More>Upgrades>Feature>Payment',
  },
  {
    title: 'How can I upgrade to premium?',
    description:
      'You can upgrade to premium by making the payment for the required features in the upgrades page. Steps: More>Upgrades>Feature>Payment',
  },
];

export default class Premium extends React.PureComponent<{}, {}> {
  render() {
    return (
      <View style={{width: '100%', height: '100%'}}>
        <Header backgroundColor={'white'} title={'Premium'} hasBackButton />
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.BG_GREY,
            paddingHorizontal: scale(16),
            paddingVertical: scale(8),
          }}>
          {data.map((item) => (
            <View style={{marginVertical: scale(4)}}>
              <ExpandCard title={item.title} description={item.description} />
            </View>
          ))}
        </View>
        <Footer
          lockOnlyVisible={false}
          locked={false}
          onItemSelect={() => {}}
          onLockClick={() => {}}
          selectedItem={'chart'}
        />
      </View>
    );
  }
}
