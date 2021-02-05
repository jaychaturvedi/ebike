import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Header from '../home/components/header';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import LanguageSelector from '../../translations';
import { ThemeContext } from '../../styles/theme/theme-context';
import { Icon } from 'native-base';
import MotorIcon from '../../assets/svg/Motor_icon';
import BatteryIcon from '../../assets/svg/battery_icon';
import SmartServicesIcon from '../../assets/svg/smart_services';
import { SmartInspectStackParamList } from '../../navigation/smartInspection';
import { TStore } from '../../service/redux/store';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

type ReduxState = {
  smartInspectReport: TStore['smartInspectReport']
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
  listArray: {
    paramName: string
    status: number
    val: number
  }[],
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
        <View style={{ borderWidth: 0.8, opacity: 0.2, borderColor: "rgba(0, 0, 0, 0.1)" }} />
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
          {this.props?.listArray?.map((item: any, index: number) => {
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
                    {item.paramName}
                  </Text>
                  {getIcon(item.status ? "Healthy" : "Unhealthy")}
                </View>
                {(index !== this.props?.listArray?.length - 1) &&
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
          hideNotification
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
              {this.props.smartInspectReport.overallHealth || this.props.smartInspectReport.isStale
                ? <View>
                  <View style={styles.overallHealth}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: '500',
                      }}
                      numberOfLines={1}>
                      {"Overall Health"}
                    </Text>
                    {getIcon(this.props.smartInspectReport.overallHealth ? "Healthy" : "Unhealthy")}
                  </View>

                </View>
                :
                <View style={styles.overallUnhealthy}>
                  <View style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    marginVertical: 10
                  }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: '500',
                      }}
                      numberOfLines={1}>
                      {"Overall Health"}
                    </Text>
                    {getIcon(this.props.smartInspectReport.overallHealth ? "Healthy" : "Unhealthy")}
                  </View>
                  <View style={{ borderWidth: 0.8, opacity: 0.2 }} />
                  <View style={{ alignItems: "flex-end", marginVertical: 10 }}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: '500',
                        color: "#5E6CAD"
                      }}
                      // onPress={() => { this.props.navigation.replace("SupportService", {}) }}
                      numberOfLines={1}>
                      {"Book a Service  "}
                      <Icon
                        type="FontAwesome"
                        name="chevron-right"
                        style={{
                          fontSize: 12,
                          color: '#5E6CAD',
                        }}
                      />
                    </Text>
                  </View>
                </View>}
            </View>

            <ListReport
              icon={<BatteryIcon width={22} height={22} />}
              listArray={this.props.smartInspectReport.battery}
              title={"Battery"} />
            <ListReport
              icon={<MotorIcon width={22} height={22} />}
              listArray={this.props.smartInspectReport.motor}
              title={"Motor"} />
            <ListReport
              icon={<SmartServicesIcon width={22} height={22} />}
              listArray={this.props.smartInspectReport.smartServices}
              title={"Smart Services"} />

            <View style={{ height: 24 }} />

          </View>
        </ScrollView>
      </View>
    );
  }
}

InspectionReport.contextType = ThemeContext;

export default connect(
  (store: TStore) => {
    return {
      smartInspectReport: store['smartInspectReport']
    };
  },
  {}
)(InspectionReport)

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
  },
  overallUnhealthy: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
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
    case 'Unhealthy':
      return (
        <>
          <View style={{
            flexDirection: "row",
            alignItems: "center",
          }}>
            <Text style={{ marginRight: 8 }}>{"Need service"}</Text>
            <Icon
              type="FontAwesome"
              name="exclamation-circle"
              style={{ color: '#FFA800' }}
            />
          </View>
        </>
      );
    case 'Healthy':
    default:
      return (
        <Icon
          type="FontAwesome"
          name="check-circle"
          style={{ color: '#40A81B' }}
        />
      );
  }
}