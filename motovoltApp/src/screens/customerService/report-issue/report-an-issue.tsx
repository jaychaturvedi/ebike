import React from 'react';
import {
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Header from '../../home/components/header';
import { ThemeContext } from '../../../styles/theme/theme-context';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { Icon, Text } from 'native-base';
import { scale } from '../../../styles/size-matters';
import AddReport from '../../../assets/svg/add-report';
import ActiveIssueIcon from '../../../assets/svg/active-issue';
import PastServiceIcon from '../../../assets/svg/past-service';
import GestureRecognizer from 'react-native-swipe-gestures';
import Moment from 'moment';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { CustomerServiceStackParamList } from '../../../navigation/customer-service';
import { TBookedServices, TStore } from '../../../service/redux/store';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
  CancelReportedIssue,
  GetReportedIssues,
} from 'src/service/redux/actions/saga';
import RequestServiceIcon from '../../../assets/svg/service_stations';
import DragHandle from './components/drag-handle';
import ActiveIssues from './components/active-issues';
import PastIssues from './components/past-issues';

interface ReduxState {
  reportedIssue: TStore["reportIssue"]["reportedIssues"],
  onServiceCancelledStatus: TStore['requestedServices']['onServiceCancelledStatus'];
  user: TStore['user'];
  CancelReportedIssue: (params: CancelReportedIssue) => void;
  GetReportedIssues: (params: GetReportedIssues) => void;
}

interface Props extends ReduxState {
  navigation: CustomerServiceNavigationProp;
  route: RouteProp<CustomerServiceStackParamList, 'ReportAnIssue'>;
}
type CustomerServiceNavigationProp = StackNavigationProp<
  CustomerServiceStackParamList,
  'ReportAnIssue'
>;

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
  dataLoaded: boolean;
  reportedIssue: TStore["reportIssue"]["reportedIssues"],
};

class ReportAnIssue extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      expanded: false,
      reportedIssue: [],
      dataLoaded: false
    };
  }

  componentDidMount() {
    if (this.state.dataLoaded === false
      || this.props.reportedIssue !== this.state.reportedIssue) {
      this.props.GetReportedIssues({
        type: 'GetReportedIssues',
        payload: {
          frameId: this.props.user.defaultBikeId,
        },
      });
      this.setState({
        dataLoaded: true,
        reportedIssue: this.props.reportedIssue
      })
    }
  }

  componentDidUpdate() {
    if (this.props.reportedIssue !== this.state.reportedIssue) {
      this.setState({ reportedIssue: this.props.reportedIssue })
    }
  }

  onSwipe(gestureName: string, gestureState: any) {
    const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
    switch (gestureName) {
      case SWIPE_UP:
        this.setState({ expanded: true });
        break;
      case SWIPE_DOWN:
        this.setState({ expanded: false });
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
      <View style={{ width: '100%', height: '100%' }}>
        <Header
          hasBackButton
          title={'Report an Issue'}
          backgroundColor={Theme.HEADER_YELLOW}
          hideNotification
          hideBluetooth
          hidePromo
          onBackClick={() => this.props.navigation.goBack()}
        />
        <View
          style={{ position: 'relative', backgroundColor: '#F6F6F6', flex: 1 }}>
          <View style={{ display: 'flex', alignItems: 'center' }}>
            <Menu style={{ marginTop: scale(42) }}>
              <MenuTrigger>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                  }}>
                  <Text style={{ marginRight: 8 , opacity: 0.7}}>
                    {this.props.user.defaultBikeId}
                  </Text>
                  <Icon
                    type="FontAwesome"
                    name="caret-down"
                    style={{ fontSize: 20 }}
                  />
                </View>
              </MenuTrigger>
              <MenuOptions
                optionsContainerStyle={{
                  padding: 10,
                  width:160}}>
                <MenuOption onSelect={() => {
                  this.props.GetReportedIssues({
                    type: 'GetReportedIssues',
                    payload: {
                      frameId: this.props.user.defaultBikeId,
                    },
                  });
                }}>
                  <Text
                    style={{
                      textAlign:"center",
                      fontSize: 18,
                      fontWeight: 'bold',
                      opacity: 0.7 }}>
                    {this.props.user.defaultBikeId}
                  </Text>
                </MenuOption>
                {/* <View
                  style={{ borderWidth: 1, opacity: 0.1, marginVertical: 20 }}
                /> */}
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
            onPress={() => this.props.navigation.navigate('NewIssue', {})}
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
              onSwipeDown={() => this.setState({ expanded: false })}
              onSwipeUp={() => this.setState({ expanded: true })}
              onSwipe={(direction, state) => this.onSwipe(direction, state)}
              config={config}>
              <TouchableOpacity
                onPress={() => this.setState({ expanded: !this.state.expanded })}>
                <DragHandle />
              </TouchableOpacity>
            </GestureRecognizer>
            <ScrollView style={{ backgroundColor: 'white' }}>
              <View
                style={{
                  width: '100%',
                  paddingHorizontal: 24,
                  paddingVertical: 12,
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 18,
                    fontWeight: "bold"
                  }}>
                  Active Issues
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  backgroundColor: '#3C5BE8',
                  paddingHorizontal: 24,
                  paddingVertical: 12,
                }}>
                {this.state?.reportedIssue
                  // Completed
                  .filter((issue) => issue.status === 'A')
                  .map((issue, index) => (
                    <View style={{ marginTop: 12 }} key={issue.issueId}>
                      <ActiveIssues
                        createDate={issue.createdTime}
                        onClick={() => {
                          this.props.navigation.navigate("ReportedIssueConversation", {
                            screenName: "Active Issues",
                            issue: {
                              categoryName: issue.categoryName,
                              createdTime: issue.createdTime,
                              issueId: issue.issueId,
                              issueDescription: "there is no description",
                            }
                          })
                        }}
                        categoryName={issue.categoryName}
                        issueId={issue.issueId}
                        key={issue.issueId}
                      />
                    </View>
                  ))}
              </View>
              <View
                style={{
                  paddingHorizontal: 24,
                  paddingVertical: 12,
                  width: '100%',
                }}>
                <Text style={{
                  fontSize: 18,
                  fontWeight:"bold",
                  marginBottom: 30 }}>
                  Past Issues
                </Text>
                {this.state.reportedIssue
                  // Completed
                  .filter((item) => item.status === 'D')
                  .map((issue, i) => {
                    return (
                      <React.Fragment key={issue.issueId}>
                        <PastIssues
                          issueDate={issue.createdTime}
                          issueType={issue.categoryName}
                          onClick={() => {
                            this.props.navigation.navigate("ReportedIssueConversation", {
                              screenName: "Past Issues",
                              issue: {
                                categoryName: issue.categoryName,
                                createdTime: issue.createdTime,
                                issueId: issue.issueId,
                                issueDescription: "there is no description",
                              }
                            })
                          }}
                        />
                        {i !== this.state.reportedIssue.length && (
                          <View
                            style={{
                              borderWidth: 1,
                              opacity: 0.1,
                              marginVertical: 12,
                            }}
                          />
                        )}
                      </React.Fragment>
                    );
                  })}
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}

ReportAnIssue.contextType = ThemeContext;

export default connect(
  (store: TStore) => {
    return {
      reportedIssue: store["reportIssue"]["reportedIssues"],
      user: store['user'],
    };
  },
  (dispatch: Dispatch) => {
    return {
      CancelReportedIssue: (params: CancelReportedIssue) => dispatch(params),
      GetReportedIssues: (params: GetReportedIssues) => dispatch(params),
    };
  },
)(ReportAnIssue);
