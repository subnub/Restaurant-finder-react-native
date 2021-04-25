import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { getBuissness } from '../serverCalls/yelpServerCalls';
import { HomeNavProps } from '../types/NavigationTypes';
import Center from './Center';
import { AntDesign } from '@expo/vector-icons';

const ResultsPage: React.FC<HomeNavProps<'ResultsPage'>> = ({
  navigation,
  route,
}) => {
  const { id, title } = route.params;
  const [results, setResults] = useState<any>(null);

  const { rating, photos, categories } = results || {};
  const ratingFloored = Math.floor(+rating || 0);
  const count = Array(ratingFloored).fill(0);
  //   let foodCategory = '';
  //   for (let i = 0; i < categories.length; i++) {
  //     foodCategory += categories.title + ' ';
  //   }

  useEffect(() => {
    navigation.setOptions({ headerTitle: title });
    const getBuissnessAsync = async () => {
      const buissness = await getBuissness(id);
      console.log('buissness', buissness.data);
      setResults(buissness.data);
    };

    getBuissnessAsync();
  }, []);

  if (!results) {
    return (
      <Center>
        <ActivityIndicator size="large" />
      </Center>
    );
  }

  return (
    <View>
      <FlatList
        style={styles.flatList}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={photos}
        keyExtractor={(item) => item}
        renderItem={({ item }: any) => {
          console.log('image', item);
          return <Image style={styles.image} source={{ uri: item }} />;
        }}
      />
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingNumber}>{ratingFloored}</Text>
        {count.map((item, i) => (
          <AntDesign key={i} name="star" color="gold" size={15} />
        ))}
      </View>
      {/* <Text>{foodCategory}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 255,
    width: 355,
    borderRadius: 6,
    marginLeft: 10,
  },
  flatList: {
    marginTop: 20,
  },
  ratingContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
    marginLeft: 10,
    alignItems: 'center',
  },
  ratingNumber: {
    marginRight: 5,
    fontSize: 17,
  },
  //   ratingIcon: {
  //       marginTop:
  //   }
});

export default ResultsPage;
