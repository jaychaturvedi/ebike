import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {moderateScale, scale} from 'react-native-size-matters';
import {ThemeContext} from '../styles/theme/theme-context';
import ToolTipIcon from '../assets/svg/tool_tip_icon';

type Props = {
  header: string;
  tip: string;
};
type State = {};

export default class TipCard extends React.PureComponent<Props, State> {
  render() {
    let Theme = this.context.theme; //load theme context
    return (
      <View
        style={{...styles.container, backgroundColor: Theme.BACKGROUND_LIGHT}}>
        <View style={styles.toolTip}>
          <ToolTipIcon />
        </View>
        <View style={styles.tip}>
          <View style={styles.tipHeader}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: scale(14),
                color: Theme.TEXT_WHITE,
              }}>
              {this.props.header}
            </Text>
          </View>
          <View style={styles.tipContent}>
            <Text numberOfLines={3} style={{color: Theme.TEXT_WHITE}}>
              {this.props.tip}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

TipCard.contextType = ThemeContext;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    borderRadius: moderateScale(10),
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: moderateScale(10),
  },
  toolTip: {
    width: '10%',
    alignItems: 'center',
  },
  tip: {
    width: '90%',
    marginLeft: moderateScale(10),
  },
  tipHeader: {
    // height: '20%',
  },
  tipContent: {
    height: '80%',
    marginTop: moderateScale(10),
  },
});
