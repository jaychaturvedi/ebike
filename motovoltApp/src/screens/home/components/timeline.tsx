import React from 'react';
import {View, Image, Text} from 'react-native';
import FontWeight from '../../../styles/font-weight';
import {scale, verticalScale} from '../../../styles/size-matters';
import Timeline from 'react-native-timeline-flatlist';
import Colors from '../../../styles/colors';

const timelineStyles = {
  time: {
    color: Colors.BLACK,
    fontSize: 12,
  },
  title: {
    color: Colors.TIMELINE_BLACK_TITLE,
    fontSize: 14,
    fontWeight: FontWeight.SEMI_BOLD,
  },
  eventContainer: {
    paddingHorizontal: scale(16),
  },
  detailContainer: {
    backgroundColor: Colors.WHITE,
    padding: scale(12),
    borderRadius: 8,
    marginVertical: verticalScale(4),
    position: 'relative',
    bottom: verticalScale(24),
  },
  listViewContainer: {
    paddingTop: verticalScale(24),
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nextIcon: {
    width: scale(16),
    height: scale(16),
  },
  description: {
    fontSize: 12,
    color: Colors.TIMELINE_BLACK_TITLE,
  },
};

type Props = {
  title: string;
  data: {
    hasFollow?: boolean;
    viewed?: boolean;
    title?: string;
    description?: string;
    time?: string;
  }[];
};

export default class NotificationTimeline extends React.PureComponent<
  Props,
  {}
> {
  render() {
    return (
      <View
        style={{
          width: '100%',
        }}>
        <Text
          style={{
            ...timelineStyles.title,
            marginHorizontal: 12,
            marginBottom: 16,
          }}>
          {this.props.title}
        </Text>
        <Timeline
          timeStyle={timelineStyles.time}
          eventContainerStyle={timelineStyles.eventContainer}
          detailContainerStyle={timelineStyles.detailContainer}
          listViewContainerStyle={timelineStyles.listViewContainer}
          renderDetail={(rowData: any, sectionId: number, rowId: number) => {
            return (
              <View>
                <View style={timelineStyles.titleContainer as any}>
                  <Text style={timelineStyles.title}>{rowData['title']}</Text>
                  {rowData['hasFollow'] ? (
                    <Image
                      source={require('../../../assets/icons/more-than.png')}
                      style={timelineStyles.nextIcon}
                    />
                  ) : null}
                </View>
                {rowData['description'] && (
                  <View style={{height: verticalScale(8)}} />
                )}
                {rowData['description'] && (
                  <Text style={timelineStyles.description}>
                    {rowData['description']}
                  </Text>
                )}
              </View>
            );
          }}
          data={this.props.data.map((item, index) => ({
            time: item.time,
            title: item.title,
            description: item.description,
            lineColor: item.viewed
              ? Colors.TIMELINE_BLUE
              : Colors.TIMELINE_GREY,
            circleColor: item.viewed
              ? Colors.TIMELINE_BLUE
              : Colors.TIMELINE_GREY,
            hasFollow: item.hasFollow,
          }))}
        />
      </View>
    );
  }
}
