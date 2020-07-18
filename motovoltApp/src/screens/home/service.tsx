import React from 'react';
import {View, Image, Text, ScrollView} from 'react-native';
import Header from '../home/components/header';
import Colors from '../../styles/colors';
import FontWeight from '../../styles/font-weight';
import {scale} from '../../styles/size-matters';

type CardProps = {
  title: string;
  data: {key: string; value: string}[];
};

function Card(props: CardProps) {
  return (
    <View
      style={{
        backgroundColor: Colors.WHITE,
        padding: scale(16),
        borderRadius: scale(8),
      }}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: FontWeight.SEMI_BOLD,
          color: Colors.DARK_BLACK,
          marginBottom: scale(8),
        }}>
        {props.title}
      </Text>
      {props.data.map((item) => (
        <Text style={{marginVertical: scale(8)}}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: FontWeight.SEMI_BOLD,
              color: Colors.BLACK,
            }}>
            {item.key}
          </Text>{' '}
          <Text
            style={{
              fontSize: 14,
              fontWeight: FontWeight.REGULAR,
              color: Colors.DARK_BLACK,
            }}>
            {item.value}
          </Text>
        </Text>
      ))}
    </View>
  );
}

export default class ComingSoon extends React.PureComponent<{}, {}> {
  render() {
    return (
      <View style={{width: '100%', height: '100%'}}>
        <Header backgroundColor={'white'} title={'Service'} hasBackButton />
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: Colors.BG_GREY,
            width: '100%',
          }}>
          <View
            style={{
              paddingHorizontal: scale(16),
              paddingVertical: scale(8),
            }}>
            <Card
              title="Title of the Service"
              data={[
                {
                  key: 'Cycle ID:',
                  value: 'BLR 1232479',
                },
                {
                  key: 'Service ID:',
                  value: '943530',
                },
                {
                  key: 'Time:',
                  value: '04:21PM 20-04-20',
                },
                {
                  key: 'Staus:',
                  value: 'Technician Assigned',
                },
              ]}
            />
          </View>
          <View style={{padding: scale(8)}}>
            <Card
              title="Title of the Service"
              data={[
                {
                  key: 'Cycle ID:',
                  value: 'BLR 1232479',
                },
                {
                  key: 'Service ID:',
                  value: '943530',
                },
                {
                  key: 'Time:',
                  value: '04:21PM 20-04-20',
                },
                {
                  key: 'Staus:',
                  value: 'Technician Assigned',
                },
              ]}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}
