const INITIAL_STATE = {
  bought: [
  ],
  all: [
    'Kissa',
    'Koira',
    'Kettu'
  ],
};

const animalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'BUY_ANIMAL': {
      let {bought, all} = state;
      let index = action.payload;

      if(bought[index] !== undefined) {
        bought[index].count++;
      } 
      else {
        let name = all[index];
        var boughtAnimal = {
          name: name,
          count: 1
        };
        bought[index] = boughtAnimal;
      }

      let newState = { bought, all };
      return newState;
    }
    case 'SELL_ANIMAL': {
      let {bought, all} = state;
      let index = action.payload;
  
      if(bought[index].count <= 1) {
        bought.splice(index, 1);
      }
      else {
        bought[index].count--;
      } 
  
      let newState = { bought, all };
      return newState;
    }
    default:
      return state;
  }
};

export default animalReducer;
