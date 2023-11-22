import { useEffect, useState } from "react";
import { PokemonType } from "@/shared/types";
import "./PokemonList.scss";
import "@/shared/types.scss";
import { useAppDispatch } from "@/hooks";
import { setSelectedPokemon } from "@/slices/pokemonDataSlice";
type Props = {
  pokemon: PokemonType;
};

const PokemonCard = ({ pokemon }: Props) => {
  const typeClass = "pokemon type-" + pokemon.types[0].type.name;
  const [pokemonId, setPokemonId] = useState("");
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (pokemon.id.toString().length === 4) setPokemonId(pokemon.id.toString());
    else if (pokemon.id.toString().length === 1)
      setPokemonId("000" + pokemon.id);
    else if (pokemon.id.toString().length === 2)
      setPokemonId("00" + pokemon.id);
    else if (pokemon.id.toString().length === 3) setPokemonId("0" + pokemon.id);
  }, [pokemon.id]);
  const handleClick = () => {
    console.log("test");
    dispatch(setSelectedPokemon(pokemon));
  };
  return (
    <div className="pokemon-card" onClick={handleClick}>
      <div className={typeClass}>
        <p className="pokemon-text">
          #{pokemonId} {pokemon.name}
        </p>
        <div className="pokemon-image-container">
          <img
            className="pokemon-image"
            alt={pokemon.name}
            src={pokemon.sprites.front_default}
          />
        </div>
        <p className="pokemon-text">
          {pokemon.types[0].type.name}{" "}
          {pokemon.types[1]?.type.name ? "& " + pokemon.types[1].type.name : ""}
        </p>
      </div>
    </div>
  );
};

export default PokemonCard;
