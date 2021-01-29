import React from 'react';
import {
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Header from '../../home/components/header';
import {ThemeContext} from '../../../styles/theme/theme-context';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {Icon, Text} from 'native-base';
import {scale} from '../../../styles/size-matters';
import AddReport from '../../../assets/svg/add-report';
import ActiveIssueIcon from '../../../assets/svg/active-issue';
import PastServiceIcon from '../../../assets/svg/past-service';
import GestureRecognizer from 'react-native-swipe-gestures';

export const swipeDirections = {
  SWIPE_UP: 'SWIPE_UP',
  SWIPE_DOWN: 'SWIPE_DOWN',
  SWIPE_LEFT: 'SWIPE_LEFT',
  SWIPE_RIGHT: 'SWIPE_RIGHT',
};

var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;

var MAXIMUM_HEIGHT = deviceHeight - 250;
var MINUMUM_HEIGHT = 80;

type State = {
  expanded: boolean;
};

function DragHandle() {
  return (
    <View
      style={{
        width: '100%',
        height: 28,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}>
      <View
        style={{
          borderWidth: 1,
          borderColor: 'rgba(0,0,0,0.37)',
          width: 48,
        }}
      />
      <View
        style={{
          borderWidth: 1,
          borderColor: 'rgba(0,0,0,0.37)',
          width: 48,
        }}
      />
    </View>
  );
}

function ActiveIssue() {
  return (
    <View
      style={{
        marginVertical: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <View style={{flexDirection: 'row'}}>
        <ActiveIssueIcon style={{marginRight: 16}} />
        <View>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              fontWeight: '600',
            }}>
            IR-1234678
          </Text>
          <Text style={{color: 'white', fontSize: 16}}>
            26 Nov 2020: 3:46 pm
          </Text>
        </View>
      </View>
      <Text style={{color: 'white', fontSize: 18, fontWeight: '600'}}>
        Cancel
      </Text>
    </View>
  );
}

function PastService() {
  return (
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <Text style={{opacity: 0.6}}>General Service</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{marginRight: 20}}>12 Jan 2021</Text>
        <PastServiceIcon />
      </View>
    </View>
  );
}

export default class BookService extends React.PureComponent<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  onSwipe(gestureName: string, gestureState: any) {
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    switch (gestureName) {
      case SWIPE_UP:
        this.setState({expanded: true});
        break;
      case SWIPE_DOWN:
        this.setState({expanded: false});
        break;
      default:
        break;
    }
  }

  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
    };
    let Theme = this.context.theme; //load theme context
    return (
      <View style={{width: '100%', height: '100%'}}>
        <Header
          hasBackButton
          title={'Book a Service'}
          backgroundColor={Theme.HEADER_YELLOW}
          hideNotification
          hideBluetooth
          hidePromo
          // onBackClick={() => this.props.navigation.goBack()}
        />
        <View
          style={{position: 'relative', backgroundColor: '#F6F6F6', flex: 1}}>
          <View style={{display: 'flex', alignItems: 'center'}}>
            <Menu style={{marginTop: scale(42)}}>
              <MenuTrigger>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                  <Text style={{marginRight: 8}}>Roadstar 007</Text>
                  <Icon
                    type="FontAwesome"
                    name="caret-down"
                    style={{fontSize: 20}}
                  />
                </View>
              </MenuTrigger>
              <MenuOptions optionsContainerStyle={{padding: 20}}>
                <MenuOption onSelect={() => {}}>
                  <Text
                    style={{fontSize: 18, fontWeight: '500', opacity: 0.67}}>
                    Option 1
                  </Text>
                </MenuOption>
                <View
                  style={{borderWidth: 1, opacity: 0.1, marginVertical: 20}}
                />
                <MenuOption onSelect={() => {}}>
                  <Text style={{fontSize: 18, fontWeight: '500'}}>
                    Option 2
                  </Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
            <Image
              style={{
                marginTop: scale(77),
                marginBottom: 68,
                resizeMode: 'contain',
              }}
              height={scale(250)}
              source={require('../../../assets/images/report-a-service.png')}
            />
          </View>
          <AddReport
            style={{
              width: 68,
              height: 68,
              position: 'absolute',
              right: 20,
              bottom: 20,
            }}
          />
        </View>
        <View
          style={{
            bottom: 0,
            width: '100%',
            height: this.state.expanded ? '50%' : '30%',
            position: 'relative',
            zIndex: 1,
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'white',
            }}>
            <GestureRecognizer
              onSwipeDown={() => this.setState({expanded: false})}
              onSwipeUp={() => this.setState({expanded: true})}
              onSwipe={(direction, state) => this.onSwipe(direction, state)}
              config={config}>
              <TouchableOpacity
                onPress={() => this.setState({expanded: !this.state.expanded})}>
                <DragHandle />
              </TouchableOpacity>
            </GestureRecognizer>
            <ScrollView style={{backgroundColor: '#E5E5E5'}}>
              <View
                style={{
                  width: '100%',
                  backgroundColor: '#5372FF',
                  paddingHorizontal: 24,
                  paddingVertical: 12,
                }}>
                <Text style={{color: 'white', fontSize: 22, marginBottom: 22}}>
                  Active Issues
                </Text>
                <ActiveIssue />
                <ActiveIssue />
                <ActiveIssue />
              </View>
              <View
                style={{
                  paddingHorizontal: 24,
                  paddingVertical: 12,
                  width: '100%',
                }}>
                <Text style={{fontSize: 22, marginBottom: 30}}>
                  Past Issues
                </Text>
                <PastService />
                <View
                  style={{borderWidth: 1, opacity: 0.1, marginVertical: 12}}
                />
                <PastService />
                <View
                  style={{borderWidth: 1, opacity: 0.1, marginVertical: 12}}
                />
                <PastService />
                <View
                  style={{borderWidth: 1, opacity: 0.1, marginVertical: 12}}
                />
                <PastService />
                <View
                  style={{borderWidth: 1, opacity: 0.1, marginVertical: 12}}
                />
                <PastService />
                <View
                  style={{borderWidth: 1, opacity: 0.1, marginVertical: 12}}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}

BookService.contextType = ThemeContext;
