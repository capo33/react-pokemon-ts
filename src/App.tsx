import React, { useEffect, useState } from "react";

import Pokemons from "./components/Pokemons";
import { Pokemon, Result } from "./types/types";
import "./App.css";

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loadMore, setLoadMore] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );

  const fetchPokemons = async () => {
    const response = await fetch(loadMore);
    const data = await response.json();
    setLoadMore(data.next);

    const createPokemonObject = async (result: Result[]) => {
      result.map(async (pokemon) => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        const data = await res.json();

        setPokemons((preValue) => {
          return [...preValue, data];
        });
      });
    };
    createPokemonObject(data.results);
  };
  useEffect(() => {
    fetchPokemons();
    //  eslint-disable-next-line
  }, []);

  return (
    <div className='app-container'>
      <h1>Pokemon Evolution</h1>
      <div className='pokemon-container'>
        <div className='all-container'>
          {pokemons.map((pokemon, index) => (
            <Pokemons key={index} id={index} {...pokemon} />
            // <Pokemons
            //  key={index}
            //  id={index}
            //  name={pokemon.name}
            //  image={pokemon.sprites.other.dream_world.front_default}
            //  types={pokemon.types}
            // />
          ))}
        </div>
        <button onClick={fetchPokemons} className='load-more'>
          Load more
        </button>
      </div>
    </div>
  );
}

export default App;
