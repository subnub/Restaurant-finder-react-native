import yelp from '../api/yelp';

export const getBuissnessList = async (text: string, limit = 50) => {
  const businessesList = await yelp.get('/search', {
    params: {
      term: text,
      limit,
      location: 'san jose',
    },
  });
  return businessesList;
};
