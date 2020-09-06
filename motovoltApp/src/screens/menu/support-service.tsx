import React from 'react';
import { View, StyleSheet, RefreshControl } from 'react-native';
import Tabs from '../../components/tabs';
import ServiceTile from '../../components/service-tile';
import { moderateScale } from 'react-native-size-matters';
import Header from '../home/components/header';
import Colors from '../../styles/colors';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { MenuStackParamList } from '../../navigation/menu';
import { TStore } from '../../service/redux/store';
import { connect } from 'react-redux';
import { Icon } from 'native-base';
import { Dispatch } from 'redux';
import { ReadService } from '../../service/redux/actions/saga/service-actions'
import { ScrollView } from 'react-native-gesture-handler';
import LanguageSelector from '../../translations';

type SupportServiceNavigationProp = StackNavigationProp<
  MenuStackParamList,
  'SupportService'
>;

type ReduxState = {
  services: TStore['services'],
  bike: TStore['bike'],
  getServices: (params: ReadService) => void
}

interface Props extends ReduxState {
  navigation: SupportServiceNavigationProp,
  route: RouteProp<MenuStackParamList, 'SupportService'>
};


type State = {
  refreshing: boolean
};

class SupportService extends React.PureComponent<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      refreshing: false
    }
  }

  componentDidMount() {
    this.props.getServices({
      type: 'ReadService',
      payload: {}
    })
  }

  onRefresh() {
    this.setState({ refreshing: true });
    this.props.getServices({
      type: 'ReadService',
      payload: {}
    })
    this.setState({ refreshing: false });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          hasBackButton
          title={LanguageSelector.t("support.service")}
          subtitle={this.props.bike.name}
          hasTabs
          onBackClick={() => this.props.navigation.goBack()}
          backgroundColor={Colors.HEADER_YELLOW}
        />
        <Tabs
          data={[
            {
              header: LanguageSelector.t("support.openService"),
              count: this.props.services.open,
              body: (
                <ScrollView
                  refreshControl={
                    <RefreshControl
                      refreshing={this.state.refreshing}
                      onRefresh={this.onRefresh.bind(this)}
                      title="Loading..."
                    />
                  }
                >
                  {
                    Object.keys(this.props.services.services).map((service, index: number) => {
                      return (
                        this.props.services.services[service].isOpen ?
                          <View style={{ height: moderateScale(97), marginTop: moderateScale(15) }}>
                            <ServiceTile
                              key={index}
                              title={this.props.services.services[service].title}
                              serviceId={this.props.services.services[service].id}
                              time={this.props.services.services[service].openDate}
                              onView={() => this.props.navigation.navigate('ServiceDetails', { serviceId: this.props.services.services[service].id })}
                            />
                          </View> : null
                      )
                    })
                  }
                </ScrollView>
              ),
            },
            {
              header: LanguageSelector.t("support.closedService"),
              count: this.props.services.closed,
              body: (
                <ScrollView
                  refreshControl={
                    <RefreshControl
                      refreshing={this.state.refreshing}
                      onRefresh={this.onRefresh.bind(this)}
                      title="Loading..."
                    />
                  }
                >
                  {
                    Object.keys(this.props.services.services).map((service, index: number) => {
                      return (
                        !this.props.services.services[service].isOpen ?
                          <View style={{ height: moderateScale(97), marginTop: moderateScale(15) }}>
                            <ServiceTile
                              key={index}
                              title={this.props.services.services[service].title}
                              serviceId={this.props.services.services[service].id}
                              time={this.props.services.services[service].openDate}
                              onView={() => this.props.navigation.navigate('ServiceDetails', { serviceId: this.props.services.services[service].id })}
                            />
                          </View>
                          : null
                      )
                    })
                  }
                </ScrollView>
              ),
            },
          ]}
        />
      </View>
    );
  }
}

export default connect(
  (store: TStore) => {
    return {
      services: store['services'],
      bike: store['bike'],
    };
  },
  (dispatch: Dispatch) => {
    return {
      getServices: (params: ReadService) => dispatch(params)
    };
  },
)(SupportService);

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});
