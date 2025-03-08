import type { PokemonWithLikes } from '@/db/schema';
import { pokemonImages } from '@/data/pokemonImages';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import Image from 'next/image';
import { LikesButton } from './LikesButton';

export function PokemonCard({
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
    <Card className='w-64 h-96 shrink-0 relative'>
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
            priority
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
