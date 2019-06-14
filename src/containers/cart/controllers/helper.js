



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

function returnPopUp (props,parent) {
    console.log("returnpopuppi")
    console.log(props)
    console.log(parent)
    props.navigation.closeDrawer();
      Alert.alert(
        'Poistetaan tilaus',
        'Haluatko varmasti poistaa luodun tilauksen, ja palata alkuun?',
        [
          {text: 'Peruuta', onPress:()=> props.navigation.openDrawer()},
          {text: 'Kyllä', onPress: () => parent.params.handleBack()}
        ],
        {cancellable: true}
      );
}

export { 
    getQuantity,
    getCartQuantity,
    returnPopUp,
}
