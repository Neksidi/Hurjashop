
    function contains(name, state){

    for(i in this.state.item.attributes){
      if(this.state.item.attributes[i].name == name){
        return true;
      }
    }
    return false;
  }

  function getAttributeIndex(name){
    for(i in this.state.item.attributes){
      if(this.state.item.attributes[i].name == name){
        return i;
      }
    }
    return null;
  }

  


  export {
      contains,
      getAttributeIndex
  }