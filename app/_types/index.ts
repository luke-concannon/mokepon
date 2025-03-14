import type { PokemonWithLikes } from '@/db/schema';

export interface PokemonWithLikesAndUserLike extends PokemonWithLikes {
  userLikesPokemon: boolean;
}
