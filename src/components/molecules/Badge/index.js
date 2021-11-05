import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as Progress from 'react-native-progress';
import {Badge1, Badge2, Badge3, BadgeSuccess} from '../../../assets';

const Badge = ({poin}) => {
  return (
    <>
      <View style={styles.badgeContainer}>
        {poin < 100 ? <Badge1 /> : <BadgeSuccess />}
        <View style={styles.textBadgeContainer}>
          <Text style={styles.titleBadge}>Ambisius</Text>
          <Text style={styles.subtitleBadge}>
            Raih 100 XP dengan menjawab pertanyaan
          </Text>
          <View>
            <Progress.Bar
              progress={poin / 100}
              width={null}
              height={5}
              style={{flex: 1}}
              color="#1D2D8C"
              unfilledColor="#8F9AD8"
              borderWidth={0}
            />
          </View>
          {poin < 100 ? (
            <Text style={styles.expText}>{poin}/100 XP</Text>
          ) : (
            <Text style={styles.expText}>100/100 XP</Text>
          )}
        </View>
      </View>
      <View style={styles.line} />
      <View style={styles.badgeContainer}>
        {poin < 200 ? <Badge2 /> : <BadgeSuccess />}
        <View style={styles.textBadgeContainer}>
          <Text style={styles.titleBadge}>Hebat</Text>
          <Text style={styles.subtitleBadge}>
            Raih 200 XP dengan menjawab pertanyaan
          </Text>
          <View>
            <Progress.Bar
              progress={poin / 200}
              width={null}
              height={5}
              style={{flex: 1}}
              color="#1D2D8C"
              unfilledColor="#8F9AD8"
              borderWidth={0}
            />
          </View>
          {poin < 200 ? (
            <Text style={styles.expText}>{poin}/200 XP</Text>
          ) : (
            <Text style={styles.expText}>200/200 XP</Text>
          )}
        </View>
      </View>
      <View style={styles.line} />
      <View style={styles.badgeContainer}>
        {poin < 300 ? <Badge3 /> : <BadgeSuccess />}
        <View style={styles.textBadgeContainer}>
          <Text style={styles.titleBadge}>Jenius</Text>
          <Text style={styles.subtitleBadge}>
            Raih 300 XP dengan menjawab pertanyaan
          </Text>
          <View>
            <Progress.Bar
              progress={poin / 300}
              width={null}
              height={5}
              style={{flex: 1}}
              color="#1D2D8C"
              unfilledColor="#8F9AD8"
              borderWidth={0}
            />
          </View>
          {poin < 300 ? (
            <Text style={styles.expText}>{poin}/300 XP</Text>
          ) : (
            <Text style={styles.expText}>300/300 XP</Text>
          )}
        </View>
      </View>
      <View style={styles.line} />
    </>
  );
};

export default Badge;

const styles = StyleSheet.create({
  badgeContainer: {
    flexDirection: 'row',
    marginVertical: 12
  },
  textBadgeContainer: {
    justifyContent: 'center',
    marginLeft: 10
  },
  titleBadge: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: 'black',
  },
  subtitleBadge: {
    fontFamily: 'Poppins-Light',
    fontSize: 12,
    color: 'black',
    marginBottom: 8,
  },
  expText: {
    fontFamily: 'Poppins-Light',
    fontSize: 12,
    color: 'black',
    textAlign: 'right',
  },
  line: {
    borderColor: '#C4C4C4',
    borderWidth: 0.7,
  },
});
