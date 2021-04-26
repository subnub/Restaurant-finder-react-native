import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  Image,
  Linking,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { getBuissness } from '../serverCalls/yelpServerCalls';
import { HomeNavProps } from '../types/NavigationTypes';
import Center from './Center';
import {
  AntDesign,
  EvilIcons,
  Fontisto,
  FontAwesome,
} from '@expo/vector-icons';
import moment from 'moment';

const ResultsPage: React.FC<HomeNavProps<'ResultsPage'>> = ({
  navigation,
  route,
}) => {
  const { id, title } = route.params;
  const [results, setResults] = useState<any>(null);

  const {
    rating,
    photos,
    categories,
    review_count,
    price,
    location,
    hours,
    phone,
    transactions,
    url,
    coordinates,
  } = results || {};
  const ratingFloored = Math.floor(+rating || 0);
  const count = Array(ratingFloored).fill(0);
  const { width } = useWindowDimensions();
  const widthFloored = Math.floor(width);

  useEffect(() => {
    navigation.setOptions({ headerTitle: 'Restaurant' });
    // StatusBar.setBackgroundColor('#FF573300');
    // StatusBar.setTranslucent(true);
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

  const phoneURL = `tel:${phone}`;
  const { latitude, longitude } = coordinates;
  const foodCategory = categories[0].title;
  // console.log('hours', Object.keys(hours['0']), hours['0'].is_open_now);
  const isOpen = hours && hours['0'] ? hours['0'].is_open_now : false;
  const openStatus = isOpen ? 'Open' : 'Closed';
  const openStatusStyle = isOpen ? styles.openText : styles.closedText;
  const displayAddress = location.display_address;
  let allTransactions = '';
  for (let i = 0; i < transactions.length; i++) {
    allTransactions += ' ' + transactions[i] + ' ';
  }

  const urlTest: any = Platform.select({
    ios: 'maps:' + latitude + ',' + longitude + '?q=' + title,
    android: 'geo:' + latitude + ',' + longitude + '?q=' + title,
  });

  //console.log('cata', categories);

  return (
    <View>
      <FlatList
        style={styles.flatList}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={photos}
        keyExtractor={(item) => item}
        renderItem={({ item }: any) => {
          //console.log('image', item);
          return (
            <Image
              style={styles.image}
              source={{ uri: item }}
              width={widthFloored}
            />
          );
        }}
      />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingNumber}>{ratingFloored}</Text>
        {count.map((item, i) => (
          <AntDesign key={i} name="star" color="gold" size={15} />
        ))}
        <Text style={styles.reviewCount}>({review_count} reviews)</Text>
      </View>
      <View style={styles.ratingContainer}>
        <Text>{foodCategory}</Text>
        <Text style={styles.price}>{price}</Text>
      </View>
      <View style={styles.ratingContainer}>
        <Text style={openStatusStyle}>{openStatus}</Text>
        <Text>{displayAddress[0]}</Text>
      </View>
      <View style={styles.ratingContainer}>
        <Text>{phone}</Text>
        <Text style={styles.transactions}>{allTransactions}</Text>
      </View>
      <View style={styles.infoMainContainer}>
        <TouchableOpacity onPress={() => Linking.openURL(urlTest)}>
          <View style={styles.infoContainer}>
            <EvilIcons name="location" size={30} style={styles.icons} />
            <Text style={styles.fullAddress}>
              {displayAddress[0]} {displayAddress[1]}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL(url)}>
          <View style={styles.infoContainer}>
            <Fontisto name="world-o" size={20} style={styles.iconsWebsite} />
            <Text style={styles.fullAddress}>Visit Website</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL(phoneURL)}>
          <View style={styles.infoContainer}>
            <AntDesign name="phone" size={20} style={styles.iconsWebsite} />
            <Text style={styles.fullAddress}>{phone}</Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* <Text>{foodCategory}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 300,
    borderRadius: 6,
    marginRight: 10,
    marginTop: 0,
    backgroundColor: 'blue',
    width: 400,
  },
  flatList: {
    marginTop: 20,
    width: '100%',
    // backgroundColor: 'red',
  },
  ratingContainer: {
    display: 'flex',
    flexDirection: 'row',
    // marginTop: 5,
    marginLeft: 10,
    alignItems: 'center',
  },
  ratingNumber: {
    marginRight: 5,
    fontSize: 17,
  },
  title: {
    fontSize: 25,
    marginLeft: 10,
    marginTop: 10,
    // fontWeight: 'bold',
  },
  reviewCount: {
    marginLeft: 5,
  },
  price: {
    marginLeft: 5,
  },
  openText: {
    color: 'green',
    marginRight: 5,
  },
  closedText: {
    color: 'red',
    marginRight: 5,
  },
  transactions: {
    marginLeft: 5,
  },
  infoMainContainer: {
    marginTop: 10,
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#dadce0',
    borderBottomWidth: 1,
    borderTopColor: '#dadce0',
    borderTopWidth: 1,
    paddingTop: 15,
    paddingBottom: 15,
  },
  icons: {
    color: '#2c83f9',
    marginLeft: 10,
  },
  iconsWebsite: {
    color: '#2c83f9',
    marginLeft: 15,
    marginRight: 5,
  },
  fullAddress: {
    // marginLeft: '8%',
    marginLeft: 10,
    flexWrap: 'wrap',
    flex: 1,
  },
  //   ratingIcon: {
  //       marginTop:
  //   }
});

export default ResultsPage;
