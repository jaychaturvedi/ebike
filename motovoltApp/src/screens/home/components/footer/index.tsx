import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {Button, Footer, FooterTab, Icon} from 'native-base';
import FooterItem from './footer-item';
import {scale} from '../../../../styles/size-matters';
import Colors from '../../../../styles/colors';

export type TFooterItem = 'home' | 'chart' | 'cycle' | 'menu';

type Props = {
  lockOnlyVisible: boolean;
  locked: boolean;
  selectedItem: TFooterItem;
  onLockClick: () => void;
  onItemSelect: (item: TFooterItem) => void;
};

export default class FooterNav extends React.PureComponent<Props, {}> {
  render() {
    return (
      <Footer>
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
            onPress={() => this.props.onItemSelect('home')}
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
            onPress={() => this.props.onItemSelect('chart')}
            selected={this.props.selectedItem === 'chart'}
          />
          <Button style={styles.lock} onPress={() => this.props.onLockClick()}>
            {this.props.locked && (
              <Image
                source={require('../../../../assets/icons/lock_icon.png')}
                style={{height: '100%', width: '100%'}}
              />
            )}
            {!this.props.locked && (
              <Image
                source={require('../../../../assets/icons/unlock_icon.png')}
                style={{height: '100%', width: '100%'}}
              />
            )}
          </Button>
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
      </Footer>
    );
  }
}

const styles = StyleSheet.create({
  footerTab: {backgroundColor: Colors.WHITE},
  lock: {backgroundColor: Colors.LOCK_PINK, borderRadius: 10},
  lockIcon: {fontSize: scale(40), color: Colors.WHITE},
  iconSelected: {height: scale(28), width: scale(28)},
  icon: {height: scale(28), width: scale(28), opacity: 0.5},
});
