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
import CameraIcon from '../../../assets/svg/Camera_icon';
import MicIcon from '../../../assets/svg/Mic_icon';
import AttachedImageIcon from '../../../assets/svg/attached-images';
import BlueCrossHair from '../../../assets/svg/blue-cross-hair';
import LanguageSelector from '../../../translations';
import { ThemeContext } from '../../../styles/theme/theme-context';
import { renderers } from 'react-native-popup-menu';
import * as ImagePicker from 'react-native-image-picker';
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {
  TStore,
} from '../../../service/redux/store';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import AttachImage from './components/attach-images';
import {
  GetReportIssueCategory,
  ReportAnIssue,
  GetReportedIssues
} from 'src/service/redux/actions/saga';
type CustomerServiceNavigationProp = StackNavigationProp<
  CustomerServiceStackParamList,
  'NewIssue'
>;

interface ReduxState {
  user: TStore['user'],
  reportAnIssueStatus: TStore["reportIssue"]["reportAnIssueStatus"]
  reportIssueCategory: TStore["reportIssue"]["issueCategory"]
  getReportIssueCategory: (params: GetReportIssueCategory) => void;
  reportAnIssue: (params: ReportAnIssue) => void;
  GetReportedIssues: (params: GetReportedIssues) => void;
}

interface Props extends ReduxState {
  navigation: CustomerServiceNavigationProp;
  route: RouteProp<CustomerServiceStackParamList, 'NewIssue'>;
}

type State = {
  categoryId: number,
  text: string,
  photo: ImagePicker.ImagePickerResponse[],
  isLoggingIn: boolean,
  categoryName: string
};

let AttachedPhotoList: ImagePicker.ImagePickerResponse[] = []


function truncateString(str: string) {
  const n = str.length
  return "img_" + str.substr(n - 8, n);
};
class NewIssue extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      text: "",
      photo: [],
      isLoggingIn: false,
      categoryId: -1,
      categoryName: ""
    }
  }

  componentDidMount() {
    this.props.getReportIssueCategory({
      type: "GetReportIssueCategory",
      payload: {}
    })
  }

  handleDeletePhoto = (fileName: string) => {
    const index = AttachedPhotoList.findIndex(x => x.fileName === fileName);
    AttachedPhotoList.splice(index, 1)
    this.setState({ photo: AttachedPhotoList })
  }

  onChangeText = (text: any) => {
    if (this.state.text.length <= 300)
      this.setState({ text: text })
  }

  handleChoosePhoto = () => {
    ImagePicker.launchImageLibrary({
      mediaType: "photo",
      maxHeight: 300,
      maxWidth: 300,
    }, (response) => {
      if (response.uri && response.fileSize! < 41052) {
        this.setState({ photo: [...this.state.photo, response] });
        AttachedPhotoList.push(response)
      }
    });
  };

  handleIssueSubmit = () => {
    this.props.reportAnIssue({
      type: "ReportAnIssue",
      payload: {
        frameId: this.props.user.defaultBikeId,
        type: "N",
        raiseIssue: [{
          text: this.state.text,
          type: "T"
        }],
        categoryId: this.state.categoryId,
        issueId: 0
      }
    })
    setTimeout(() => {
      this.props.GetReportedIssues({
        type: 'GetReportedIssues',
        payload: {
          frameId: this.props.user.defaultBikeId,
        },
      });
      this.props.navigation.replace("ReportAnIssue", {})
    }, 200)
  }

  handleSelectCategory = (item: { categoryName: string, categoryId: number }) => {
    this.setState({
      categoryId: item.categoryId,
      categoryName: item.categoryName
    })
  }

  render() {
    let Theme = this.context.theme;

    return (
      <View style={{ ...styles.container, backgroundColor: Theme.BACKGROUND }}>
        {/* <StatusBar barStyle="dark-content" /> */}
        <Header
          hideNotification
          hasBackButton
          title="Report an Issue"
          backgroundColor={Theme.HEADER_YELLOW}
          onBackClick={() => this.props.navigation.goBack()}
        />

        <ScrollView keyboardShouldPersistTaps={'handled'}
          style={{ backgroundColor: '#E5E5E5', height: '90%' }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              margin: 20,
              borderBottomColor: 'gray',
            }}>
            <Text
              style={{ fontSize: 15, fontStyle: 'normal', fontWeight: 'bold' }}>
              {this.props.user.name}
            </Text>
            <Text style={{ color: 'gray', fontSize: 13 }}>
              Vechile ID {this.props.user.defaultBikeId}
            </Text>
          </View>
          <View style={{
            display: 'flex',
            flexDirection: "column",
            height: 60,
            padding: 10,
            justifyContent: 'center',
            backgroundColor: "#FFF",
          }}>
            <Menu style={{ width: "100%" }}>
              <MenuTrigger>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: "space-between"
                  }}>
                  <Text style={{
                    marginRight: 8,
                    fontSize: 18
                  }}>
                    {this.state.categoryName.length
                      ? this.state.categoryName
                      : "Choose Category"}
                  </Text>
                  <Icon
                    type="FontAwesome"
                    name="caret-down"
                    style={{ fontSize: 20 }}
                  />
                </View>
              </MenuTrigger>
              <MenuOptions optionsContainerStyle={{
                padding: 20,
                flex: 1,
                marginLeft: 150
              }}>
                {this.props.reportIssueCategory.map((item, index) => (
                  <MenuOption onSelect={() => { this.handleSelectCategory(item) }} key={index}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        opacity: 0.67,
                      }}>
                      {item.categoryName}
                    </Text>
                    {(index !== this.props.reportIssueCategory?.length - 1) &&
                      <View style={{
                        borderWidth: 0.5,
                        width: "100%",
                        borderColor: "rgba(0, 0, 0, 0.1)",
                        marginVertical: 16
                      }} />}
                  </MenuOption>
                ))}
              </MenuOptions>
            </Menu>
          </View>
          <View style={{ backgroundColor: '#FFFFFF', marginTop: 5, padding: 10 }}>
            <Text style={{
              textAlign: "right",
              color: "rgba(0, 0, 0, 0.4)"
            }}>
              {300 - this.state.text.length} characters left
              </Text>
            <TextInput
              style={{
                height: 150,
                textAlignVertical: "top",
                fontSize: 18
              }}
              multiline
              // keyboardType="visible-password"
              maxLength={300}
              numberOfLines={5}
              onChangeText={(text) => this.onChangeText(text)}
              value={this.state.text}
              placeholder="Describe the issue here"
            />
          </View>
          <View
            style={{ borderBottomWidth: 1, opacity: 0.1, }}
          />
          {/* <View
              style={styles.audioContainer}>
              <View>
                <Text
                  style={{
                    fontSize: 18,
                  }}>
                  Record Voice Message
              </Text>
                <Text style={{
                  color: 'gray',
                  fontSize: 12,
                }}>
                  File size limit 1 MB
              </Text>
              </View>
              <TouchableOpacity>
                <MicIcon />
              </TouchableOpacity>
            </View> */}
          {/* <View
              style={styles.attachImage}>
              <View>
                <Text
                  style={{
                    fontSize: 18,
                  }}>
                  Attach Photos
              </Text>
                {!this.state.photo.length
                  && <Text style={{
                    color: 'gray',
                    fontSize: 12,
                  }}>
                    File size limit 1 MB each
                </Text>}
              </View>
              <TouchableOpacity
                onPress={this.handleChoosePhoto}
                style={{ marginRight: -5 }}>
                <CameraIcon />
              </TouchableOpacity>
            </View> */}
          {/* {this.state.photo?.length ? <View style={styles.attachedImages}>
              {
                this.state.photo.map((photo, index) => {
                  return <>
                    <AttachImage
                      photo={photo}
                      onDelete={() => { this.handleDeletePhoto(photo.fileName!) }}
                      key={index} />
                    {(index !== this.state.photo?.length - 1) &&
                      <View style={styles.divider} />}
                  </>
                })
              }
            </View> : null} */}
          <TouchableOpacity
            disabled={this.state.text.length && this.state.categoryId > -1 ? false : true}
            onPress={() => { this.handleIssueSubmit() }}
            style={{
              backgroundColor: (this.state.text.length && this.state.categoryId > -1)
                ? '#142F6A' : "#AFAFAF",
              height: 60,
              width: '50%',
              justifyContent: 'center',
              alignSelf: 'center',
              marginTop: 30,
              borderRadius: 8,
            }}>
            <Text style={{
              color: '#FFFFFF',
              textAlign: 'center',
              fontSize: 20,
            }}>
              Submit
              </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.replace("ReportAnIssue", {})
            }}
            style={{
              justifyContent: 'center',
              alignSelf: 'center',
              marginVertical: 20,
            }}>
            <Text style={{
              color: '#3C5BE8',
              fontSize: 16
            }}>
              Cancel
              </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

NewIssue.contextType = ThemeContext;

export default connect(
  (store: TStore) => {
    return {
      reportIssueCategory: store["reportIssue"]["issueCategory"],
      reportAnIssueStatus: store["reportIssue"]["reportAnIssueStatus"],
      user: store['user'],
    };
  },
  (dispatch: Dispatch) => {
    return {
      getReportIssueCategory: (params: GetReportIssueCategory) => dispatch(params),
      reportAnIssue: (params: ReportAnIssue) => dispatch(params),
      GetReportedIssues: (params: GetReportedIssues) => dispatch(params),
    };
  },
)(NewIssue);

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#282C52',
  },
  attachImage: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginTop: 5,
  },
  divider: {
    borderWidth: 0.5,
    width: "100%",
    borderColor: "rgba(0, 0, 0, 0.1)",
    marginVertical: 16
  },
  audioContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 20
  },
  attachedImages: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#fff",
    padding: 20
  }
});