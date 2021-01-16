import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch
} from 'react-native';
import Footer from '../home/components/footer';
import Header from '../home/components/header';
import Colors from '../../styles/colors';
import FontWeight from '../../styles/font-weight';
import { scale, verticalScale } from '../../styles/size-matters';
import DottedButton from '../home/components/add-new-dotted-button';
import ProfileInfoCard from '../home/components/profile-info-card';
import ProfileImage from '../../components/profile';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { MenuStackParamList } from '../../navigation/menu';
import { TStore } from '../../service/redux/store';
import { connect } from 'react-redux';
import LanguageSelector from '../../translations';
import { ThemeContext } from '../../styles/theme/theme-context';
import Moment from "moment";
import { Dispatch } from 'redux';
import * as ProfileActions from "src/service/redux/actions/saga/profile";

type ReduxState = {
  user: TStore['user'];
  bike: TStore['bike'];
  apiEnvironment: TStore['apiEnvironment'];
};

type ProfileNavigationProp = StackNavigationProp<MenuStackParamList, 'Profile'>;

interface Props extends ReduxState {
  navigation: ProfileNavigationProp;
  route: RouteProp<MenuStackParamList, 'Profile'>;
  switchEnvironment: (params: ProfileActions.SwitchEnvironment) => void
}

type State = {};

class Profile extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  toggleSwitch = () =>{ 
    this.props.switchEnvironment({
      type:"SwitchEnvironment",
      payload:{
        production:!this.props.apiEnvironment.production,
        development:!this.props.apiEnvironment.development
      }
    })    
  };
  render() {
    let Theme = this.context.theme; //load theme 
    return (
      <View style={{ ...styles.container, backgroundColor: Theme.BACKGROUND }}>
        <Header
          title={LanguageSelector.t("profile.profile")}
          hasBackButton
          backgroundColor={Theme.HEADER_YELLOW}
          onBackClick={() => this.props.navigation.goBack()}
        />
        <ScrollView style={styles.body}>
          <View style={styles.avatar}>
            <ProfileImage />
          </View>
          <Text style={{ ...styles.title, color: Theme.TEXT_WHITE }}>{LanguageSelector.t("profile.personalDetails")}</Text>
          <ProfileInfoCard
            style={styles.profileInfo}
            data={[{ key: LanguageSelector.t("profile.name"), value: this.props.user.name }]}
          />

          <ProfileInfoCard
            style={styles.profileInfo}
            data={[{ key: LanguageSelector.t("profile.email"), value: this.props.user.email }]}
          />

          {/* <View style={{ ...familyUserStyle.container, ...styles.profileInfo, backgroundColor: Theme.BACKGROUND_LIGHT }}>
            <Text style={{ ...familyUserStyle.title, color: Theme.TEXT_WHITE }}>{LanguageSelector.t("profile.family")}</Text>
            <View style={familyUserStyle.singleInfo}>
              <View style={familyUserStyle.singleInfoLeft}>
                <Image
                  source={{}}
                  defaultSource={require('../../assets/icons/default-avatar.png')}
                  style={familyUserStyle.addNewIcon}
                />
                <Text style={{ color: Theme.TEXT_WHITE }}>
                  <Text style={familyUserStyle.name}>{'      '}Seema</Text>
                  <Text style={familyUserStyle.relation}> (Wife)</Text>
                </Text>
              </View>
            </View>
            <TouchableOpacity style={familyUserStyle.addNewContainer}>
              <Image
                source={require('../../assets/icons/add_new.png')}
                style={familyUserStyle.addNewIcon}
              />
              <Text style={{ ...familyUserStyle.addNewText, color: Theme.TEXT_WHITE }}>{'      '}{LanguageSelector.t("profile.addUser")}</Text>
            </TouchableOpacity>
          </View> */}

          <Text style={{ ...styles.title, color: Theme.TEXT_WHITE }}>{LanguageSelector.t("profile.vehicleDetails")}</Text>

          <ProfileInfoCard
            style={styles.profileInfo}
            hasLeftBorder
            hasTitle
            hasHeader
            title={this.props.bike.name}
            data={[
              { key: LanguageSelector.t("profile.vehicleId"), value: this.props.bike.id },
              { key: LanguageSelector.t("profile.purchaseDate"), value: Moment(this.props.bike.purchaseDate).format("DD-MM-YYYY") },
              { key: LanguageSelector.t("profile.warrantyValidTill"), value: Moment(this.props.bike.warrantyTill).format("DD-MM-YYYY") },
            ]}
          />
          {/* <DottedButton text={LanguageSelector.t("profile.addNewCycle")} onPress={() => { }} /> */}

          <Text style={{ ...styles.title, color: Theme.TEXT_WHITE }}>{LanguageSelector.t("profile.batteryDetails")}</Text>

          <ProfileInfoCard
            style={styles.profileInfo}
            data={[
              {
                key: LanguageSelector.t("profile.batteriesOwned"),
                value: Object.keys(this.props.bike.batteries).length.toString(),
              },
              {
                key: LanguageSelector.t("profile.batteryId"),
                value: Object.keys(this.props.bike.batteries).join(','),
              },
            ]}
          />

          {/* <DottedButton text={LanguageSelector.t("prof20ile.addNewBattery")} onPress={() => { }} /> */}
          {(this.props.user.email.includes("@zelp.io") || this.props.user.email.includes("@connectm.com") )
          && <View style={{ alignItems: "center" }}>
            <Switch
              trackColor={{ false: "#767577", true: "#767577" }}
              thumbColor={this.props.apiEnvironment.development ? Theme.HEADER_YELLOW : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={this.toggleSwitch}
              value={this.props.apiEnvironment.development}
            />
          </View>}
        </ScrollView>
      </View>
    );
  }
}

Profile.contextType = ThemeContext;

export default connect(
  (store: TStore): ReduxState => {
    return {
      user: store['user'],
      bike: store['bike'],
      apiEnvironment: store['apiEnvironment']
    };
  },
  (dispatch: Dispatch) => {
    return {
      switchEnvironment: (params: ProfileActions.SwitchEnvironment) => dispatch(params),
    };
  },
)(Profile);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.BG_GREY,
    height: '100%',
  },
  body: {
    paddingHorizontal: scale(16),
    flex: 1,
  },
  title: {
    marginTop: verticalScale(16),
    fontSize: 12,
    fontWeight: FontWeight.SEMI_BOLD,
    alignItems: 'flex-start',
    width: '100%',
  },
  profileInfo: {
    marginVertical: verticalScale(8),
  },
  avatar: {
    marginVertical: verticalScale(12),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const familyUserStyle = StyleSheet.create({
  container: {
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(8),
    width: '100%',
    borderRadius: scale(6),
    backgroundColor: Colors.WHITE,
  },
  title: {
    marginBottom: verticalScale(8),
    fontSize: 16,
    fontWeight: FontWeight.BOLD,
    color: Colors.DARK_BLACK,
  },
  singleInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: verticalScale(8),
  },
  singleInfoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 14,
    fontWeight: FontWeight.SEMI_BOLD,
    // color: Colors.DARK_BLACK,
  },
  relation: {
    fontSize: 14,
    fontWeight: FontWeight.REGULAR,
    // color: Colors.BORDER_GREY,
  },
  delete: {},
  addNewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(8),
  },
  addNewText: {
    fontSize: 14,
    color: Colors.BLACK,
  },
  addNewIcon: {
    width: 24,
    height: 24,
  },
});
