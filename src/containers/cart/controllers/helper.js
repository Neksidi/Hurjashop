

function findInCart(props, id) {
    
    if(props.cart.length) {
        for(i in props.cart){
            if(props.cart[i].id == id){
                return props.cart[i].quantity;
            }
        }
    }
    
    return 0;
}


export { 
    findInCart,
}
