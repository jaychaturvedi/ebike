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
import SmartInspectAbortedIcon from "../../assets/svg/smart_inspection_aborted";
import { scale, verticalScale, moderateScale } from '../../styles/size-matters';
import Colors from '../../styles/colors';
import { SmartInspectStackParamList } from '../../navigation/smartInspection';

type SmartInspectionNavigationProp = StackNavigationProp<
  SmartInspectStackParamList,
  'SmartInspectionAbort'
>;
interface Props {
  navigation: SmartInspectionNavigationProp;
  route: RouteProp<SmartInspectStackParamList, 'SmartInspectionAbort'>
}

type State = {
  refreshing?: boolean;
};

class InspectionAborted extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  onPressProceed = () => {
    this.props.navigation.replace("SmartInspectionReport",{})
  };
  onPressCancel = () => {
    this.props.navigation.replace("SmartInspection",{})
  };

  render() {
    let Theme = this.context.theme //load theme context

    return (
      <View style={{ ...styles.container, backgroundColor: Theme.BACKGROUND }}>
        <Header
          hideNotification
          hasBackButton
          title={LanguageSelector.t("morePremium.smartInspect")}
          backgroundColor={Theme.HEADER_YELLOW}
          onBackClick={() => this.props.navigation.goBack()}
        />
        <View style={styles.body}>
          <View style={styles.centerBody}>
            <SmartInspectAbortedIcon height={40} width={65} />
          </View>
          <View style={styles.centerBody}>
            <Text style={{
              ...styles.title, color: Theme.TEXT_WHITE
            }}>
              {LanguageSelector.t("smartInspection.smartInspectIsAborted")}
            </Text>
          </View>
          <View style={styles.centerBody}>
            <Text style={{
              ...styles.bodyText, color: Theme.TEXT_WHITE
            }}>
              {LanguageSelector.t("smartInspection.smartInspectIsAbortedTitle")}
            </Text>
            <Text style={{
              ...styles.bodyText, color: Theme.TEXT_WHITE, marginVertical:moderateScale(10)
            }}>
              {LanguageSelector.t("smartInspection.smartInspectIsAbortedSubTitle")}
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={this.onPressProceed}
            >
              <Text style={{
                ...styles.buttonText,
                color: Theme.WHITE
              }}>
              {LanguageSelector.t("smartInspection.proceed")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={this.onPressCancel}
            >
              <Text style={{
                ...styles.buttonText,
                color: Theme.WHITE
              }}>
              {LanguageSelector.t("smartInspection.cancel")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
InspectionAborted.contextType = ThemeContext

export default InspectionAborted;

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
    paddingVertical: scale(10),
    justifyContent:"center",
    width: "50%",
    margin: 10,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "500",
    textAlign:"center"
  },
  centerBody: {
    alignItems: "center",
    padding: 10
  },
  buttonContainer: {
    flexDirection:"row",
    marginVertical:moderateScale(20),
    marginHorizontal:moderateScale(50),
    justifyContent:"center",
    
  },
  header: {
    height: moderateScale(20),
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.BLACK,
    textAlign:"center"
  },
  bodyText: {
    fontSize: scale(12),
    color: Colors.TEXT_WHITE,
    textAlign: "center"
  },
});