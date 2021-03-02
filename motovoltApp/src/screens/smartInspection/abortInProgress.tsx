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
import { TStore } from '../../service/redux/store';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { BeginSmartInspection, BeginAbortInspection, ClearInspectionReport } from '../../service/redux/actions/saga';
import { config, yantraRequest } from '../../service/redux/saga/utils';
import CircularProgressBar from "./component/loaderSpinner"

type SmartInspectionNavigationProp = StackNavigationProp<
  SmartInspectStackParamList,
  'SmartInspectionInProgress'
>;

interface ReduxState {
  smartInspectAbortedReport: TStore['smartInspectAbortedReport'],
  user: TStore['user'],
  beginAbortedInspection: (params: BeginAbortInspection) => void,
  clearInspectionReport: (params: ClearInspectionReport) => void,
}

interface Props extends ReduxState {
  navigation: SmartInspectionNavigationProp;
  route: RouteProp<SmartInspectStackParamList, 'SmartInspectionInProgress'>
}

type State = {
  refreshing?: boolean;
  fill: number
};

class InspectionProgress extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      fill: 0
    };
  }

  beginInspection = () => {
    this.props.beginAbortedInspection({
      type: "BeginAbortInspection",
      payload: {
        frameId: this.props.user.defaultBikeId
      }
    })
  };

  startTimer() {
    const timer = setInterval(() => {
      if (this.props.smartInspectAbortedReport.status === "success" ||
        this.props.smartInspectAbortedReport.status === "abort") {
        this.setState({
          fill: 100,
        });
      }
      else if (this.state.fill < 100)
        this.setState({
          fill: this.state.fill + 1,
        });
    }, 200);
  }

  componentDidMount() {
    this.beginInspection()
    this.startTimer();
  }

  componentWillUnmount() {
    if (this.state.fill) clearInterval(this.state.fill);
  }

  render() {
    let Theme = this.context.theme //load theme context
    if (this.state.fill >= 100 &&
      this.props.smartInspectAbortedReport.status === "success") {
      setTimeout(() => {
        this.props.navigation.replace("SmartInspectionReport", {
          data: this.props.smartInspectAbortedReport
        })
      }, 1000)
    }
    if (this.state.fill >= 100 &&
      this.props.smartInspectAbortedReport.status !== "success" &&
      !this.props.smartInspectAbortedReport.isStale) {
      setTimeout(() => {
        this.props.navigation.replace("AbortIsAborted", {})
      }, 1000)
    }
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
          <SmartInspect height={40} width={65} />

          <Text style={{
            ...styles.title, color: Theme.TEXT_WHITE
          }}>
            {LanguageSelector.t("smartInspection.smartInspect")}
          </Text>

          <Text style={{
            ...styles.bodyText, color: Theme.TEXT_WHITE
          }}>
            {LanguageSelector.t("smartInspection.smartInspectAbortInProgressSubTitle")}
          </Text>

          <CircularProgressBar
            size={150}
            width={30}
            fill={this.state.fill} />
          <Text style={{
            marginVertical: 5,
            paddingHorizontal: 10,
            color: "#3C5BE8",
            fontSize: scale(16)
          }}>
            {LanguageSelector.t("smartInspection.inspectionInProgress")}
          </Text>
        </View>
      </View>
    );
  }
}
InspectionProgress.contextType = ThemeContext

export default connect(
  (store: TStore) => {
    return {
      smartInspectAbortedReport: store['smartInspectAbortedReport'],
      user: store['user'],
    };
  },
  (dispatch: Dispatch) => {
    return {
      beginAbortedInspection: (params: BeginAbortInspection) => dispatch(params),
      clearInspectionReport: (params: ClearInspectionReport) => dispatch(params)

    };
  },
)(InspectionProgress);

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
    paddingHorizontal: 10,
    opacity: 0.7
  },
  loader: {
    marginVertical: verticalScale(32)
  }
});