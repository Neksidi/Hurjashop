

function getSaleProducts(products) {
    let sortedProducts = products;

    for(i in sortedProducts){
        if(sortedProducts[i].sale_price == ""){
            sortedProducts.slice(i,1);
        }
    }

    sortedProducts.sort((a, b) => (a.regular_price - a.sale_price)/a.sale_price > (b.regular_price - b.sale_price)/b.sale_price);

    return sortedProducts;
}


function getNewProducts(products) {
    let sortedProducts = products;
    
    sortedProducts.sort((a, b) => (getParsedDate(a.date_created) > getParsedDate(b.date_created)));

    return sortedProducts;

}

function getParsedDate(date){
    date = String(date).split('T');
    var days = String(date[0]).split('-');
    var hours = String(date[1]).split(':');
    return new Date([parseInt(days[0]), parseInt(days[1])-1, parseInt(days[2]), parseInt(hours[0]), parseInt(hours[1]), parseInt(hours[2])]).getTime();
}

export { 
  getSaleProducts,
  getNewProducts,
}
