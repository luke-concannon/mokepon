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
import { auth } from '@clerk/nextjs/server';
import { LikesButton } from './LikesButton';
import { getPokemon } from './_db';
import type { PokemonWithLikes } from '../db/schema';
import { unauthorized } from 'next/navigation';

export default async function Home() {
  const { userId } = await auth();
  if (!userId) unauthorized();
  const pokemonWithLikes = await getPokemon();

  return (
    <main className='flex p-10 w-full'>
      <div className='flex flex-1 justify-center flex-wrap gap-4 '>
        {pokemonWithLikes.map((pokemon) => {
          const { pokedex, pokemonLikes } = pokemon;
          const userLikesPokemon = pokemonLikes.some(
            ({ profileId, pokemonId }) =>
              profileId === userId && pokemonId === pokedex
          );

          return (
            <PokemonCard
              key={pokedex}
              pokemon={pokemon}
              userLikesPokemon={userLikesPokemon}
            />
          );
        })}
      </div>
    </main>
  );
}

function PokemonCard({
  pokemon,
  userLikesPokemon,
}: {
  pokemon: PokemonWithLikes;
  userLikesPokemon: boolean;
}) {
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
        <LikesButton pokemon={pokemon} userLikesPokemon={userLikesPokemon} />
      </CardFooter>
    </Card>
  );
}
