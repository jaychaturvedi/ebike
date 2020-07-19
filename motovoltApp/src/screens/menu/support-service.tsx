import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Tabs from '../../components/tabs';
import ServiceTile from '../../components/service-tile';
import { moderateScale } from 'react-native-size-matters';
import Header from '../home/components/header';
import Colors from '../../styles/colors';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { MenuStackParamList } from '../../navigation/menu';

type SupportServiceNavigationProp = StackNavigationProp<
  MenuStackParamList,
  'SupportService'
>;

type Props = {
  navigation: SupportServiceNavigationProp,
  route: RouteProp<MenuStackParamList, 'SupportService'>
};


type State = {};

export default class SupportService extends React.PureComponent<Props, State> {
  render() {
    return (
      <View style={styles.container}>
        <Header
          hasBackButton
          title={'Service'}
          subtitle={'Cycle A'}
          hasTabs
          onBackClick={() => this.props.navigation.goBack()}
          backgroundColor={Colors.HEADER_YELLOW}
        />
        <Tabs
          data={[
            {
              header: 'Open Service',
              count: 1,
              body: (
                <View style={{ height: moderateScale(97) }}>
                  <ServiceTile
                    title="Title Of the Service"
                    serviceId="943530"
                    time="04:21pm 20-04-20"
                    onView={() => this.props.navigation.navigate('ServiceDetails', {})}
                  />
                </View>
              ),
            },
            {
              header: 'Closed Service',
              count: 4,
              body: (
                <View style={{ height: moderateScale(97) }}>
                  <ServiceTile
                    title="Title Of the Service"
                    serviceId="943530"
                    time="04:21pm 20-04-20"
                    onView={() => this.props.navigation.navigate('ServiceDetails', {})}
                  />
                  <ServiceTile
                    title="Title Of the Service"
                    serviceId="943530"
                    time="04:21pm 20-04-20"
                    onView={() => this.props.navigation.navigate('ServiceDetails', {})}
                  />
                  <ServiceTile
                    title="Title Of the Service"
                    serviceId="943530"
                    time="04:21pm 20-04-20"
                    onView={() => this.props.navigation.navigate('ServiceDetails', {})}
                  />
                  <ServiceTile
                    title="Title Of the Service"
                    serviceId="943530"
                    time="04:21pm 20-04-20"
                    onView={() => this.props.navigation.navigate('ServiceDetails', {})}
                  />
                </View>
              ),
            },
          ]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});
