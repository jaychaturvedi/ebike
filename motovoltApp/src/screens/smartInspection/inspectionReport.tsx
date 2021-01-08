import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import Header from '../home/components/header';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { TStore } from '../../service/redux/store';
import LanguageSelector from '../../translations';
import { ThemeContext } from '../../styles/theme/theme-context';
import { Icon } from 'native-base';
import MotorIcon from '../../assets/svg/Motor_icon';
import BatteryIcon from '../../assets/svg/battery_icon';
import SmartServicesIcon from '../../assets/svg/smart_services';
import { SmartInspectStackParamList } from '../../navigation/smartInspection';

type ReduxState = {
};

type SmartInspectionNavigationProp = StackNavigationProp<
  SmartInspectStackParamList,
  'SmartInspectionReport'
>;

interface Props extends ReduxState {
  navigation: SmartInspectionNavigationProp;
  route: RouteProp<SmartInspectStackParamList, 'SmartInspectionReport'>;
}

type State = {
  refreshing: boolean;
};

interface ListReportProps {
  listArray: any,
  title: string,
  icon: React.ReactNode
}
class ListReport extends React.PureComponent<ListReportProps, {}>{
  render() {
    return (
      <>
        <View style={{ height: 24 }} />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: "#ffffff",
            paddingHorizontal: 24,
            paddingVertical: 16,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            shadowOpacity: 0.25,
            shadowRadius: 1,
            shadowColor: 'black',
            shadowOffset: { height: 1, width: 1 },
            elevation: 1
          }}>
          <View style={{ height: 22, width: 22 }}>
            {this.props.icon}
          </View>
          <View style={{ marginLeft: 8 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '400',
              }}
              numberOfLines={1}>
              {this.props.title}
            </Text>
          </View>
        </View>
        <View style={{ borderWidth: 0.8, opacity: 0.2 }} />
        <View
          style={{
            backgroundColor: 'white',
            paddingHorizontal: 24,
            paddingVertical: 16,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            shadowOpacity: 0.25,
            shadowRadius: 1,
            shadowColor: 'black',
            shadowOffset: { height: 1, width: 1 },
            elevation: 3,
          }}>
          {this.props.listArray.map((item: any, index: number) => {
            return (
              <>
                <View
                  key={index}
                  style={{
                    paddingVertical: 10,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: "center"
                  }}>
                  <Text style={{ fontSize: 16, opacity: 0.7 }}>
                    {item.name}
                  </Text>
                  {getIcon(item.status)}
                </View>
                {(index !== this.props.listArray.length - 1) &&
                  <View style={{ borderWidth: 0.5, opacity: 0.2 }} />}
              </>
            )
          })}
        </View>
      </>
    )
  }
}

class InspectionReport extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  onRefresh() {
    this.setState({ refreshing: true });
    this.setState({ refreshing: false });
  }
  render() {
    let Theme = this.context.theme; //load theme context
    return (
      <View style={styles.container}>
        {/* <Background /> */}
        <Header
          hasBackButton
          title={LanguageSelector.t("smartInspection.smartInspectionReport")}
          backgroundColor={Theme.HEADER_YELLOW}
          onBackClick={() => this.props.navigation.goBack()}
        />
        <ScrollView
          style={{ paddingHorizontal: moderateScale(15), flex: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
              title="Loading..."
            />
          }>
          <View style={styles.metrics}>
            <View>
              <View style={styles.overallHealth}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '500',
                  }}
                  numberOfLines={1}>
                  {"Overall Health"}
                </Text>
                {getIcon("W")}
              </View>
              {/* <View style={{ borderWidth: 0.8, opacity: 0.2 }} />
              <View style={{...styles.overallHealth,justifyContent:"flex-end"}}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '500',
                    color:"#5E6CAD"
                  }}
                  onPress={()=>{this.props.navigation.navigate("SupportService",{})}}
                  numberOfLines={1}>
                  {"Book a service"}
                </Text>
              </View> */}
            </View>

            <ListReport
              icon={<BatteryIcon width={22} height={22} />}
              listArray={batteryArr}
              title={"Battery"} />
            <ListReport
              icon={<MotorIcon width={22} height={22} />}
              listArray={motorArr}
              title={"Motor"} />
            <ListReport
              icon={<SmartServicesIcon width={22} height={22} />}
              listArray={smartServicesArr}
              title={"Smart Services"} />

            <View style={{ height: 24 }} />

          </View>
        </ScrollView>
      </View>
    );
  }
}

InspectionReport.contextType = ThemeContext;

export default InspectionReport

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#F0F0F0',
    // padding: moderateScale(15),
  },
  metrics: {
    flex: 1,
    marginTop: moderateScale(20),
    shadowOpacity: 0.25,
    shadowRadius: 1,
    shadowColor: 'black',
    shadowOffset: { height: 1, width: 1 },
    elevation: 3,
  },
  overallHealth: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 10,
    width: '100%',
    shadowOpacity: 0.25,
    shadowRadius: 1,
    shadowColor: 'black',
    shadowOffset: { height: 1, width: 1 },
    elevation: 3
  }
});

function getIcon(status: string) {
  switch (status) {
    case 'C':
      return (
        <Icon
          type="FontAwesome"
          name="exclamation-circle"
          style={{  color: '#FF1F00' }}
        />
      );
    case 'W':
      return (
        <>
          <View style={{
            flexDirection: "row",
            alignItems: "center",
          }}>
            <Text style={{ marginRight: 8}}>{"Need a service"}</Text>
            <Icon
              type="FontAwesome"
              name="exclamation-circle"
              style={{ color: '#FFA800'}}
            />
          </View>
        </>
      );
    case 'H':
    default:
      return (
        <Icon
          type="FontAwesome"
          name="check-circle"
          style={{  color: '#40A81B' }}
        />
      );
  }
}

const batteryArr = [
  {
    name: "Pack Voltage",
    status: "W"
  },
  {
    name: "Current",
    status: "H"
  },
  {
    name: "Cell Voltages",
    status: "H"
  },
  {
    name: "Charging",
    status: "H"
  },
  {
    name: "Discharging",
    status: "H"
  },
  {
    name: "Cell Balance",
    status: "H"
  },
  {
    name: "Temperature",
    status: "H"
  },
  {
    name: "BMS",
    status: "H"
  },
  {
    name: "Charge Protection",
    status: "H"
  },
  {
    name: "Discharge Protection",
    status: "H"
  },
]

const motorArr = [
  {
    name: "Speed",
    status: "W"
  },
  {
    name: "Odometer",
    status: "H"
  },
  {
    name: "Ride Mode",
    status: "H"
  },
  {
    name: "Cruise",
    status: "H"
  },
  {
    name: "Throttle",
    status: "H"
  }
]
const smartServicesArr = [
  {
    name: "Remote Lock",
    status: "H"
  },
  {
    name: "Track Location",
    status: "H"
  },
  {
    name: "Safety Alerts",
    status: "H"
  },
]
