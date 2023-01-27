import React from "react";

type PokemonProps = {
   id: number;
  name: string;
  sprites: {
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };

  types: [
    {
      type: {
        name: string;
      };
    }
  ];
};

const Pokemons: React.FC<PokemonProps> = ({
   id,
  sprites,
  name,
  types,
}) => {
  const type = types.map((type) => type.type.name).join(", ");
  const style = `thumb-container ${type}`;

  return (
    <div className={style}>
      <div className='number'>
        <small>#0{id}</small>
      </div>
      <img src={sprites?.other.dream_world.front_default} alt={name} />
      <div className='detail-wrapper'>
        <h3>{name}</h3>
        <small>Type: {types[0].type.name}</small>
      </div>
    </div>
  );
};

export default Pokemons;
