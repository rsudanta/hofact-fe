import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const PostSkeleton = () => {
  return (
    <SkeletonPlaceholder>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.photo} />
          <View>
            <View style={styles.name} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: 8
              }}>
              <View style={styles.badge} />
              <View style={styles.date} />
            </View>
          </View>
        </View>
        <View style={{marginTop: 14}} />
        <View style={styles.content} />
        <View style={{marginTop: 8}} />
        <View style={styles.content} />
        <View style={styles.content} />
      </View>
    </SkeletonPlaceholder>
  );
};

export default PostSkeleton;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 18,
    marginBottom: 20,
    marginHorizontal: 24,
  },
  photo: {
    borderRadius: 50,
    width: 40,
    height: 40,
    marginRight: 8,
  },
  name: {width: 120, height: 12, borderRadius: 4},
  badge: {width: 80, height: 12, borderRadius: 4},
  date: {width: 80, height: 12, borderRadius: 4, marginLeft: 8},
  content: {width: '100%', height: 16, borderRadius: 4, marginTop: 8},
});
