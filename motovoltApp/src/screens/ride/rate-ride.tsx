import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  GestureResponderEvent,
  Modal,
} from 'react-native';
import Button from '../../components/cta-button';
import Rating from '../../components/rating';
import {moderateScale} from 'react-native-size-matters';
import RideMetric from '../../components/ride-metric';
import {TStore} from '../../service/redux/store';
import {connect} from 'react-redux';
import Feedback from './feedback';
import ThumbsUp from '../../components/thumb-up';
import {SubmitRide} from 'src/service/redux/actions/saga';
import {Dispatch} from 'redux';
import Map from '../../components/map';
import LanguageSelector from '../../translations';
import {ThemeContext} from '../../styles/theme/theme-context';
import {ScrollView, TouchableHighlight} from 'react-native-gesture-handler';
import TotalDistanceIcon from '../../assets/svg/total_distance_icon';
import ChargeTimeIcon from '../../assets/svg/charge_time_remaining';
import AvgSpeedIcon from '../../assets/svg/Avg_speed';
import MaxSpeedIcon from '../../assets/svg/Max_speed';
import GreenMilesIcon from '../../assets/svg/green_miles_icon';
import PetrolSavingsIcon from '../../assets/svg/petrol_savings_icon';
import INRIcon from '../../assets/svg/inr_icon';
import StarIcon from '../../assets/svg/star_icon';
import CaloriesIcon from '../../assets/svg/calories_icon_blue';

type ReduxState = {
  ride: TStore['ride'];
  user: TStore['user'];
};

interface Props extends ReduxState {
  onComplete: () => void;
  submitRide: (params: SubmitRide) => void;
}

type State = {
  rating: number;
  problem: string;
  description: string;
  showFeedback: boolean;
  showThumpUp: boolean;
};

class RateRide extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      rating: 0,
      description: '',
      problem: '',
      showFeedback: false,
      showThumpUp: false,
    };
  }

  render() {
    let Theme = this.context.theme; //load theme in class
    if (this.state.showThumpUp) {
      return (
        <ThumbsUp
          msg={LanguageSelector.t('feedback.thankYou')}
          subMsg={LanguageSelector.t('feedback.confirmationSubTitle')}
        />
      );
    }
    return (
      <ScrollView
        style={{
          ...styles.container,
          backgroundColor: Theme.BACKGROUND, //change dark theme
        }}>
        <View style={styles.map}>
          {this.props.ride.path.length === 0 ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
              }}>
              <Text>{LanguageSelector.t('gps.noDataAvailable')}</Text>
            </View>
          ) : (
            <Map
              location={this.props.ride.path.map((point) => {
                return {
                  latitude: point.lat,
                  longitude: point.long,
                };
              })}
            />
          )}
        </View>
        <View style={styles.usageDetails}>
          <RideMetric
            header1={LanguageSelector.t('rateYourRide.distance')}
            header2={LanguageSelector.t('rateYourRide.duration')}
            icon1={TotalDistanceIcon}
            icon2={ChargeTimeIcon}
            value1={Math.round(
              Number(this.props.ride.totalDistanceKm),
            ).toString()}
            value2={this.props.ride.durationSec.toString()}
            unit1="Km"
            unit2=""
          />
          <RideMetric
            header1={LanguageSelector.t('rateYourRide.avgSpeed')}
            header2={LanguageSelector.t('rateYourRide.maxSpeed')}
            icon1={AvgSpeedIcon}
            icon2={MaxSpeedIcon}
            value1={Math.round(Number(this.props.ride.avgSpeedKmph)).toString()}
            value2={Math.round(Number(this.props.ride.maxSpeedKmph)).toString()}
            unit1="Kmph"
            unit2="Kmph"
          />
          <RideMetric
            header1={LanguageSelector.t('rateYourRide.greenMiles')}
            header2={LanguageSelector.t('rateYourRide.caloriesBurnt')}
            icon1={GreenMilesIcon}
            icon2={CaloriesIcon}
            value1={Math.round(Number(this.props.ride.greenMilesKm)).toString()}
            value2={Math.round(
              Number(this.props.ride.caloriesBurnt),
            ).toString()}
            unit1="Km"
            unit2=""
          />
          <RideMetric
            header1={LanguageSelector.t('rateYourRide.petrolSavings')}
            header2={LanguageSelector.t('rateYourRide.petrolSavings')}
            icon1={INRIcon}
            icon2={PetrolSavingsIcon}
            value1={Math.round(
              Number(this.props.ride.petrolSavingsInr),
            ).toString()}
            value2={Math.round(
              Number(this.props.ride.petrolSavingsLtr),
            ).toString()}
            unit1="INR"
            unit2="L"
          />
        </View>
        <View style={styles.rating}>
          <View>
            <Text
              style={{
                textAlign: 'center',
                fontSize: moderateScale(16),
                color: Theme.TEXT_WHITE,
              }}>
              {LanguageSelector.t('rateYourRide.rateYourRide')}
            </Text>
          </View>
          <View>
            <Rating
              defaultRating={0}
              maxRating={5}
              ratingCompleted={(rating: number) => {
                this.setState({
                  rating,
                  showFeedback: false,
                });
              }}
            />
          </View>
        </View>
        <View style={styles.button}>
          <Button
            fullWidth
            // textColor={this.state.rating < 4 ? '#333333' : "white"}
            textColor={'white'}
            text={LanguageSelector.t('rateYourRide.submit')}
            // backgroundColor={this.state.rating < 4 ? '#B7B7B7' : '#142F6A'}
            backgroundColor={'#142F6A'}
            onPress={() => {
              if (this.state.rating < 4) {
                this.setState({showFeedback: true});
              } else {
                this.props.submitRide({
                  type: 'SubmitRide',
                  payload: {
                    bikeId: this.props.user.defaultBikeId,
                    rideId: this.props.ride.id,
                    comment: this.state.description,
                    rating: this.state.rating,
                    reason: [this.state.problem],
                  },
                });
                setTimeout(() => {
                  this.props.onComplete();
                }, 1000);
                this.setState({showThumpUp: true});
              }
            }}
          />
        </View>
        <Modal transparent visible={this.state.showFeedback}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Feedback
                onClose={() => this.setState({showFeedback: false})}
                onFeedback={(problem, description) => {
                  setTimeout(() => {
                    this.props.onComplete();
                  }, 1000);
                  this.setState({
                    problem: problem,
                    description: description,
                    showFeedback: false,
                    showThumpUp: true,
                  });
                }}
                showFeedback={this.state.showFeedback}
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  }
}
RateRide.contextType = ThemeContext;

export default connect(
  (store: TStore) => {
    return {
      ride: store['ride'],
      user: store['user'],
    };
  },
  (dispatch: Dispatch) => {
    return {
      submitRide: (params: SubmitRide) => dispatch(params),
    };
  },
)(RateRide);

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#F0F0F0',
  },
  map: {
    height: moderateScale(200),
    width: '100%',
    backgroundColor: 'white',
  },
  usageDetails: {
    // height: moderateScale(350),
    padding: moderateScale(20),
  },
  rating: {
    flex: 2,
    height: moderateScale(100),
    justifyContent: 'flex-end',
  },
  button: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(32),
  },
  centeredView: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    padding: moderateScale(20),
    backgroundColor: 'rgba(100,100,100,0.5)',
    // opacity: 0.5,
    borderRadius: 10,
    alignItems: 'center',
    // height: moderateScale(500),
    height: '100%',
    shadowColor: '#000',
    width: '100%',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
});
