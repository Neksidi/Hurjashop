import { Dimensions } from 'react-native'

const msp = (dim, limit) => {
  return (dim.scale * dim.width) >= limit || (dim.scale * dim.height) >= limit;
};

//Palauttaa onko pystyasennossa
const isPortrait = () => {
  const dim = Dimensions.get('screen');
  return dim.height >= dim.width;
};

//Palauttaa onko vaaka-asennossa
const isLandscape = () => {
  const dim = Dimensions.get('screen');
  return dim.width >= dim.height;
};

//Palauttaa onko tabletti
const isTablet = () => {
  const dim = Dimensions.get('screen');
  return ((dim.scale < 2 && msp(dim, 1000)) || (dim.scale >= 2 && msp(dim, 1900)));
};

//Palauttaa onko puhelin
const isPhone = () => {
  return !isTablet();
}

export default {
  isPortrait,
  isLandscape,
  isTablet,
  isPhone,
}
