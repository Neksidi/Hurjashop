const buyAnimal = animalIndex => (
    {
      type: 'BUY_ANIMAL',
      payload: animalIndex,
    }
);

const sellAnimal = animalIndex => (
  {
    type: 'SELL_ANIMAL',
    payload: animalIndex,
  }
);

export {
  buyAnimal,
  sellAnimal
}