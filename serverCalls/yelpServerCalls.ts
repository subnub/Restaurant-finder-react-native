import yelp from '../api/yelp';

export const getBuissnessList = async (text: string, limit = 50) => {
  console.log('get buissness', text);
  const businessesList = await yelp.get('/search', {
    params: {
      term: text,
      limit,
      location: 'west warwick',
    },
  });
  return businessesList;
};

export const getBuissness = async (id: string) => {
  const buissness = await yelp.get(`/${id}`);
  return buissness;
};
