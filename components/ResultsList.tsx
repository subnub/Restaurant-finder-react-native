import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { HomeNavProps } from '../types/NavigationTypes';
import ResultsListItem from './ResultsListItem';

interface ResultsListProps {
  title: string;
  list: any[];
}

const ResultsList: React.FC<ResultsListProps> = ({ title, list }) => {
  const navigation = useNavigation();
  //console.log('results list', list.length);

  const mainViewStyle =
    list.length !== 0 ? styles.Container : styles.ContainerHidden;

  return (
    <View style={mainViewStyle}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={list}
        keyExtractor={(currentObj) => currentObj.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ResultsPage', {
                id: item.id,
                title: item.name,
              })
            }
          >
            <ResultsListItem item={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: 5,
  },
  Container: {
    marginTop: 10,
  },
  ContainerHidden: {
    marginTop: 10,
    display: 'none',
  },
});

export default ResultsList;
