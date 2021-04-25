import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import filterBuisnessesByPrice from '../helper/filterBuissnessesByPrice';
import { useBuissnesses } from '../hooks';
import { getBuissnessList } from '../serverCalls/yelpServerCalls';
import { HomeNavProps } from '../types/NavigationTypes';
import Center from './Center';
import ResultsList from './ResultsList';
import Search from './Search';

const HomeScreen = ({ navigation }: HomeNavProps<'Home'>) => {
  const { results, setBuissnessList } = useBuissnesses();
  const filteredResults: any = React.useMemo(
    () => filterBuisnessesByPrice(results),
    [results],
  );

  //const filteredResults: any = filterBuisnessesByPrice(results)

  //console.log('filted price', filteredResults);

  return (
    <>
      <Search setBuissnessList={setBuissnessList} />
      <ScrollView style={style.ScrollView}>
        <ResultsList
          title={'Cost Effective'}
          list={filteredResults.lowPricePoint}
        />
        <ResultsList
          title={'Bit Precier'}
          list={filteredResults.mediumPricePoint}
        />
        <ResultsList
          title={'Big Spender!'}
          list={filteredResults.largePricePoint}
        />
      </ScrollView>
    </>
  );
};

const style = StyleSheet.create({
  Container: {
    backgroundColor: 'white',
  },
  ScrollView: {
    marginBottom: 15,
  },
});

export default HomeScreen;
