import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {Gap} from '../..';
import {IcAnswer} from '../../../assets';
import {useNavigation} from '@react-navigation/native';

const QuestionHistory = () => {
  const navigation = useNavigation();

  const {postUser} = useSelector(state => state.profileReducer);
  var options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  const formatedDate = date => {
    return new Date(date).toLocaleDateString('id-ID', options);
  };

  return (
    <View style={styles.container}>
      {postUser.map(itemPost => {
        return (
          <TouchableOpacity
            key={itemPost.id}
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate('DetailPost', itemPost);
            }}>
            <Gap height={12} />
            <Text style={styles.text}>{itemPost.judul_pertanyaan}</Text>
            <View style={styles.bottomContainer}>
              <View style={styles.answerContainer}>
                <IcAnswer />
                <Text style={styles.countAnswer}>
                  {itemPost.isi_jawaban.length}
                </Text>
              </View>
              <Text style={styles.date}>
                {formatedDate(itemPost.created_at)}
              </Text>
            </View>
            <Gap height={10} />
            <View style={styles.line} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default QuestionHistory;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    backgroundColor: 'white',
  },
  text: {
    color: 'black',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 5,
  },
  answerContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  countAnswer: {
    color: '#8F9AD8',
    paddingLeft: 4,
    fontFamily: 'Poppins-Medium',
  },
  date: {
    color: '#8D8B8B',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
  line: {
    borderColor: '#C4C4C4',
    borderWidth: 0.7,
  }
});
