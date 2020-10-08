import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Button from '../../components/cta-button';
import CheckBox from '../../components/checkbox';
import { Textarea } from 'native-base';
import LanguageSelector from '../../translations';
import { ThemeContext } from '../../styles/theme/theme-context'

type Props = {
  showFeedback: boolean;
  onFeedback: (problem: string, description: string) => void;
};

type State = {
  checkboxValue: string;
  description: string;
};

export default class RideFeedback extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      checkboxValue: '',
      description: '',
    };
  }

  render() {
    let Theme = this.context.theme; //load theme in class
    return (
      <View style={styles.container}>
        <View style={styles.reviews}>
          <View style={{ ...styles.model, backgroundColor: Theme.BACKGROUND }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: moderateScale(16),
                paddingBottom: moderateScale(10),
                color: Theme.TEXT_WHITE //change dark theme
              }}>
              {LanguageSelector.t("feedback.whatWentWrong")}
            </Text>
            <CheckBox
              option1="Battery Issue"
              option2="Low Pick Up"
              option3="Break Failure"
              option4="Other"
              returnValue={(value: string) => {
                this.setState({ checkboxValue: value });
              }}
            />
            <View style={{ paddingTop: moderateScale(20) }}>
              <Textarea
                underline
                rowSpan={4}
                bordered
                placeholder={LanguageSelector.t("feedback.placeholder")}
                style={{
                  borderRadius: moderateScale(10),
                  backgroundColor: '#F8F8FC',
                  borderColor: '#F8F8FC',
                }}
                onChangeText={(text: string) => {
                  this.setState({ description: text });
                }}
              />
            </View>
            <View style={styles.button}>
              <Button
                fullWidth
                textColor={this.state.description && this.state.checkboxValue ? 'white' : '#333333'}
                // textColor={'white'}
                text={LanguageSelector.t("rateYourRide.submit")}
                backgroundColor={this.state.description && this.state.checkboxValue ? '#142F6A' : '#B7B7B7'}
                // backgroundColor={'#B7B7B7'}
                onPress={() => {
                  // if (!this.props.submitDisabled) {
                  //   console.log('Submitted');
                  //   this.props.onSubmit();
                  // }
                  this.props.onFeedback(this.state.checkboxValue, this.state.description);
                }}
              />
            </View>
          </View>
        </View>

      </View>
    );
  }
}

RideFeedback.contextType = ThemeContext

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  reviews: {
    height: '100%',
    position: 'relative',
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: verticalScale(16),
  },
  model: {
    // backgroundColor: 'white',
    paddingVertical: moderateScale(20),
    paddingHorizontal: moderateScale(10),
    height: '100%',
    width: '100%',
    marginVertical: moderateScale(16),
    borderRadius: moderateScale(10),
  },
  button: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    // paddingVertical: moderateScale(20),
    // paddingHorizontal: moderateScale(10),
  },
});
