import React from "react";

import ListaMusicasArtistas from "../componentes/ListaMusicasArtistas";

function PaginaPesquisa({ pesquisa, selecionarArtista }) {
  console.info(pesquisa);

  const musicas = pesquisa.resultados.tracks.items;
  const artistas = pesquisa.resultados.artists.items;

  return (
    <>
      <h2 className="title">Pesquisando "{pesquisa.termo}"</h2>
      <ListaMusicasArtistas
        musicas={musicas}
        artistas={artistas}
        selecionarArtista={selecionarArtista}
      />
    </>
  );
}

export default PaginaPesquisa;
