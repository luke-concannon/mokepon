// page.tsx
import { auth } from '@clerk/nextjs/server';
import { getPokemon } from './_db';
import { unauthorized } from 'next/navigation';
import { PokemonListWrapper } from './_components/PokemonListWrapper';

export default async function Home() {
  const { userId } = await auth();
  if (!userId) unauthorized();
  const pokemonWithLikes = await getPokemon();

  return (
    <main className='flex p-10 w-full'>
      <PokemonListWrapper pokemonWithLikes={pokemonWithLikes} userId={userId} />
    </main>
  );
}
