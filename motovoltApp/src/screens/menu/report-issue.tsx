import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import ProfileInfoCard from '../home/components/profile-info-card';
import Button from '../../components/cta-button';
import { Textarea } from 'native-base';
import Header from '../home/components/header';
import Colors from '../../styles/colors';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { MenuStackParamList } from '../../navigation/menu';
import { TStore } from '../../service/redux/store';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ReportIssue as Report } from '../../service/redux/actions/saga/service-actions';
import ThumbsUp from '../../components/thumb-up';
import { Store_ResetReportIssue } from 'src/service/redux/actions/store';

type ReportISsueNavigationProp = StackNavigationProp<
  MenuStackParamList,
  'ReportIssue'
>;

interface ReduxState {
  bike: TStore['bike'],
  user: TStore['user'],
  reportIssue: (params: Report) => void,
  resetReportIssue: (params: Store_ResetReportIssue) => void
}

interface Props extends ReduxState {
  navigation: ReportISsueNavigationProp,
  route: RouteProp<MenuStackParamList, 'ReportIssue'>
};

type State = {
  description: string;
};

class ReportIssue extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      description: '',
    };
  }

  render() {
    return this.props.bike.reportIssueSuccess === true ? (
      <ThumbsUp
        msg="Success"
        buttonText="CONTINUE"
        subMsg="We have received your feedback and will help you with it soon."
        onButtonPress={() => {
          this.props.resetReportIssue({ type: 'Store_ResetReportIssue', payload: {} })
          this.props.navigation.navigate('SupportService', {});
        }}
      />
    ) : (
        <View style={styles.container}>
          <Header
            hasBackButton
            title={'Report an issue'}
            hasTabs
            backgroundColor={Colors.HEADER_YELLOW}
            onBackClick={() => this.props.navigation.goBack()}
          />
          <View style={{ flex: 1 }}>
            <View style={{ padding: moderateScale(15) }}>
              <View style={styles.header}>
                <ProfileInfoCard
                  style={styles.profileInfo}
                  data={[{ key: this.props.bike.name, value: '' }]}
                />
              </View>
              <View style={styles.info}>
                <View style={styles.tile}>
                  <Text style={{ fontSize: moderateScale(13) }}>Model</Text>
                  <Text
                    style={{
                      fontSize: moderateScale(16),
                      fontWeight: 'bold',
                      lineHeight: moderateScale(40),
                    }}>
                    {this.props.bike.modal}
                  </Text>
                </View>
                <View style={styles.tile}>
                  <Text style={{ fontSize: moderateScale(13) }}>Vehicle ID</Text>
                  <Text
                    style={{
                      fontSize: moderateScale(16),
                      fontWeight: 'bold',
                      lineHeight: moderateScale(40),
                    }}>
                    {this.props.user.defaultBikeId}
                  </Text>
                </View>
              </View>
              <View style={styles.textInput}>
                <Text style={{ fontSize: moderateScale(14), fontWeight: 'bold' }}>
                  Comments
            </Text>
                <Textarea
                  underline
                  rowSpan={7}
                  bordered
                  placeholder="Please describe your concern ... "
                  style={styles.textArea}
                  onChangeText={(text: string) =>
                    this.setState({ description: text })
                  }
                />
              </View>
            </View>
            <View style={styles.button}>
              <Button
                text="SUBMIT"
                onPress={() => this.props.reportIssue({
                  type: 'ReportIssue',
                  payload: {
                    bikeId: this.props.user.defaultBikeId,
                    bikeName: this.props.bike.name,
                    comments: this.state.description,
                    model: this.props.bike.modal
                  }
                })}
                textColor="white"
                backgroundColor="#142F6A"
              />
            </View>
          </View>
        </View>
      );
  }
}

export default connect(
  (store: TStore) => {
    return {
      bike: store['bike'],
      user: store['user']
    };
  },
  (dispatch: Dispatch) => {
    return {
      reportIssue: (params: Report) => dispatch(params),
      resetReportIssue: (params: Store_ResetReportIssue) => dispatch(params)
    };
  },
)(ReportIssue);

const styles = StyleSheet.create({
  container: {
    height: '100%',
    // flex: 1,
    width: '100%',
    backgroundColor: '#F0F0F0',
  },
  header: {
    height: moderateScale(100),
    justifyContent: 'center',
  },
  profileInfo: {
    marginVertical: verticalScale(8),
  },
  tile: {
    height: moderateScale(75),
    width: moderateScale(163),
    borderRadius: moderateScale(15),
    backgroundColor: 'white',
    padding: moderateScale(15),
  },
  info: {
    height: moderateScale(100),
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  textInput: {
    height: moderateScale(200),
  },
  textArea: {
    borderRadius: moderateScale(15),
    backgroundColor: 'white',
    borderColor: 'white',
    marginTop: moderateScale(20),
  },
  button: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: moderateScale(20)
  },
});
