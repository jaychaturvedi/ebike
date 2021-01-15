import {Text, View} from 'native-base';
import React, {useCallback, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Icon} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  root: {padding: 20, display: 'flex', flexDirection: 'column'},
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {fontSize: 12, color: 'rgba(0,0,0,0.4)'},
  bodyContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
});

export default function Card(props: {
  headerIcon?: React.ReactNode;
  title: string;
  time: string;
  description: string;
  headerImage?: React.ReactNode;
  headerMedia?: React.ReactNode;
  bodyImage?: React.ReactNode;
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <View style={styles.root}>
      <View style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
        {props.headerMedia ? (
          <View
            style={{
              width: 150,
              paddingVertical: 6,
              paddingHorizontal: 12,
            }}>
            <View
              style={{
                width: '100%',
              }}></View>
          </View>
        ) : null}

        <View style={{flex: 1}}>
          <View style={styles.headerContainer}>
            <View style={styles.headerContent}>
              {props.headerIcon}
              <Text style={styles.time}>{props.time}</Text>
            </View>
            <View>
              {props.bodyImage ? (
                <TouchableOpacity onPress={() => setExpanded(!expanded)}>
                  <Icon
                    type="FontAwesome"
                    name={!expanded ? 'angle-down' : 'angle-up'}
                    style={{marginRight: 6, fontSize: 17}}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
          <View style={styles.bodyContainer}>
            <View style={{display: 'flex', flex: 1}}>
              <Text
                style={{fontSize: 18, lineHeight: 21, marginTop: 5}}
                numberOfLines={1}>
                {props.title}
              </Text>
              <Text
                style={{fontSize: 15, marginTop: 11, lineHeight: 18}}
                numberOfLines={2}>
                {props.description}
              </Text>
            </View>
            {props.headerImage ? <View>{props.headerImage}</View> : null}
          </View>
        </View>
      </View>
      {props.bodyImage && expanded ? (
        <View style={{marginTop: 8}}>{props.bodyImage}</View>
      ) : null}
    </View>
  );
}
