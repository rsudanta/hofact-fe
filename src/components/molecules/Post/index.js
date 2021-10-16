import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  IcAnswer,
  IcDownvote,
  IcReply,
  IcUpvote,
  IcVerified,
  ProfileDummy
} from '../../../assets';

const Post = ({onPress, verify, answer}) => {
  return (
    <>
      {onPress ? (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
          <View style={styles.container}>
            <View style={styles.headContainer}>
              <View style={styles.profileContainer}>
                <Image source={ProfileDummy} style={styles.profile} />
                <View>
                  <Text style={styles.name} numberOfLines={1}>
                    Alvina Vania
                  </Text>
                  <View style={styles.dateContainer}>
                    <Text style={styles.badge}>Super</Text>
                    <View style={styles.dot} />
                    <Text style={styles.date}>11 April 2022</Text>
                  </View>
                </View>
              </View>
              {verify && (
                <View style={styles.verifiedContainer}>
                  <IcVerified />
                  <Text style={styles.greenText}>Terverifikasi</Text>
                </View>
              )}
            </View>
            <Text style={styles.title}>
              Apa benar vaksin sinovac mematikan?
            </Text>
            <Text numberOfLines={2} style={styles.subTitle}>
              Kemarin saya mendengar percakapan tetangga saya tentang vaksin
              sinovac lalu kemarin saya mendengar percakapan tetangga saya
              tentang vaksin sinovac lalu...Kemarin saya mendengar percakapan
              tetangga saya tentang
            </Text>
            <View style={styles.answerContainer}>
              <IcAnswer />
              <Text style={styles.answerText}>3</Text>
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <View style={styles.container}>
          <View style={styles.headContainer}>
            <View style={styles.profileContainer}>
              <Image source={ProfileDummy} style={styles.profile} />
              <View>
                <Text style={styles.name} numberOfLines={1}>
                  Alvina Vania
                </Text>
                <View style={styles.dateContainer}>
                  <Text style={styles.badge}>Super</Text>
                  <View style={styles.dot} />
                  <Text style={styles.date}>11 April 2022</Text>
                </View>
              </View>
            </View>
            {verify && (
              <View style={styles.verifiedContainer}>
                <IcVerified />
                <Text style={styles.greenText}>Terverifikasi</Text>
              </View>
            )}
          </View>
          <Text style={styles.title}>Apa benar vaksin sinovac mematikan?</Text>
          <Text style={styles.subTitle}>
            Kemarin saya mendengar percakapan tetangga saya tentang vaksin
            sinovac lalu kemarin saya mendengar percakapan tetangga saya tentang
            vaksin sinovac lalu...Kemarin saya mendengar percakapan tetangga
            saya tentang
          </Text>
          {answer && (
            <View style={styles.bottomContainer}>
              <View style={styles.voteContainer}>
                <IcUpvote />
                <IcDownvote style={styles.vote} />
                <Text style={styles.voteText}>12 vote poin</Text>
              </View>
              <View style={styles.voteContainer}>
                <IcReply />
                <Text style={styles.replyText}>Balas (1)</Text>
              </View>
            </View>
          )}
        </View>
      )}
    </>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 18,
    marginBottom: 20
  },
  headContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  verifiedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greenText: {
    color: '#1AAE9F',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    marginLeft: 3
  },
  title: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: 'black',
    paddingTop: 14,
  },
  subTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Light',
    color: 'black',
    paddingTop: 4,
  },
  answerContainer: {
    marginTop: 12,
    alignItems: 'center',
    flexDirection: 'row'
  },
  bottomContainer: {
    marginTop: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  voteContainer: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  answerText: {
    fontFamily: 'Poppins-Medium',
    marginLeft: 6,
    color: '#8F9AD8',
  },
  profile: {
    borderRadius: 50,
    width: 40,
    height: 40,
    marginRight: 8,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  name: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: 'black',
    width: 180
  },
  badge: {
    fontFamily: 'Poppins-Light',
    color: 'black',
    fontSize: 14
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 3,
    backgroundColor: '#8D8B8B',
    marginHorizontal: 6
  },
  date: {
    fontFamily: 'Poppins-Light',
    color: '#8D8B8B',
    fontSize: 13
  },
  vote: {
    marginLeft: 12,
  },
  voteText: {
    marginLeft: 12,
    fontFamily: 'Poppins-Light',
    color: '#8D8B8B',
    fontSize: 12
  },
  replyText: {
    marginLeft: 8,
    fontFamily: 'Poppins-Light',
    color: '#1D2D8C',
    fontSize: 14
  }
});
