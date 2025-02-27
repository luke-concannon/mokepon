CREATE TYPE "public"."colour" AS ENUM('green', 'red', 'blue', 'white', 'brown', 'yellow', 'purple', 'pink', 'gray', 'black');--> statement-breakpoint
CREATE TYPE "public"."habitat" AS ENUM('grassland', 'mountain', 'waters-edge', 'forest', 'rough-terrain', 'cave', 'urban', 'sea', 'rare', 'unknown');--> statement-breakpoint
CREATE TYPE "public"."shape" AS ENUM('quadruped', 'upright', 'armor', 'squiggle', 'bug-wings', 'wings', 'humanoid', 'legs', 'blob', 'heads', 'tentacles', 'arms', 'fish', 'ball', 'unspecified');--> statement-breakpoint
CREATE TYPE "public"."type" AS ENUM('grass', 'poison', 'fire', 'flying', 'water', 'bug', 'normal', 'electric', 'ground', 'fairy', 'fighting', 'psychic', 'rock', 'steel', 'ice', 'ghost', 'dragon', 'dark');--> statement-breakpoint
CREATE TABLE "pokemon" (
	"id" serial PRIMARY KEY NOT NULL,
	"pokedex" integer NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"isBaby" boolean NOT NULL,
	"isLegendary" boolean NOT NULL,
	"isMythical" boolean NOT NULL,
	"height" integer NOT NULL,
	"weight" integer NOT NULL,
	"experience" integer NOT NULL,
	"hp" integer NOT NULL,
	"attack" integer NOT NULL,
	"defense" integer NOT NULL,
	"specialAttack" integer NOT NULL,
	"specialDefense" integer NOT NULL,
	"speed" integer NOT NULL,
	"happiness" integer NOT NULL,
	"colour" "colour",
	"habitat" "habitat",
	"shape" "shape",
	"type" "type",
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "pokemon_pokedex_unique" UNIQUE("pokedex")
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"age" integer NOT NULL,
	"email" text NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "profiles_email_unique" UNIQUE("email")
);
