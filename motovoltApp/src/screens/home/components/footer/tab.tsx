import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { FooterTab } from 'native-base';
import FooterItem from './footer-item';
import LockButton from './lock-button';
import Colors from '../../../../styles/colors';
import { scale } from '../../../../styles/size-matters';

export type TFooterItem = 'home' | 'chart' | 'cycle' | 'menu';

const styles = StyleSheet.create({
  footerTab: { backgroundColor: Colors.WHITE },
  iconSelected: { height: scale(28), width: scale(28) },
  icon: { height: scale(28), width: scale(28), opacity: 0.5 },
});

type Props = {
  lockOnlyVisible: boolean;
  locked: boolean;
  selectedItem: TFooterItem;
  onLockClick: () => void;
  onItemSelect: (item: TFooterItem) => void;
};

export default class Tab extends React.PureComponent<Props, {}> {
  render() {
    return (
      <FooterTab style={styles.footerTab}>
        <FooterItem
          visible={!this.props.lockOnlyVisible}
          icon={
            <Image
              source={require('../../../../assets/icons/home.png')}
              style={
                this.props.selectedItem === 'home'
                  ? styles.iconSelected
                  : styles.icon
              }
            />
          }
          onPress={() => {
            console.log("Home pressed")
            this.props.onItemSelect('home')
          }}
          selected={this.props.selectedItem === 'home'}
        />
        <FooterItem
          visible={!this.props.lockOnlyVisible}
          icon={
            <Image
              source={require('../../../../assets/icons/ride_statistics.png')}
              style={
                this.props.selectedItem === 'chart'
                  ? styles.iconSelected
                  : styles.icon
              }
            />
          }
          onPress={() => {
            console.log("Chart pressed")
            this.props.onItemSelect('chart')
          }}
          selected={this.props.selectedItem === 'chart'}
        />
        <LockButton
          disabled={false}
          locked={this.props.locked}
          onClick={this.props.onLockClick}
        />
        <FooterItem
          visible={!this.props.lockOnlyVisible}
          icon={
            <Image
              source={require('../../../../assets/icons/find_my_cycle.png')}
              style={
                this.props.selectedItem === 'cycle'
                  ? styles.iconSelected
                  : styles.icon
              }
            />
          }
          onPress={() => this.props.onItemSelect('cycle')}
          selected={this.props.selectedItem === 'cycle'}
        />
        <FooterItem
          visible={!this.props.lockOnlyVisible}
          icon={
            <Image
              source={require('../../../../assets/icons/hamburger_menu.png')}
              style={
                this.props.selectedItem === 'menu'
                  ? styles.iconSelected
                  : styles.icon
              }
            />
          }
          onPress={() => this.props.onItemSelect('menu')}
          selected={this.props.selectedItem === 'menu'}
        />
      </FooterTab>
    );
  }
}
