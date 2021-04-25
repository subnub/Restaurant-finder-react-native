import React, { useEffect, useState } from 'react';
import {
  Alert,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import { getBuissnessList } from '../serverCalls/yelpServerCalls';

export const useInput = (initialText = '') => {
  const [state, setState] = useState(initialText);

  const onChangeInput = (text: string) => {
    setState(text);
  };

  return { textInputValue: state, onChangeTextInputValue: onChangeInput };
};

export const useBuissnesses = () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    setBuissnessList('itialian');
  }, []);

  const setBuissnessList = async (text: string, limit?: number) => {
    try {
      const buissnessList = await getBuissnessList(text, limit);
      //console.log('buissness data', buissnessList);
      setResults(buissnessList.data.businesses);
    } catch (e) {
      console.log('Search Buissnesses Error', e);
      setErrorMessage(e);
      Alert.alert('Error', 'Something went wrong');
    }
  };

  const resultsType = results as Object[];

  return { results: resultsType, setBuissnessList, errorMessage };
};
