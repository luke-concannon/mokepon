import { auth } from '@clerk/nextjs/server';
import { unauthorized } from 'next/navigation';
import { PokemonListWrapper } from './_components/PokemonListWrapper';
import { AppSidebar } from './_components/AppSiderbar';
import { SearchDialog } from './_components/SearchDialog';
import { PokemonStore } from './_store';
import { getPokemon } from './_db';
import { PokemonDetailDialog } from './_components/PokemonDetailDialog';
import { checkIfUserLikesPokemon } from './_utils';

export default async function Home() {
  const { userId } = await auth();
  if (!userId) unauthorized();
  const pokemonWithLikes = await getPokemon();

  const pokemonWithLikesAndUserLike = pokemonWithLikes.map((pokemon) => ({
    ...pokemon,
    userLikesPokemon: checkIfUserLikesPokemon(pokemon, { id: userId }),
  }));

  return (
    <PokemonStore initState={{ pokemon: pokemonWithLikesAndUserLike }}>
      <AppSidebar />
      <SearchDialog allPokemon={pokemonWithLikesAndUserLike} />
      <main className='w-full'>
        <PokemonListWrapper
          userId={userId}
          allPokemon={pokemonWithLikesAndUserLike}
        />
        ;
        <PokemonDetailDialog />
      </main>
    </PokemonStore>
  );
}
