import React from 'react';
import { StyleSheet, Text, View, TextInput as TextInputRN, TouchableOpacity, Dimensions } from 'react-native';
import { HidePassword, ShowPassword } from '../../../assets';
export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const TextInput = ({ icon, label, placeholder, show, hide, ...restProps }) => {
  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.input}>
        <TextInputRN
          style={styles.form}
          placeholderTextColor="#8D92A3"
          placeholder={placeholder}
          width={SCREEN_WIDTH - 100}
          {...restProps}
        />
        {icon == 'showPassword' &&
          <TouchableOpacity activeOpacity={0.7} onPress={show} style={styles.icon}>
            <ShowPassword />
          </TouchableOpacity>
        }
        {icon == 'hidePassword' &&
          <TouchableOpacity activeOpacity={0.7} onPress={hide} style={styles.icon}>
            <HidePassword />
          </TouchableOpacity>
        }
      </View>
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  label: { fontSize: 14, fontFamily: 'Poppins-Regular', color: '#020202' },
  input: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#020202',
    borderRadius: 8,
    padding: 3,
    color: 'black',
  },
  form: {
    color:'black'
  },
  icon: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    flex: 1,
    paddingRight: 20
  }
});
