import { pokemon } from '@/data/pokemon.json';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import Image from 'next/image';
import { pokemonImages } from '@/data/pokemonImages';

export default function Home() {
  return (
    <main className='flex p-10 flex-wrap gap-4 flex-1 justify-center'>
      {pokemon.map((pokemon) => {
        const { pokedex } = pokemon;
        return <PokemonCard key={pokedex} pokemon={pokemon} />;
      })}
    </main>
  );
}

function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  const { name, description, pokedex } = pokemon;
  const imageKey = name.toLowerCase().replace(' ', '-');
  const pokemonImage = pokemonImages[imageKey as keyof typeof pokemonImages];

  return (
    <Card className='w-64 h-96'>
      <CardHeader>
        <div className='inline-flex justify-between items-center'>
          <CardTitle>{name}</CardTitle>
          <div className='text-xs'>#{pokedex}</div>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-1 justify-center items-center relative'>
        {!!pokemonImage && (
          <Image
            src={pokemonImage}
            alt={name}
            placeholder='blur'
            style={{
              objectFit: 'cover',
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}
