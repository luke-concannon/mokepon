'use client';

import { createContext, use, useState } from 'react';
import { createStore, useStore, type StoreApi } from 'zustand';
import { devtools } from 'zustand/middleware';
import { useShallow } from 'zustand/react/shallow';
import type { PokemonWithLikesAndUserLike } from '@/app/_types';

const PokemonStoreContext = createContext<StoreApi<any> | null>(null);

interface PokemonStoreState {
  openSearch: boolean;
  focusPokedex: number | null;
  pokemonDialogIsOpen: boolean;
  pokemon: PokemonWithLikesAndUserLike[];
  actions: {
    setOpenSearch: (open: boolean) => void;
    setPokemon: (pokemon: PokemonWithLikesAndUserLike[]) => void;
    openPokemonDialog: (pokedex: number) => void;
    closePokemonDialog: () => void;
    toggleUserLikesPokemon: (pokedex: number) => void;
    setFocusPokedex: (pokedex: number | null) => void;
  };
}

interface PokemonStoreProviderProps {
  children: React.ReactNode | null;
  initState: {
    userId: string;
    pokemon: PokemonWithLikesAndUserLike[];
  };
}

export const PokemonStore = ({
  children,
  initState,
}: PokemonStoreProviderProps) => {
  const [store] = useState(() =>
    createStore(
      devtools(
        (set) => ({
          ...initState,
          openSearch: false,
          focusPokemon: null,
          actions: {
            setOpenSearch: (open: boolean) => set({ openSearch: open }),
            openPokemonDialog: (pokedex: number) =>
              set({ pokemonDialogIsOpen: true, focusPokedex: pokedex }),
            closePokemonDialog: () =>
              set({ pokemonDialogIsOpen: false, focusPokedex: null }),
            setPokemon: (pokemon: PokemonWithLikesAndUserLike[]) =>
              set({ pokemon }),
            setFocusPokedex: (pokedex: number | null) =>
              set({ focusPokedex: pokedex }),
            toggleUserLikesPokemon: (pokedex: number) => {
              set((state: PokemonStoreState) => ({
                pokemon: state.pokemon.map((pokemon) => {
                  if (pokemon.pokedex === pokedex) {
                    const updatedPokemonLikes = pokemon.userLikesPokemon
                      ? pokemon.pokemonLikes.filter(
                          (like) => like.profileId !== initState.userId
                        )
                      : [
                          ...pokemon.pokemonLikes,
                          {
                            profileId: initState.userId,
                            pokemonId: pokedex,
                          },
                        ];

                    return {
                      ...pokemon,
                      userLikesPokemon: !pokemon.userLikesPokemon,
                      pokemonLikes: updatedPokemonLikes,
                    };
                  }
                  return pokemon;
                }),
              }));
            },
          },
        }),
        { name: 'Store' }
      )
    )
  );

  return (
    <PokemonStoreContext.Provider value={store}>
      {children}
    </PokemonStoreContext.Provider>
  );
};

const usePokemonStoreContext = <T, U>(selector: (state: T) => U): U => {
  const PokemonStoreContextValue = use(PokemonStoreContext);
  if (!PokemonStoreContextValue)
    throw new Error('Missing PokemonStoreContext.Provider in the tree');

  return useStore(PokemonStoreContextValue, selector);
};

export const usePokemonStore = () =>
  usePokemonStoreContext(
    useShallow((state: PokemonStoreState) => {
      const { actions, ...restStore } = state;
      return { ...restStore };
    })
  );

export const usePokemonStoreActions = () =>
  usePokemonStoreContext((state: PokemonStoreState) => state.actions);
