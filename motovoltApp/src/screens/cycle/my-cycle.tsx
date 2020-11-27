import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {moderateScale, scale} from 'react-native-size-matters';
import Header from '../home/components/header';
import Colors from '../../styles/colors';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {MyCycleStackParamList} from '../../navigation/cycle';
import {TStore} from '../../service/redux/store';
import {connect} from 'react-redux';
import Background from '../../components/background';
import {Dispatch} from 'redux';
import {ReadBikeStat} from '../../service/redux/actions/saga/bike-actions';
import LanguageSelector from '../../translations';
import {ThemeContext} from '../../styles/theme/theme-context';
import Tile from './tile';
import {Icon} from 'native-base';
import Moment from 'moment';

type ReduxState = {
  bike: TStore['bike'];
  readBikeStat: (params: ReadBikeStat) => void;
};

type MyCycleNavigationProp = StackNavigationProp<
  MyCycleStackParamList,
  'MyCycleScreen'
>;

interface Props extends ReduxState {
  navigation: MyCycleNavigationProp;
  route: RouteProp<MyCycleStackParamList, 'MyCycleScreen'>;
}

type State = {
  refreshing: boolean;
};

class MyCycle extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  onRefresh() {
    this.setState({refreshing: true});
    this.props.readBikeStat({
      type: 'ReadBikeStat',
      payload: {
        bikeId: this.props.bike.id,
      },
    });
    this.setState({refreshing: false});
  }

  getIcon(status: string) {
    switch (status) {
      case 'C':
        return (
          <Icon
            type="FontAwesome"
            name="exclamation-circle"
            style={{width: 32, height: 32, color: '#FF1F00'}}
          />
        );
      case 'W':
        return (
          <Icon
            type="FontAwesome"
            name="exclamation-circle"
            style={{width: 32, height: 32, color: '#FFA800'}}
          />
        );
      case 'H':
      default:
        return (
          <Icon
            type="FontAwesome"
            name="check-circle"
            style={{width: 32, height: 32, color: '#40A81B'}}
          />
        );
    }
  }

  render() {
    let Theme = this.context.theme; //load theme context
    const batteries = Object.keys(this.props.bike.batteries);
    return (
      <View style={styles.container}>
        <Background />
        <Header
          title={LanguageSelector.t('myBike.myCycle')}
          hasSubtitle
          subtitle={this.props.bike.name}
          hasTabs
          backgroundColor={Colors.HEADER_YELLOW}
        />
        <ScrollView
          style={{paddingHorizontal: moderateScale(15), flex: 1}}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
              title="Loading..."
            />
          }>
          <View style={styles.cycle}>
            <Image
              source={require('../../assets/images/cycle.png')}
              style={{height: '80%', width: '100%'}}
              height={scale(200)}
              width={scale(300)}
            />
          </View>
          <View
            style={{
              ...styles.cycleName, //change dark theme
            }}>
            <Text
              style={{fontSize: 24, fontWeight: '400', color: Theme.TEXT_WHITE}}
              numberOfLines={1}>
              {this.props.bike.name}
            </Text>
          </View>
          <View style={styles.metrics}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Tile
                icon={
                  <Image
                    source={require('../../assets/icons/motor.png')}
                    style={{
                      width: '100%',
                      height: '100%',
                      resizeMode: 'contain',
                    }}
                    width={40}
                    height={40}
                  />
                }
                textLine1={LanguageSelector.t('myBike.motor')}
                textLine2={LanguageSelector.t('myBike.condition')}
                statusIcon={this.getIcon(this.props.bike.motorState)}
              />
              <Tile
                icon={
                  <Image
                    source={require('../../assets/icons/battery.png')}
                    style={{
                      width: '100%',
                      height: '100%',
                      resizeMode: 'contain',
                    }}
                    width={40}
                    height={40}
                  />
                }
                textLine1={LanguageSelector.t('myBike.battery')}
                textLine2={LanguageSelector.t('myBike.condition')}
                statusIcon={this.getIcon(this.props.bike.batteryState)}
              />
            </View>
            <View style={{height: 24}} />
            <View
              style={{
                backgroundColor: 'white',
                paddingHorizontal: 24,
                paddingVertical: 10,
                borderRadius: 10,
                shadowOpacity: 0.25,
                shadowRadius: 1,
                shadowColor: 'black',
                shadowOffset: {height: 1, width: 1},
                elevation: 3  
              }}>
              <View
                style={{
                  paddingVertical: 24,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <Text style={{fontSize: 16, opacity: 0.7}}>{LanguageSelector.t('myBike.vehicleId')}</Text>
                <Text style={{fontSize: 16, fontWeight: '500'}}>{this.props.bike.id}</Text>
              </View>
              <View style={{borderWidth: 0.5, opacity: 0.2}} />
              <View
                style={{
                  paddingVertical: 24,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <Text style={{fontSize: 16, opacity: 0.7}}>{LanguageSelector.t('myBike.batteryId')}</Text>
                <View style={{flexDirection: 'row'}}>
                  {batteries.length > 1 ? (
                    <>
                      <Text style={{fontSize: 16, fontWeight: '500'}}>{batteries[1]}</Text>
                      <View
                        style={{
                          borderWidth: 0.5,
                          opacity: 0.2,
                          marginHorizontal: 8,
                        }}
                      />
                    </>
                  ) : null}
                  {batteries.length > 0 ? (
                    <Text style={{fontSize: 16, fontWeight: '500'}}>{batteries[0]}</Text>
                  ) : null}
                </View>
              </View>
              <View style={{borderWidth: 0.5, opacity: 0.2}} />
              <View
                style={{
                  paddingVertical: 24,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <Text style={{fontSize: 16, opacity: 0.7}}>
                  {LanguageSelector.t('myBike.nextServiceDate')}
                </Text>
                <Text style={{fontSize: 16, fontWeight: '500'}}>
                  {Moment(this.props.bike.serviceDate).format('DD-MM-YYYY')}
                </Text>
              </View>
            </View>
            <View style={{height: 24}} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

MyCycle.contextType = ThemeContext;

export default connect(
  (store: TStore) => {
    return {
      bike: store['bike'],
    };
  },
  (dispatch: Dispatch) => {
    return {
      readBikeStat: (params: ReadBikeStat) => dispatch(params),
    };
  },
)(MyCycle);

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#F0F0F0',
    // padding: moderateScale(15),
  },
  cycle: {
    height: moderateScale(300),
    justifyContent: 'center',
    alignItems: 'center',
  },
  cycleName: {
    // height: moderateScale(50),
    borderRadius: moderateScale(10),
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  metrics: {
    flex: 1,
    marginTop: moderateScale(20),
    shadowOpacity: 0.25,
    shadowRadius: 1,
    shadowColor: 'black',
    shadowOffset: {height: 1, width: 1},
    elevation: 3,
  },
});
