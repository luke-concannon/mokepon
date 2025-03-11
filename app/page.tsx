import { auth } from '@clerk/nextjs/server';
import { unauthorized } from 'next/navigation';
import { PokemonListWrapper } from './_components/PokemonListWrapper';
import { AppSidebar } from './_components/AppSiderbar';
import { SearchDialog } from './_components/SearchDialog';
import { PokemonStore } from './_store';
import { getPokemon } from './_db';
import { PokemonDetailDialog } from './_components/PokemonDetailDialog';

export default async function Home() {
  const { userId } = await auth();
  if (!userId) unauthorized();
  const pokemonWithLikes = await getPokemon();

  return (
    <PokemonStore initState={{ pokemon: pokemonWithLikes }}>
      <AppSidebar />
      <SearchDialog allPokemon={pokemonWithLikes} />
      {/* <PokemonDetailDialog /> */}
      <main className='w-full'>
        <PokemonListWrapper userId={userId} allPokemon={pokemonWithLikes} />;
      </main>
    </PokemonStore>
  );
}
