import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import Image from 'next/image';
import { pokemonImages } from '@/data/pokemonImages';
import { db } from '@/db';
import { pokemon, type SelectPokemon } from '../db/schema';
import { auth, currentUser } from '@clerk/nextjs/server';

export default async function Home() {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  const user = await currentUser();
  console.log(user);

  const pokemonFromDb = await db.select().from(pokemon);
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
    <Card className='w-64 h-96'>
      <CardHeader>
        <div className='inline-flex justify-between items-center'>
          <CardTitle>{name}</CardTitle>
          <div className='text-xs'>#{pokedex}</div>
        </div>
        <CardDescription className='line-clamp-3'>
          {description}
        </CardDescription>
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
