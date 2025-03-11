'use client';

import { useState } from 'react';
import type { PokemonWithLikes } from '@/db/schema';
import { pokemonImages } from '@/data/pokemonImages';
import { PokemonDetailDialog } from './PokemonDetailDialog';
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
import { usePokemonStoreActions } from '../_store';

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
  const { setFocusPokemon } = usePokemonStoreActions();
  const [openDetail, setOpenDetail] = useState(false);

  const handleClick = () => {
    setFocusPokemon(pokemon);
    setOpenDetail(true);
  };

  return (
    <Card
      onClick={handleClick}
      className='w-64 h-96 shrink-0 cursor-pointer hover:scale-105 transition-all relative'
    >
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
        <Image
          priority
          src={pokemonImage}
          alt={name}
          placeholder='blur'
          style={{
            objectFit: 'cover',
          }}
        />
      </CardContent>
      <CardFooter className='absolute bottom-0 left-0 p-2 w-full flex'>
        <LikesButton pokemon={pokemon} userLikesPokemon={userLikesPokemon} />
      </CardFooter>
    </Card>
  );
}
