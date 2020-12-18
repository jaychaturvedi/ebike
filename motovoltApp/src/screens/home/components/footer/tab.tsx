import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {FooterTab, Icon} from 'native-base';
import FooterItem from './footer-item';
import LockButton from './lock-button';
import Colors from '../../../../styles/colors';
import {scale} from '../../../../styles/size-matters';
import {ThemeContext} from '../../../../styles/theme/theme-context';

export type TFooterItem = 'home' | 'chart' | 'cycle' | 'menu';

const styles = StyleSheet.create({
  footerTab: {backgroundColor: Colors.WHITE},
  iconSelected: {height: scale(28), width: scale(28)},
  icon: {height: scale(28), width: scale(28), opacity: 0.5},
});

type Props = {
  charging: boolean;
  chargePercentage: number;
  lockOnlyVisible: boolean;
  // locked: boolean;
  riding: boolean;
  selectedItem: TFooterItem;
  onLockClick: () => void;
  onChargeClick: () => void;
  onItemSelect: (item: TFooterItem) => void;
};

export default class Tab extends React.PureComponent<Props, {}> {
  render() {
    let Theme = this.context.theme; //load theme
    return (
      <FooterTab style={{...styles.footerTab}}>
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
            console.log('Home pressed');
            this.props.onItemSelect('home');
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
            console.log('Chart pressed');
            this.props.onItemSelect('chart');
          }}
          selected={this.props.selectedItem === 'chart'}
        />
        <LockButton
          onChargeClick={this.props.onChargeClick}
          charging={this.props.charging}
          chargePercentage={this.props.chargePercentage}
          disabled={false}
          riding={this.props.riding}
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
          // icon={
          //   <Icon type="MaterialIcons" name="motorcycle" />
          // }
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

Tab.contextType = ThemeContext;
