import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Feather, EvilIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import { useInput } from '../hooks';

interface SearchTypes {
  setBuissnessList: (text: string, limit?: number) => Promise<void>;
}

const Search: React.FC<SearchTypes> = ({ setBuissnessList }) => {
  const { textInputValue, onChangeTextInputValue } = useInput();
  const inputHasText = textInputValue.length !== 0;
  const closeIconStyle = inputHasText
    ? styles.CloseIcon
    : styles.CloseIconHidden;

  const onPressCloseIcon = async () => {
    onChangeTextInputValue('');
    await setBuissnessList('itialian');
  };

  const onEndEditing = async () => {
    console.log('Ended', textInputValue);
    await setBuissnessList(textInputValue);
  };

  return (
    <View style={styles.Container}>
      <View style={styles.Box}>
        <EvilIcons name="search" style={styles.SearchIcon} size={25} />
        <TextInput
          value={textInputValue}
          onChange={(e) => onChangeTextInputValue(e.nativeEvent.text)}
          style={styles.TextInput}
          placeholder="Search"
          autoCorrect={false}
          autoCapitalize="none"
          onEndEditing={onEndEditing}
        />
        <EvilIcons
          onPress={onPressCloseIcon}
          name="close"
          style={closeIconStyle}
          size={30}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    marginTop: 5,
    width: '100%',
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  Box: {
    width: '95%',
    height: '100%',
    backgroundColor: '#F0EEEE',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
  },
  SearchIcon: {
    marginLeft: 5,
  },
  CloseIcon: {
    marginRight: 5,
  },
  CloseIconHidden: {
    marginRight: 5,
    opacity: 0,
  },
  TextInput: {
    fontSize: 15,
    height: '100%',
    marginLeft: 5,
    marginRight: 5,
    flex: 1,
  },
});

export default Search;
