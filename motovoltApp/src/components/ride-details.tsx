import React from 'react';
import {StyleSheet, Image, View, Text} from 'react-native';
import {Content, Icon} from 'native-base';
import ProgressBar from './progress-bar';
// import { scale, verticalScale, moderateScale } from './size'
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import Moment from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LanguageSelector from '../translations';
import {ThemeContext} from '../styles/theme/theme-context';
import SunIcon from '../assets/svg/Sun_icon';
import MoonIcon from '../assets/svg/Moon_icon';
import TotalDistanceIcon from '../assets/svg/total_distance_icon';
import AvgSpeedIcon from '../assets/svg/Avg_speed';
import StarIcon from '../assets/svg/star_icon';
import SouceDestinationIcon from '../assets/svg/source_to_destination_arrow';
import RideDurationIcon from '../assets/svg/ride_duration';
import StartTimeIcon from '../assets/svg/start_time';
import EndTimeIcon from '../assets/svg/end_time';
import { Colors } from 'react-native/Libraries/NewAppScreen';


type Props = {
  fromTime: string;
  toTime: string;
  fromAddress: string;
  toAddress: string;
  progress: {
    powerMode: number;
    pedalAssistMode: number;
    ecoMode: number;
  };
  distance: string;
  speed: string;
  rating: string;
  onItemSelect: () => void;
};
type State = {
  isMorning: boolean;
  duration:string
};

const beforeTime = Moment('06:00:00', 'HH:mm A');
const afterTime = Moment('18:00:00', 'HH:mm A');

export default class RideCard extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isMorning: Moment(this.props.fromTime, 'HH:mm A').isBetween(
        beforeTime,
        afterTime,
      ),
      duration:Moment(this.props.toTime).diff(Moment(this.props.fromTime),"minutes").toString()
    };
  }

  render() {
    let Theme = this.context.theme; //load theme context
    return (
      //Make the below view as touchable opacity if the whole card is touchable
      <TouchableOpacity
        style={{ ...styles.container, backgroundColor: Theme.BACKGROUND_LIGHT }}
        onPress={() => this.props.onItemSelect()}>
        <View style={{ flexDirection: "row", }}>
          <View style={styles.leftContainer}>
            <View style={{ flexDirection: 'row', height: moderateScale(60) }}>
              <View style={{ height: '100%' }}>
                <StartTimeIcon height={20} width={20} />
              </View>
              <View style={{ flexDirection: "column" }}>
                <Text style={{
                  ...styles.headerText,
                  color: Theme.TEXT_GREY
                }}>
                  {' '}
                  {LanguageSelector.t('myRides.startTime')}
                  {' '}
                  <Text style={{ fontWeight: "bold" }}>
                    {Moment(this.props.fromTime).format('HH:mm A')}
                  </Text>
                </Text>
                <Text
                  style={{ ...styles.destinationText, color: Theme.TEXT_GREY }}
                  numberOfLines={1}>
                  &nbsp;&nbsp;{this.props.fromAddress}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', height: moderateScale(60) }}>
              <EndTimeIcon height={20} width={20} />
              <View style={{ flexDirection: "column" }}>
                <Text style={{
                  ...styles.headerText,
                  color: Theme.TEXT_GREY,
                  fontSize: scale(12)
                }}>
                  {' '}
                  {LanguageSelector.t('myRides.endTime')}
                  {' '}
                  <Text style={{ fontWeight: "bold" }}>
                    {Moment(this.props.toTime).format('HH:mm A')}
                  </Text>
                </Text>
                <Text
                  style={{
                    ...styles.destinationText,
                    color: Theme.TEXT_WHITE
                  }}
                  numberOfLines={1}>
                  &nbsp;&nbsp;{this.props.toAddress}
                </Text>
              </View>
            </View>

          </View>
          <View style={styles.rightContainer}>
            <View style={styles.rightArrow}>
              <Icon
                type="FontAwesome"
                name="chevron-right"
                style={styles.detailsIcon}></Icon>
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.progressBar}>
            <ProgressBar progress={this.props.progress} />
            <View style={{ flexDirection: 'row', justifyContent: "center" }}>
              <Icon
                type="FontAwesome"
                name="circle"
                style={{ color: '#5372FF', ...styles.modesIcon }}>
                <Text style={styles.modeText}>
                  &nbsp;{this.props.progress.ecoMode}{"%"} ECO
                  </Text>
              </Icon>
              <Icon
                type="FontAwesome"
                name="circle"
                style={{ color: '#FF6753', ...styles.modesIcon }}>
                <Text style={styles.modeText}>
                  &nbsp;{this.props.progress.powerMode}{"%"} PWR
                  </Text>
              </Icon>
              <Icon type="FontAwesome" name="circle"
                style={{ color: '#39BC85', ...styles.modesIcon }}>
                <Text style={styles.modeText}>
                  &nbsp;{this.props.progress.pedalAssistMode}{"%"} PED
                  </Text>
              </Icon>
            </View>
          </View>
          <View style={styles.footerGroup}>
            <View style={{ flexDirection: 'row' }}>
              <TotalDistanceIcon width={20} height={20} />
              <Text
                style={{
                  fontSize: scale(12),
                  color: Theme.TEXT_WHITE,
                  textAlignVertical: 'top',
                  fontWeight: "bold"
                }}>
                &nbsp;{this.props.distance} KM
                  </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <RideDurationIcon width={20} height={20} />
              <Text style={{
                fontSize: scale(12),
                color: Theme.TEXT_WHITE,
                textAlignVertical: 'top',
                fontWeight: "bold"
              }}>
                &nbsp;{this.state.duration} Mins
                  </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <AvgSpeedIcon width={20} height={20} />
              <Text style={{
                fontSize: scale(12),
                color: Theme.TEXT_WHITE,
                fontWeight: "bold"
              }}>
                &nbsp;{this.props.speed} Kmph
                  </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

RideCard.contextType = ThemeContext;

const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(10),
    marginBottom: verticalScale(10),
    backgroundColor: 'white',
    height: moderateScale(230),
    borderRadius: 10,
    // flexDirection: 'row',
    shadowOpacity: 0.25,
    shadowRadius: 1,
    shadowColor: 'black',
    shadowOffset: {height: 1, width: 1},
    elevation: 3,
  },
  headerText: {
    fontSize: moderateScale(12),
    paddingBottom: moderateScale(5),
    justifyContent: 'center',
  },
  icon: {
    fontSize: moderateScale(15),
    color: '#829df5',
  },
  destinationText: {
    fontSize: 13,
  },
  modeText: {
    fontSize: scale(8),
    // paddingBottom: moderateScale(5),
    color: "black",
    textAlignVertical: 'top',
  },
  footer: {
    marginTop: verticalScale(0),
    height: "40%",
  },
  footerGroup: {
    marginTop: verticalScale(10),
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  leftContainer: {
    width: '90%',
    height:"100%",
    paddingHorizontal: moderateScale(20),
    paddingTop:moderateScale(20)
  },
  rightContainer: {
    width: '10%',
    height:"100%",
    alignItems: 'center',
  },
  rightArrow: {
    top: '50%',
  },
  detailsIcon: {
    fontSize: moderateScale(20),
    color: 'rgba(0, 0, 0, 0.6)',
  },
  progressBar:{ 
    height:"50%",
    justifyContent: 'center',
    paddingHorizontal:20,
    borderColor:"rgba(0, 0, 0, 0.1)",
    borderTopWidth:0.5,
    borderBottomWidth:0.5,
    backgroundColor:"#E5E5E5",
    alignItems:"center"
  },
  modesIcon:{
    fontSize: 8, 
    margin: 5 
  }
});
