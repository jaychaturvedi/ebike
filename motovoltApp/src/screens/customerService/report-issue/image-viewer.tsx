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
import { ThemeContext } from '../../../styles/theme/theme-context';
import * as ImagePicker from 'react-native-image-picker';

import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';
type CustomerServiceNavigationProp = StackNavigationProp<
  CustomerServiceStackParamList,
  'ActiveIssueImages'
>;

interface ReduxState {
}

interface Props extends ReduxState {
  navigation: CustomerServiceNavigationProp;
  route: RouteProp<CustomerServiceStackParamList, 'ActiveIssueImages'>;
}

type State = {
  photo: ImagePicker.ImagePickerResponse[],
};

export default class ImageViewer extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      photo: []
    }
  }

  render() {
    let Theme = this.context.theme;

    return (
        <View style={{ ...styles.container}}>
          <Header
            hideNotification
            hasBackButton
            title="Images"
            backgroundColor={Theme.HEADER_YELLOW}
            onBackClick={() => this.props.navigation.goBack()}
          />

          <ScrollView style={{ backgroundColor: '#fff'}}>
            <View style={{
              justifyContent:"center",
              alignItems: "center",
              marginTop:8,
              padding:2,
            }}>
              {this.props.route.params.photo && (
                this.props.route.params.photo.map((photo) => {
                  return <Image
                    source={{ uri: photo.uri }}
                    style={{ height: 400 , width:"100%", marginTop:8}}
                  />
                })
              )}
            </View>
          </ScrollView>
        </View>
    );
  }
}
ImageViewer.contextType = ThemeContext;
const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff',
  },
});