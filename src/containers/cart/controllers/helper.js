


function getQuantity(props, id) {
    if(props.cart.length) {
        for(i in props.cart){
            if(props.cart[i].id == id){
                return props.cart[i].quantity;
            }
        }
    }
    
    return 0;
}

function getCartQuantity(props) {
    if(props.cart.length) {
        for(i in props.cart){
            return props.cart[i].quantity;
        }
    }
    
    return 0;
}


export { 
    getQuantity,
    getCartQuantity
}
