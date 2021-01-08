import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MenuStackParamList } from '../../navigation/menu';
import { RouteProp } from '@react-navigation/native';
import { ThemeContext } from '../../styles/theme/theme-context';
import LanguageSelector from '../../translations';
import Header from '../home/components/header';
import SmartInspect from "../../assets/svg/smart_inspect";
import { scale, verticalScale, moderateScale } from '../../styles/size-matters';
import Colors from '../../styles/colors';
import CTAButton from '../../components/cta-button';
import { SmartInspectStackParamList } from '../../navigation/smartInspection';

type SmartInspectionNavigationProp = StackNavigationProp<
  SmartInspectStackParamList,
  'SmartInspection'
>;
interface Props {
  navigation: SmartInspectionNavigationProp;
  route: RouteProp<SmartInspectStackParamList, 'SmartInspection'>
}

type State = {
  refreshing?: boolean;
};

class Inspection extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  onPress = () => {
    this.props.navigation.navigate("SmartInspectionInProgress",{})
  };

  render() {
    let Theme = this.context.theme //load theme context

    return (
      <View style={{ ...styles.container, backgroundColor: Theme.BACKGROUND }}>
        <Header
          hasBackButton
          title={LanguageSelector.t("morePremium.smartInspect")}
          backgroundColor={Theme.HEADER_YELLOW}
          onBackClick={() => this.props.navigation.goBack()}
        />
        <View style={styles.body}>
          <View style={styles.centerBody}>
            <SmartInspect height={40} width={65} />
          </View>
          <View style={styles.centerBody}>
            <Text style={{
              ...styles.title, color: Theme.TEXT_WHITE 
            }}>
              {LanguageSelector.t("smartInspection.smartInspect")}
            </Text>
          </View>
          <View style={styles.centerBody}>
            <Text style={{
              ...styles.bodyText, color: Theme.TEXT_WHITE 
            }}>
              {LanguageSelector.t("smartInspection.smartInspectSubTitle")}
            </Text>
          </View>
          <View style={styles.centerBody}>
            <TouchableOpacity
              style={styles.button}
              onPress={this.onPress}
            >
              <Text style={{
                ...styles.buttonText,
                color: Theme.WHITE 
              }}>
              {LanguageSelector.t("smartInspection.beginInspection")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#F0F0F0',
    justifyContent: 'space-between',
  },
  body: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: moderateScale(50)
  },
  button: {
    alignItems: "center",
    backgroundColor: Colors.NAVY_BLUE,
    paddingHorizontal: 5,
    paddingVertical: 10,
    width: "70%",
    margin: 40,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "500"
  },
  centerBody: {
    alignItems: "center",
    padding: 10
  },
  header: {
    height: moderateScale(20),
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.BLACK
  },
  bodyText: {
    fontSize: scale(12),
    color: Colors.TEXT_WHITE,
    textAlign: "center"
  },
});
Inspection.contextType = ThemeContext

export default Inspection;