import React from 'react';
import {View, Image, Text, ScrollView} from 'react-native';
import Header from '../home/components/header';
import Colors from '../../styles/colors';
import FontWeight from '../../styles/font-weight';
import {scale} from '../../styles/size-matters';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {MenuStackParamList} from '../../navigation/menu';
import {TStore} from '../../service/redux/store';
import {connect} from 'react-redux';

type ReduxState = {
  services: TStore['services'];
  bike: TStore['bike'];
};

type ServiceDetailsNavigationProp = StackNavigationProp<
  MenuStackParamList,
  'ServiceDetails'
>;

interface Props extends ReduxState {
  navigation: ServiceDetailsNavigationProp;
  route: RouteProp<MenuStackParamList, 'ServiceDetails'>;
}

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

class ComingSoon extends React.PureComponent<Props, {}> {
  render() {
    return (
      <View style={{width: '100%', height: '100%'}}>
        <Header
          backgroundColor={Colors.HEADER_YELLOW}
          title={'Service'}
          hasBackButton
          onBackClick={() => this.props.navigation.goBack()}
        />
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: Colors.BG_GREY,
            width: '100%',
          }}>
          {Object.keys(this.props.services).map((key, index) => (
            <View
              style={{
                paddingHorizontal: scale(16),
                paddingVertical: scale(8),
              }}>
              <Card
                title={this.props.services[key].title}
                data={[
                  {
                    key: 'Cycle ID:',
                    value: this.props.bike.id,
                  },
                  {
                    key: 'Service ID:',
                    value: this.props.services[key].id,
                  },
                  {
                    key: 'Time:',
                    value: this.props.services[key].openDate,
                  },
                  {
                    key: 'Status:',
                    value: this.props.services[key].isOpen ? "Open" : "Closed",
                  },
                ]}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}

export default connect(
  (store: TStore): ReduxState => {
    return {
      services: store['services'],
      bike: store['bike'],
    };
  },
)(ComingSoon);