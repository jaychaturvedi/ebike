import React from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import Tile from '../../components/tile';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Header from '../home/components/header';
import Footer from '../home/components/footer';
import Colors from '../../styles/colors';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { MenuStackParamList } from '../../navigation/menu';
import { TStore } from '../../service/redux/store';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ReadUpgrades } from 'src/service/redux/actions/saga';

type UpdgradeNavigationProp = StackNavigationProp<
  MenuStackParamList,
  'Upgrade'
>;

interface ReduxState {
  upgrades: TStore['upgrades'],
  readUpgrades: (params: ReadUpgrades) => void
}

interface Props extends ReduxState {
  navigation: UpdgradeNavigationProp,
  route: RouteProp<MenuStackParamList, 'Upgrade'>
};

type State = {
  refreshing: boolean
};

class Upgrade extends React.PureComponent<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      refreshing: false
    }
  }

  componentDidMount() {
    this.props.readUpgrades({
      type: 'ReadUpgrades',
      payload: {}
    })
  }

  onRefresh() {
    this.setState({ refreshing: true });
    this.props.readUpgrades({
      type: 'ReadUpgrades',
      payload: {}
    })
    this.setState({ refreshing: false });
  }

  render() {
    return (
      <View style={{ height: '100%' }}>
        <Header
          hasBackButton
          title={'Upgrades'}
          backgroundColor={Colors.HEADER_YELLOW}
          onBackClick={() => this.props.navigation.goBack()}
        />
        <ScrollView
          style={styles.container}
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
              title="Loading..."
            />
          }
        >
          {
            this.props.upgrades.upgrades.map((upgrade, index: number) => {
              return <Tile
                key={index}
                feature={upgrade.name}
                icon={{ uri: upgrade.icon }}
                iconStyle={{ height: moderateScale(80), width: moderateScale(80) }}
                onPress={() => this.props.navigation.navigate('ComingSoon', {})}
                height={moderateScale(157)}
                unit={upgrade.price.toString()}
              />
            })
          }
        </ScrollView>
      </View>
    );
  }
}

export default connect(
  (store: TStore) => {
    return {
      upgrades: store['upgrades'],
    };
  },
  (dispatch: Dispatch) => {
    return {
      readUpgrades: (params: ReadUpgrades) => dispatch(params)
    };
  },
)(Upgrade);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScale(10),
    backgroundColor: '#F0F0F0',
  },
});
