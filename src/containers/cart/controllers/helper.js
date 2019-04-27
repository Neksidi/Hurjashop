

function findInCart(props, id) {
    
    if(props.cart.cart.length) {
        for(i in props.cart.cart){
            if(props.cart.cart[i].item.id == id){
                return props.cart.cart[i].quantity;
            }
        }
    }
    
    return 0;
}


export { 
    findInCart,
}
