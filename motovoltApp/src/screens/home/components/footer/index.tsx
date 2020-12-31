import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {Footer} from 'native-base';
import {scale} from '../../../../styles/size-matters';
import Colors from '../../../../styles/colors';
import Tab from './tab';
import RNSwipeVerify from './swipe';
import LockButton from './lock-button';
import LanguageSelector from '../../../../translations';

export type TFooterItem = 'home' | 'chart' | 'cycle' | 'menu';

const styles = StyleSheet.create({
  icon: {
    width: scale(18),
    height: scale(18),
  },
});

type Props = {
  lockOnlyVisible: boolean;
  // locked: boolean;
  riding: boolean;
  selectedItem: TFooterItem;
  charging: boolean;
  chargePercentage: number;
  onLockClick: () => void;
  onChargeClick: () => void;
  onItemSelect: (item: TFooterItem) => void;
  // onLockVerified: (verified: boolean) => void;
};

type State = {
  // selectedItem: TFooterItem;
  // verifyMode: boolean;
  lockedIcon: boolean;
  // rideId: string;
};

export default class FooterNav extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      // selectedItem: 'home',
      // verifyMode: false,
      lockedIcon: false,
      // rideId: '',
    };
  }

  onItemSelect = (item: TFooterItem) => {
    // this.setState({
    //   selectedItem: item,
    // });
    this.props.onItemSelect(item);
  };

  onLockClick = () => {
    this.props.onLockClick();
    console.log('Lock clicked');
  };

  onVerfied = () => {
    this.setState({
      lockedIcon: !this.state.lockedIcon,
    });
  };

  // static getDerivedStateFromProps(props: Props, state: State) {
  //   // if (props.charging && state.verifyMode) {
  //   //   state.verifyMode = false;
  //   // }
  //   return state;
  // }

  render() {
    return (
      <Footer style={{height: 64}}>
        {/* {!this.state.verifyMode && ( */}
        <Tab
          charging={this.props.charging}
          chargePercentage={this.props.chargePercentage}
          lockOnlyVisible={this.props.riding}
          riding={this.props.riding}
          onItemSelect={this.onItemSelect}
          onLockClick={this.onLockClick}
          onChargeClick={this.props.onChargeClick}
          selectedItem={this.props.selectedItem}
        />
        {/* )} */}
        {/* {this.state.verifyMode && (
          <View style={{height: 64, width: '100%'}}>
            <RNSwipeVerify
              buttonSize={64}
              onVerified={this.onVerfied}
              okButton={{visible: false, duration: 0}}
              icon={
                <View style={{height: '100%', width: 80}}>
                  <LockButton
                    onChargeClick={() => {}}
                    charging={false}
                    chargePercentage={0}
                    disabled={true}
                    locked={this.state.lockedIcon}
                    onClick={() => {}}
                  />
                </View>
              }>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontSize: 18, color: Colors.BLACK}}>
                  {this.state.lockedIcon
                    ? LanguageSelector.t('home.swipeToUnlock')
                    : LanguageSelector.t('home.swipeToLock')}
                </Text>
                <Image
                  source={require('../../../../assets/icons/swipe_right_arrow.png')}
                  style={styles.icon}
                />
              </View>
            </RNSwipeVerify>
          </View>
        )} */}
      </Footer>
    );
  }
}
