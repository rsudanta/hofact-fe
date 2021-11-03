import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {Gap} from '../..';
import {IcAnswer} from '../../../assets';
import {useNavigation} from '@react-navigation/native';

const AnswerHistory = () => {
  const navigation = useNavigation();

  const {answerUser} = useSelector(state => state.profileReducer);
  const {post} = useSelector(state => state.homeReducer);
  var options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const formatedDate = date => {
    return new Date(date).toLocaleDateString('id-ID', options);
  };
  const finding = item => {
    var result = post.find(({id}) => id == item);
    return result;
  };
  return (
    <View style={styles.container}>
      {answerUser.map(itemAnswer => {
        return (
          <TouchableOpacity
            key={itemAnswer.id}
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate(
                'DetailPost',
                finding(itemAnswer.id_pertanyaan)
              );
            }}>
            <Gap height={12} />
            <Text style={styles.text}>{itemAnswer.isi_jawaban}</Text>
            <View style={styles.bottomContainer}>
              <Text style={styles.totalVote}>
                {itemAnswer.total_vote} vote poin
              </Text>
              <Text style={styles.date}>
                {formatedDate(itemAnswer.created_at)}
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

export default AnswerHistory;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    backgroundColor: 'white'
  },
  text: {
    color: 'black',
    fontFamily: 'Poppins-Medium',
    fontSize: 14
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 5
  },
  totalVote: {
    fontFamily: 'Poppins-Light',
    color: '#8D8B8B',
    fontSize: 12,
  },
  date: {
    color: '#8D8B8B',
    fontFamily: 'Poppins-Regular',
    fontSize: 12
  },
  line: {
    borderColor: '#C4C4C4',
    borderWidth: 0.7
  },
});
