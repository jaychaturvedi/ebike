import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { ThemeContext } from '../../styles/theme/theme-context';
import LanguageSelector from '../../translations';
import Header from '../home/components/header';
import SmartInspect from "../../assets/svg/smart_inspect";
import { scale, verticalScale, moderateScale } from '../../styles/size-matters';
import Colors from '../../styles/colors';
import { SmartInspectStackParamList } from '../../navigation/smartInspection';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

type SmartInspectionNavigationProp = StackNavigationProp<
  SmartInspectStackParamList,
  'SmartInspectionInProgress'
>;
interface Props {
  navigation: SmartInspectionNavigationProp;
  route: RouteProp<SmartInspectStackParamList, 'SmartInspectionInProgress'>
}

type State = {
  refreshing?: boolean;
  fill:number
};

class Inspection extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {fill:40};
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.props.navigation.navigate("SmartInspectionAbort", {})
    }, 2000)
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
          <SmartInspect height={40} width={65} />

          <Text style={{
            ...styles.title, color: Theme.TEXT_WHITE
          }}>
              {LanguageSelector.t("smartInspection.smartInspect")}
          </Text>

          <Text style={{
            ...styles.bodyText, color: Theme.TEXT_WHITE
          }}>
              {LanguageSelector.t("smartInspection.smartInspectSubTitle")}
          </Text>

          <AnimatedCircularProgress
            size={150}
            width={30}
            fill={this.state.fill}
            // dashedTint={{width:20,gap:10}}
            style={{marginVertical:20}}
            tintColor="#5E6CAD"
            backgroundColor="#DEDEDE"
            rotation={0}
            tintColorSecondary="#5E6CAD"
            dashedBackground={{width:20,gap:10}}
            dashedTint={{width:20,gap:10}}
            >
            {
              (fill) => (
                <Text style={{fontSize:40}}>
                  { this.state.fill}
                </Text>
              )
            }
          </AnimatedCircularProgress>
          <Text style={{
            ...styles.bodyText,
            color: "#5E6CAD",
            fontSize: scale(16)
          }}>
              {LanguageSelector.t("smartInspection.inspectionInProgress")}
          </Text>
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
    alignItems: "center",
    paddingHorizontal: moderateScale(50)
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
    textAlign: "center",
    marginVertical: 15
  },
  bodyText: {
    fontSize: scale(12),
    color: Colors.TEXT_WHITE,
    textAlign: "center",
    marginVertical: 5,
    paddingHorizontal:10
  },
  loader: {
    marginVertical: verticalScale(32)
  }
});
Inspection.contextType = ThemeContext

export default Inspection;