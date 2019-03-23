

function getSaleProducts(props) {
    let sortedProducts = props.products;

    for(i in sortedProducts){
        if(!sortedProducts[i].on_sale){
            sortedProducts.slice(i,1);
        }
    }

    sortedProducts.sort((a, b) => (a.regular_price - a.sale_price)/a.sale_price > (b.regular_price - b.sale_price)/b.sale_price);

    props.setSaleProducts(sortedProducts);
}

function getNewProducts(props) {

    let sortedProducts = props.products;

    //TODO: Päivämäärän (date_created) vertailu
    //sortedProducts.sort((a, b) => (a.regular_price - a.sale_price)/a.sale_price > (b.regular_price - b.sale_price)/b.sale_price);

    props.setSaleProducts(sortedProducts);

}

export { 
  getSaleProducts,
  getNewProducts,
}
