import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Gap } from '../..';
import {
  IcAccVerified,
  IcAnswer,
  IcDelete,
  IcDownvote,
  IcDownvoteOn,
  IcReply,
  IcUpvote,
  IcUpvoteOn,
  IcVerified,
  ProfileDummy
} from '../../../assets';
import { formatedBadge } from '../../../utils';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';

const Post = ({
  onPress,
  imageQuestion,
  verify,
  answer,
  title,
  question,
  date,
  name,
  badge,
  role,
  totalAnswer,
  image,
  isQuestion,
  isAnswer,
  point,
  onUpvote,
  onDownvote,
  hasVote,
  voteAuth,
  imageAnswer
}) => {
  var options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  const formatedDate = new Date(date).toLocaleDateString('id-ID', options);

  const countAnswer = () => {
    return totalAnswer.length;
  };
  const [modalQuestion, setModalQuestion] = useState(null);
  const [modalAnswer, setModalAnswer] = useState(null);
  const windowHeight = Dimensions.get('window').height;

  return (
    <>
      {onPress ? (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
          <View style={styles.container}>
            <View style={styles.headContainer}>
              <View style={styles.profileContainer}>
                <Image source={{ uri: image }} style={styles.profile} />
                <View>
                  <View style={styles.nameContainer}>
                    <Text style={styles.name} numberOfLines={1}>
                      {name}
                    </Text>
                    {role == 'ADMIN' && <IcAccVerified width={14} />}
                  </View>
                  <View style={styles.dateContainer}>
                    <Text style={styles.badge}>{formatedBadge(badge, role)}</Text>
                    <View style={styles.dot} />
                    <Text style={styles.date}>{formatedDate}</Text>
                  </View>
                </View>
              </View>
              {verify == '1' && (
                <View style={styles.verifiedContainer}>
                  <IcVerified />
                  <Text style={styles.greenText}>Terverifikasi</Text>
                </View>
              )}
            </View>
            <Text style={styles.title}>{title}</Text>
            <Text numberOfLines={2} style={styles.subTitle}>
              {question}
            </Text>
            <View style={styles.answerContainer}>
              <IcAnswer />
              <Text style={styles.answerText}>{countAnswer()}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <View style={styles.container}>
          <View style={styles.headContainer}>
            <View style={styles.profileContainer}>
              <Image source={{ uri: image }} style={styles.profile} />
              <View>
                <View style={styles.nameContainer}>
                  <Text style={styles.name} numberOfLines={1}>
                    {name}
                  </Text>
                  {role == 'ADMIN' && <IcAccVerified width={14} />}
                </View>
                <View style={styles.dateContainer}>
                  <Text style={styles.badge}>{formatedBadge(badge, role)}</Text>
                  <View style={styles.dot} />
                  <Text style={styles.date}>{formatedDate}</Text>
                </View>
              </View>
            </View>
            {verify == '1' && (
              <View style={styles.verifiedContainer}>
                <IcVerified />
                <Text style={styles.greenText}>Terverifikasi</Text>
              </View>
            )}
          </View>

          {isQuestion && (
            <View>
              <Text style={styles.title}>{title}</Text>
              {imageQuestion != null ? (
                <TouchableOpacity onPress={() => setModalQuestion('active')}>
                  <Image
                    style={styles.imageQuestion}
                    resizeMode="cover"
                    source={{
                      uri: `https://hofact.masuk.id/storage/public/${imageQuestion}`
                    }}
                  />
                </TouchableOpacity>
              ) : (
                <></>
              )}
              <Text style={styles.subTitle}>{question}</Text>
            </View>
          )}
          {isAnswer && (
            <View>
              <Gap height={14} />
              <Text style={styles.subTitle}>{answer}</Text>
              {imageAnswer != null ? (
                <TouchableOpacity onPress={() => setModalAnswer('active')}>
                  <Image
                    style={styles.imageQuestion}
                    resizeMode="cover"
                    source={{
                      uri: `https://hofact.masuk.id/storage/public/${imageAnswer}`
                    }}
                  />
                </TouchableOpacity>
              ) : (
                <></>
              )}
              <View style={styles.bottomContainer}>
                <View style={styles.voteContainer}>
                  {voteAuth == false ? (
                    <>
                      <TouchableOpacity onPress={onUpvote}>
                        {hasVote === 'UPVOTE' ? <IcUpvoteOn /> : <IcUpvote />}
                      </TouchableOpacity>
                      <TouchableOpacity onPress={onDownvote}>
                        {hasVote === 'DOWNVOTE' ? (
                          <IcDownvoteOn style={styles.vote} />
                        ) : (
                          <IcDownvote style={styles.vote} />
                        )}
                      </TouchableOpacity>
                    </>
                  ) : null}

                  <Text style={styles.voteText}>{point} vote poin</Text>
                </View>
              </View>
            </View>
          )}
        </View>
      )}
      <Modal visible={modalQuestion !== null} animationType="slide">
        <ReactNativeZoomableView
          maxZoom={4}
          minZoom={1}
          zoomStep={0.5}
          initialZoom={1}
          captureEvent={true}>
          <Image
            resizeMode="contain"
            style={styles.imageModal}
            source={{
              uri: `https://hofact.masuk.id/storage/public/${imageQuestion}`
            }}
          />
        </ReactNativeZoomableView>

        <View style={styles.closeIcon}>
          <TouchableOpacity onPress={() => setModalQuestion(null)}>
            <IcDelete />
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal visible={modalAnswer !== null} animationType="slide">
        <ReactNativeZoomableView
          maxZoom={4}
          minZoom={1}
          zoomStep={0.5}
          initialZoom={1}
          captureEvent={true}>
          <Image
            resizeMode="contain"
            style={styles.imageModal}
            source={{
              uri: `https://hofact.masuk.id/storage/public/${imageAnswer}`
            }}
          />
        </ReactNativeZoomableView>
        <View style={styles.closeIcon}>
          <TouchableOpacity onPress={() => setModalAnswer(null)}>
            <IcDelete />
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: 18,
    marginBottom: 20
  },
  headContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 24,
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
    marginHorizontal: 24
  },
  subTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Light',
    color: 'black',
    paddingTop: 4,
    marginHorizontal: 24
  },
  answerContainer: {
    marginTop: 12,
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 24,
  },
  bottomContainer: {
    marginTop: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 24,
  },
  voteContainer: {
    alignItems: 'center',
    flexDirection: 'row',
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
    marginRight: 5
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
    marginRight: 12,
  },
  voteText: {
    fontFamily: 'Poppins-Light',
    color: '#8D8B8B',
    fontSize: 12
  },
  replyText: {
    marginLeft: 8,
    fontFamily: 'Poppins-Light',
    color: '#1D2D8C',
    fontSize: 14
  },
  imageQuestion: {
    marginVertical: 14,
    width: '100%',
    height: 200
  },
  imageModal: { width: '100%', height: '100%', backgroundColor: 'black' },
  closeIcon: {
    position: 'absolute',
    right: 0,
    marginHorizontal: 10,
    marginVertical: 20
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 180
  },
});
