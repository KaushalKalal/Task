import React, { useEffect, useState } from "react";

const FetchingData = () => {
  const [pokemonData, setPokemonData] = useState(null);
  const [Loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/v3/pokemon");
        setPokemonData(response.data);
        console.log(pokemonData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, []);

  return (
    <>
      {pokemonData.map((pokemon) => (
        <h1>{pokemon}</h1>
      ))}
    </>
  );
};

export default FetchingData;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const FetchingData = () => {
//   const [pokemonData, setPokemonData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Use a public API URL, for example, fetching the first Pokémon (Bulbasaur)
//   const API_URL = "pokeapi.co";

//   useEffect(() => {
//     const fetchPokemonData = async () => {
//       try {
//         const response = await axios.get(API_URL);
//         // Store the full response data in the state
//         setPokemonData(response.data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPokemonData();
//   }, []);

//   // Ensure data exists before trying to access properties
//   if (loading) {
//     return <div>Loading Pokémon data...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   const formattedData = {
//     id: pokemonData.id,
//     name: pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1),
//     species:
//       pokemonData.species.name.charAt(0).toUpperCase() +
//       pokemonData.species.name.slice(1),
//     type: pokemonData.types.map(
//       (typeInfo) =>
//         typeInfo.type.name.charAt(0).toUpperCase() + typeInfo.type.name.slice(1)
//     ),
//     base: {
//       HP: pokemonData.stats.find((stat) => stat.stat.name === "hp").base_stat,
//       Attack: pokemonData.stats.find((stat) => stat.stat.name === "attack")
//         .base_stat,
//       Defense: pokemonData.stats.find((stat) => stat.stat.name === "defense")
//         .base_stat,
//       "Sp. Attack": pokemonData.stats.find(
//         (stat) => stat.stat.name === "special-attack"
//       ).base_stat,
//       "Sp. Defense": pokemonData.stats.find(
//         (stat) => stat.stat.name === "special-defense"
//       ).base_stat,
//       Speed: pokemonData.stats.find((stat) => stat.stat.name === "speed")
//         .base_stat,
//     },
//     image: {
//       thumbnail: pokemonData.sprites.front_default,
//     },
//     description: "Data fetched from the PokéAPI.", // A placeholder as description needs another API call
//   };

//   return (
//     <div
//       style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "5px" }}
//     >
//       <h1>
//         {formattedData.name} (#{formattedData.id})
//       </h1>
//       <p>
//         <strong>Species:</strong> {formattedData.species}
//       </p>
//       <p>
//         <strong>Type:</strong> {formattedData.type.join(", ")}
//       </p>
//       <p>
//         <strong>Description:</strong> {formattedData.description}
//       </p>
//       <h3>Base Stats:</h3>
//       <ul>
//         <li>HP: {formattedData.base.HP}</li>
//         <li>Attack: {formattedData.base.Attack}</li>
//         <li>Defense: {formattedData.base.Defense}</li>
//         <li>Sp. Attack: {formattedData.base["Sp. Attack"]}</li>
//         <li>Sp. Defense: {formattedData.base["Sp. Defense"]}</li>
//         <li>Speed: {formattedData.base.Speed}</li>
//       </ul>
//       <h3>Image:</h3>
//       {/* The original code had an "english" property for name, using the main name property here */}
//       <img src={formattedData.image.thumbnail} alt={formattedData.name} />
//     </div>
//   );
// };

// export default FetchingData;
