import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {Footer} from 'native-base';
import {scale} from '../../../../styles/size-matters';
import Colors from '../../../../styles/colors';
import Tab from './tab';
import RNSwipeVerify from './swipe';
import LockButton from './lock-button';

export type TFooterItem = 'home' | 'chart' | 'cycle' | 'menu';

const styles = StyleSheet.create({
  icon: {
    width: scale(18),
    height: scale(18),
  },
});

type Props = {
  lockOnlyVisible: boolean;
  locked: boolean;
  selectedItem: TFooterItem;
  onLockClick?: () => void;
  onItemSelect: (item: TFooterItem) => void;
  onLockVerified: (verified: boolean) => void;
};

type State = {
  selectedItem: TFooterItem;
  verifyMode: boolean;
  lockedIcon: boolean;
};

export default class FooterNav extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedItem: 'home',
      verifyMode: false,
      lockedIcon: false,
    };
  }

  onItemSelect = (item: TFooterItem) => {
    this.setState({
      selectedItem: item,
    });
    this.props.onItemSelect(item);
  };

  onLockClick = () => {
    this.setState({verifyMode: !this.state.verifyMode});
  };

  onVerfied = () => {
    this.setState({
      lockedIcon: !this.state.lockedIcon,
      verifyMode: false,
    });
    this.props.onLockVerified(!this.state.lockedIcon);
  };

  render() {
    return (
      <Footer style={{height: 56}}>
        {!this.state.verifyMode && (
          <Tab
            lockOnlyVisible={this.state.lockedIcon}
            locked={this.state.lockedIcon}
            onItemSelect={this.onItemSelect}
            onLockClick={this.onLockClick}
            selectedItem={this.state.selectedItem}
          />
        )}
        {this.state.verifyMode && (
          <View style={{height: 56, width: '100%'}}>
            <RNSwipeVerify
              buttonSize={56}
              onVerified={this.onVerfied}
              okButton={{visible: false, duration: 0}}
              icon={
                <View style={{height: '100%', width: 80}}>
                  <LockButton
                    disabled={true}
                    locked={this.state.lockedIcon}
                    onClick={() => {}}
                  />
                </View>
              }>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontSize: 18, color: Colors.BLACK}}>
                  {this.state.lockedIcon
                    ? 'Swipe to unlock '
                    : 'Swipe to lock '}
                </Text>
                <Image
                  source={require('../../../../assets/icons/swipe_right_arrow.png')}
                  style={styles.icon}
                />
              </View>
            </RNSwipeVerify>
          </View>
        )}
      </Footer>
    );
  }
}
