import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Button,
  Image
} from 'react-native';
import { Icon } from 'native-base';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { CustomerServiceStackParamList } from '../../../navigation/customer-service';
import Header from '../../home/components/header';
import { TBookedServices, TStore } from '../../../service/redux/store';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
  GetReportedIssues,
} from 'src/service/redux/actions/saga';
import PlayAudioIcon from '../../../assets/svg/play-audio-icon';
import PauseAudioIcon from '../../../assets/svg/pause-audio-icon';
import { ThemeContext } from '../../../styles/theme/theme-context';
import { renderers } from 'react-native-popup-menu';
import * as ImagePicker from 'react-native-image-picker';
import Moment from 'moment';
import { config, yantraRequest } from '../../../service/redux/saga/utils';
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';
import { GetIssueConversation } from 'src/service/redux/actions/saga/report-issue-actions';
type CustomerServiceNavigationProp = StackNavigationProp<
  CustomerServiceStackParamList,
  'ReportedIssueConversation'
>;


interface ReduxState {
  user: TStore['user'],
  issueConversation: TStore["reportIssue"]["issueConversation"],
  GetIssueConversation: (params: GetIssueConversation) => void;
  GetReportedIssues: (params: GetReportedIssues) => void;
}

interface Props extends ReduxState {
  navigation: CustomerServiceNavigationProp;
  route: RouteProp<CustomerServiceStackParamList, 'ReportedIssueConversation'>;
}

type State = {
  playAudio: boolean,
  photo: ImagePicker.ImagePickerResponse[],
};

class ActiveIssuesChat extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      photo: [],
      playAudio: true
    }
  }
  componentDidMount() {
    this.props.GetIssueConversation({
      type: "GetIssueConversation",
      payload: {
        issueId: this.props.route.params.issue.issueId
      }
    })
  }
  cancelAService = (issueId: number) => {
    return new Promise((resolve, reject) => {
      yantraRequest(`${config.yantraBaseUrl}/yantra/cancelissue?issueId=${issueId}`, "GET")
        .then((dataResponse) => {
          if (dataResponse.success) {
            const data = dataResponse.response?.body
            if (data.status === "OK") {
              resolve("success")
            }
            else {
              reject("fail")
            }
          } else reject("fail")
        }).catch((e) => {
          reject("fail")
        });
    });
  }
  render() {
    let Theme = this.context.theme;

    return (
      <View style={{ ...styles.container, backgroundColor: Theme.BACKGROUND }}>
        {/* <StatusBar barStyle="dark-content" /> */}
        <Header
          hideNotification
          hasBackButton
          title={this.props.route.params.screenName}
          backgroundColor={Theme.HEADER_YELLOW}
          onBackClick={() => this.props.navigation.goBack()}
        />
        <ScrollView style={{
          backgroundColor: '#E5E5E5',
          height: '90%',
          marginVertical: 20
        }}>
          <View style={{
            backgroundColor: '#fff',
            padding: 30,
          }}>
            <View style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
            }}>
              <View>
                <Text style={{ fontSize: 18, fontWeight: "700" }} >
                  IR-{this.props.route.params.issue.issueId}
                </Text>
                <Text style={{ fontSize: 16 }} >
                  {Moment(this.props.route.params.issue.createdTime)
                    .format('DD MMM YYYY: h:mm a')
                    .toString()}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  this.cancelAService(this.props.route.params.issue.issueId).then((status) => {
                    if (status === "success") {
                      this.props.GetReportedIssues({
                        type: 'GetReportedIssues',
                        payload: {
                          frameId: this.props.user.defaultBikeId,
                        },
                      });
                    }
                  }).catch((e) => {
                    this.props.GetReportedIssues({
                      type: 'GetReportedIssues',
                      payload: {
                        frameId: this.props.user.defaultBikeId,
                      },
                    });
                  })
                  this.props.navigation.goBack()
                }}
                style={{
                  paddingHorizontal: 26,
                  paddingVertical: 15,
                  backgroundColor: "#3C5BE8",
                  borderRadius: 4,
                  width: 108,
                  display:
                    this.props.route.params.screenName === "Past Issues"
                      ? "none"
                      : undefined
                }}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
            <View style={{
              marginTop: 25
            }}>
              <View>
                <Text style={{
                  fontSize: 18,
                  fontWeight: "700",
                  marginBottom: 14
                }} >
                  {this.props.route.params.issue.categoryName}
                </Text>
                {this.props.issueConversation[0]?.raise_issue
                  .filter((issue) => issue.type === "T")
                  .map((issue) => {
                    return <Text style={{ fontSize: 16 }} >
                      {issue.text}
                    </Text>
                  })}

                {/* attached audio and images below
                  {this.props.issueConversation[0]?.raise_issue
                    .filter((issue) => issue.type === "I")
                    .map((issue) => {
                      return <View style={{
                        marginTop: 20,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between"
                      }}>
                        <TouchableOpacity
                          onPress={() => this.setState({ playAudio: !this.state.playAudio })}
                          style={styles.playButton}>
                          {this.state.playAudio ? <PlayAudioIcon /> : <PauseAudioIcon />}
                          <Text>
                            00:00
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.imageBox}>
                        </TouchableOpacity>
                      </View>
                    })}
                  */}

              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
ActiveIssuesChat.contextType = ThemeContext;

export default connect(
  (store: TStore) => {
    return {
      user: store['user'],
      issueConversation: store["reportIssue"]["issueConversation"],
    };
  },
  (dispatch: Dispatch) => {
    return {
      GetIssueConversation: (params: GetIssueConversation) => dispatch(params),
      GetReportedIssues: (params: GetReportedIssues) => dispatch(params),
    };
  },
)(ActiveIssuesChat);
const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#282C52',
  },
  playButton: {
    width: 96,
    height: 40,
    borderRadius: 24,
    backgroundColor: 'white',
    elevation: 3,
    shadowOpacity: 0.25,
    shadowRadius: 1,
    shadowColor: 'black',
    shadowOffset: { height: 1, width: 1 },
    justifyContent: "space-around",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  imageBox: {
    height: 56,
    width: 56,
    elevation: 3,
    shadowOpacity: 0.25,
    shadowRadius: 1,
    shadowColor: 'black',
    shadowOffset: { height: 1, width: 1 },
    borderWidth: 2,
    borderColor: "#fff",
    backgroundColor: "#C4C4C4"
  },
  cancelText: {
    color: 'white',
    fontSize: 16,
    fontWeight: "500"
  }
});