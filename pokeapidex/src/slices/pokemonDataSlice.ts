import { PokemonType } from "@/shared/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PokemonTypeState = {
  pokemons: PokemonType[];
};

const initialState: PokemonTypeState = {
  pokemons: [],
};

const pokemonDataSlice = createSlice({
  name: "pokemonData",
  initialState,
  reducers: {
    setPokemonData: (state, action: PayloadAction<PokemonType>) => {
      state.pokemons[action.payload.id] = action.payload;
    },
  },
});

export const { setPokemonData } = pokemonDataSlice.actions;

export default pokemonDataSlice.reducer;
