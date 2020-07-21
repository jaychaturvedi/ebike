import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Footer from '../home/components/footer';
import Header from '../home/components/header';
import Colors from '../../styles/colors';
import FontWeight from '../../styles/font-weight';
import {scale, verticalScale} from '../../styles/size-matters';
import DottedButton from '../home/components/add-new-dotted-button';
import ProfileInfoCard from '../home/components/profile-info-card';
import ProfileImage from '../../components/profile';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {MenuStackParamList} from '../../navigation/menu';
import {TStore} from '../../service/redux/store';
import {connect} from 'react-redux';

type ReduxState = {
  user: TStore['user'];
  bike: TStore['bike'];
};

type ProfileNavigationProp = StackNavigationProp<MenuStackParamList, 'Profile'>;

interface Props extends ReduxState {
  navigation: ProfileNavigationProp;
  route: RouteProp<MenuStackParamList, 'Profile'>;
}

type State = {};

class Profile extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          title="Profile"
          hasBackButton
          backgroundColor={Colors.HEADER_YELLOW}
          onBackClick={() => this.props.navigation.goBack()}
        />
        <ScrollView style={styles.body}>
          <View style={styles.avatar}>
            <ProfileImage />
          </View>
          <Text style={styles.title}>Personal Details</Text>
          <ProfileInfoCard
            style={styles.profileInfo}
            data={[{key: 'Name', value: this.props.user.name}]}
          />

          <ProfileInfoCard
            style={styles.profileInfo}
            data={[{key: 'Email', value: this.props.user.email}]}
          />

          <View style={{...familyUserStyle.container, ...styles.profileInfo}}>
            <Text style={familyUserStyle.title}>Family Users</Text>
            <View style={familyUserStyle.singleInfo}>
              <View style={familyUserStyle.singleInfoLeft}>
                <Image
                  source={{}}
                  defaultSource={require('../../assets/icons/default-avatar.png')}
                  style={familyUserStyle.addNewIcon}
                />
                <Text>
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
              <Text style={familyUserStyle.addNewText}>{'      '}Add User</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>Vehicle Details</Text>

          <ProfileInfoCard
            style={styles.profileInfo}
            hasLeftBorder
            hasTitle
            hasHeader
            title={this.props.bike.name}
            data={[
              {key: 'Vehicle ID', value: this.props.bike.id},
              {key: 'Purchase Date', value: this.props.bike.purchaseDate},
              {key: 'Warranty Valid till', value: this.props.bike.warrantyTill},
            ]}
          />
          <DottedButton text={'Add New Cycle'} onPress={() => {}} />

          <Text style={styles.title}>Battery Details</Text>

          <ProfileInfoCard
            style={styles.profileInfo}
            data={[
              {
                key: 'Batteries Owned',
                value: Object.keys(this.props.bike.batteries).length.toString(),
              },
              {
                key: 'Battery ID',
                value: Object.keys(this.props.bike.batteries).join(','),
              },
            ]}
          />

          <DottedButton text={'Add New Battery'} onPress={() => {}} />
        </ScrollView>
      </View>
    );
  }
}

export default connect(
  (store: TStore): ReduxState => {
    return {
      user: store['user'],
      bike: store['bike'],
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
    color: Colors.DARK_BLACK,
  },
  relation: {
    fontSize: 14,
    fontWeight: FontWeight.REGULAR,
    color: Colors.BORDER_GREY,
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
