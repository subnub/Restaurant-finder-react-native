import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
interface ResultsListItemProps {
  item: any;
}

const ResultsListItem: React.FC<ResultsListItemProps> = ({ item }) => {
  const { name, image_url, rating, review_count } = item;

  console.log('rating', image_url);

  const count = Array(Math.floor(+rating)).fill(0);

  return (
    <View style={styles.container}>
      <Image source={{ uri: image_url }} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <View style={styles.ratingContainer}>
        {/* {rating} Stars, {review_count} Reviews */}
        {count.map((item, i) => (
          <AntDesign key={i} name="star" color="gold" size={15} />
        ))}
        <Text style={styles.reviewCount}>{review_count} Reviews</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 280,
    height: 125,
    borderRadius: 6,
    marginBottom: 5,
  },
  name: {
    fontWeight: 'bold',
  },
  container: {
    marginLeft: 10,
  },
  reviewCount: {
    paddingLeft: 5,
  },
  ratingContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default ResultsListItem;
