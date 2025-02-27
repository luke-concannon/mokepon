import { pokemon } from '@/data/pokemon.json';

const main = async () => {
  const types: PokemonType['type'][] = [];
  const colours: Pokemon['colour'][] = [];
  const habitats: Pokemon['habitat'][] = [];
  const shapes: Pokemon['shape'][] = [];

  for (const mokepon of pokemon) {
    const { type, colour, habitat, shape } = mokepon;

    const flatTypes = type.map((type) => type.type);
    flatTypes.forEach((type) => {
      if (!types.includes(type)) {
        types.push(type);
      }
    });

    if (!colours.includes(colour)) {
      colours.push(colour);
    }

    if (!habitats.includes(habitat)) {
      habitats.push(habitat);
    }

    if (!shapes.includes(shape)) {
      shapes.push(shape);
    }
  }

  console.log('colours:', colours);
  console.log('habitats:', habitats);
  console.log('shapes:', shapes);
  console.log('types:', types);
};

main();
