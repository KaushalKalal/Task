import React, { useEffect, useState } from "react";
import axios from "axios";

const PER_PAGE = 10;

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/v1/pokemon", {
        params: {
          page,
          limit: PER_PAGE,
        },
      })
      .then((res) => {
        setPokemon(res.data.data);
        setTotal(res.data.total);
      })
      .catch(console.error);
  }, [page]);

  const filteredPokemon = pokemon.filter((p) => {
    const matchSearch =
      !search ||
      p.name.english.toLowerCase().includes(search.toLowerCase()) ||
      p.name.japanese.includes(search) ||
      p.name.chinese.includes(search) ||
      p.name.french.toLowerCase().includes(search.toLowerCase());

    const matchType = !typeFilter || p.type.includes(typeFilter);

    const matchSpecies =
      !speciesFilter ||
      p.species.toLowerCase().includes(speciesFilter.toLowerCase());

    return matchSearch && matchType && matchSpecies;
  });

  const totalPages = Math.ceil(total / PER_PAGE);

  return (
    <div style={{ padding: 24, fontFamily: "Inter, Arial" }}>
      <h1>Pokeman</h1>

      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        <input
          placeholder="Search name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="">All Types</option>
          <option>Grass</option>
          <option>Poison</option>
          <option>Fire</option>
          <option>Water</option>
          <option>Electric</option>
        </select>

        <input
          placeholder="Species"
          value={speciesFilter}
          onChange={(e) => setSpeciesFilter(e.target.value)}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 20,
        }}
      >
        {filteredPokemon.map((p) => (
          <div
            key={p.id}
            style={{
              borderRadius: 16,
              padding: 16,
              background: "#fff",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            <img
              src={p.image.thumbnail}
              alt={p.name.english}
              style={{ width: "100%", height: 120, objectFit: "contain" }}
            />

            <h3>{p.name.english}</h3>

            <p style={{ fontSize: 12 }}>
              🇯🇵 {p.name.japanese}
              <br />
              🇨🇳 {p.name.chinese}
              <br />
              🇫🇷 {p.name.french}
            </p>

            <p style={{ opacity: 0.7 }}>{p.species}</p>

            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {p.type.map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: 12,
                    padding: "4px 8px",
                    borderRadius: 8,
                    background: "#eee",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 30, display: "flex", gap: 12 }}>
        <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          Prev
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
