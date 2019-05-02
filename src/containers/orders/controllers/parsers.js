import React from 'react'
import { Text, StyleSheet } from 'react-native'
import {theme} from '../../../app/styles/global'

const parsePriceFromHtml = (html) => {
  let price = html.replace(/<[^>]*>?/gm, '').split(' ');
  for(i in price){
    price[i] = price[i].replace('&nbsp;&euro;', '');
  }
  return price
}

const price = (price, precision) => {
    return parseFloat(price).toFixed(precision);
}

const priceToString = (price) => {
    return parseFloat(price).toFixed(2).toString().replace('.', ',');
}

const parseStatus = (status) => {
  switch (status) {
    case 'pending':
      return (<Text style={[{color: theme.color.status.pending}, styles.statusText]}>Odotetaan maksua</Text>);
      break;
    case 'processing':
      return (<Text style={[{color: theme.color.status.processing}, styles.statusText]}>Tilausta käsitellään</Text>);
      break;
    case 'failed':
      return (<Text style={[{color: theme.color.status.failed}, styles.statusText]}>Maksu epäonnistunut</Text>);
      break;
    case 'completed':
      return (<Text style={[{color: 'gray'}, styles.statusText]}>Tilaus valmis</Text>);
      break;
    case 'cancelled':
      return (<Text style={[{color: 'lightgrey'}, styles.statusText]}>Peruttu</Text>);
    default:
      return (<Text>Jotain meni pieleen!</Text>);
  }
}

const parseDate = (date) => {
  const dateArray = date.split('-');
  const year = dateArray[0];
  const month = dateArray[1];
  const day = dateArray[2][0] + '' + dateArray[2][1];

  return (day + '.' + month + '.' + year);
}

const styles = StyleSheet.create({
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  }
});

export {
  parseStatus,
  parseDate,
  parsePriceFromHtml,
  price,
  priceToString,
}
