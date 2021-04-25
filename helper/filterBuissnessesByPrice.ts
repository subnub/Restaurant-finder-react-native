const filterBuisnessesByPrice = (results: any[]) => {
  const filteredResultsList: any = {
    lowPricePoint: [],
    mediumPricePoint: [],
    largePricePoint: [],
  };
  console.log('Recalculating');
  for (let i = 0; i < results.length; i++) {
    const currentResults = results[i];
    const price: '$' | '$$' | '$$$' = currentResults.price || '$';
    if (price === '$') {
      filteredResultsList.lowPricePoint.push(currentResults);
    } else if (price === '$$') {
      filteredResultsList.mediumPricePoint.push(currentResults);
    } else {
      filteredResultsList.largePricePoint.push(currentResults);
    }
  }

  //console.log('length test', filteredResultsList.lowPricePoint.length);

  return filteredResultsList;
};

export default filterBuisnessesByPrice;
