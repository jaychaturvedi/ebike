import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Tabs from '../../components/tabs';
import ServiceTile from '../../components/service-tile';
import {moderateScale} from 'react-native-size-matters';
import Header from '../home/components/header';
import Footer from '../home/components/footer';
import Colors from '../../styles/colors';

type Props = {};
type State = {};

export default class SupportService extends React.PureComponent<Props, State> {
  render() {
    return (
      <View style={styles.container}>
        <Header
          hasBackButton
          title={'My Rides'}
          hasTabs
          backgroundColor={Colors.HEADER_YELLOW}
        />
        <Tabs
          data={[
            {
              header: 'Open Service',
              count: 2,
              body: (
                <View style={{height: moderateScale(97)}}>
                  <ServiceTile
                    title="Title Of the Service"
                    serviceId="943530"
                    time="04:21pm 20-04-20"
                  />
                </View>
              ),
            },
            {
              header: 'Open Service',
              count: 3,
              body: (
                <View style={{height: moderateScale(97)}}>
                  <ServiceTile
                    title="Title Of the Service"
                    serviceId="943530"
                    time="04:21pm 20-04-20"
                  />
                  <ServiceTile
                    title="Title Of the Service"
                    serviceId="943530"
                    time="04:21pm 20-04-20"
                  />
                  <ServiceTile
                    title="Title Of the Service"
                    serviceId="943530"
                    time="04:21pm 20-04-20"
                  />
                  <ServiceTile
                    title="Title Of the Service"
                    serviceId="943530"
                    time="04:21pm 20-04-20"
                  />
                </View>
              ),
            },
          ]}
        />
        <Footer
          lockOnlyVisible={false}
          locked
          onItemSelect={() => {}}
          onLockClick={() => {}}
          selectedItem={'home'}
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
