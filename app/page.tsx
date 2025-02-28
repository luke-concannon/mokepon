import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import Image from 'next/image';
import { pokemonImages } from '@/data/pokemonImages';
import { db } from '@/db';
import { pokemon, type SelectPokemon } from '../db/schema';
import { auth } from '@clerk/nextjs/server';
import { LikesButton } from './LikesButton';

export default async function Home() {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  const pokemonFromDb = await db
    .select()
    .from(pokemon)
    .limit(10)
    .orderBy(pokemon.pokedex);
  return (
    <main className='flex p-10 w-full'>
      <div className='flex flex-1 justify-center flex-wrap gap-4 '>
        {pokemonFromDb.map((pokemon) => {
          const { pokedex } = pokemon;
          return <PokemonCard key={pokedex} pokemon={pokemon} />;
        })}
      </div>
    </main>
  );
}

function PokemonCard({ pokemon }: { pokemon: SelectPokemon }) {
  const { name, description, pokedex } = pokemon;
  const imageKey = name.toLowerCase().replace(' ', '-');
  const pokemonImage = pokemonImages[imageKey as keyof typeof pokemonImages];

  return (
    <Card className='w-64 h-96 relative'>
      <CardHeader>
        <div className='inline-flex justify-between items-center'>
          <CardTitle>{name}</CardTitle>
          <div className='text-xs'>#{pokedex}</div>
        </div>
        <CardDescription className='line-clamp-3'>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className='flex flex-1 justify-center items-start relative'>
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
      <CardFooter className='absolute bottom-0 left-0 p-2 w-full flex'>
        <LikesButton pokemon={pokemon} />
      </CardFooter>
    </Card>
  );
}
