import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { useBuissnesses } from '../hooks';
import { getBuissnessList } from '../serverCalls/yelpServerCalls';
import Center from './Center';
import Search from './Search';

const HomeScreen = () => {
  const { results, setBuissnessList } = useBuissnesses();

  return (
    <View style={style.Container}>
      <Search setBuissnessList={setBuissnessList} />
      <Center>
        <Text>Count: {results.length}</Text>
      </Center>
    </View>
  );
};

const style = StyleSheet.create({
  Container: {
    backgroundColor: 'white',
  },
});

export default HomeScreen;
