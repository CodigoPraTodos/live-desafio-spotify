import React from "react";

import Tabela from "../componentes/Tabela";

function PaginaPesquisa({ pesquisa }) {
  console.info(pesquisa);

  function imprimirMusicas() {
    const musicas = pesquisa.resultados.tracks.items;
    const linhas = musicas.map((item, index) => (
      <tr key={index}>
        <td>
          <a href={item.external_urls.spotify} target="_blank">
            {item.name}
          </a>
        </td>
      </tr>
    ));

    return <Tabela>{linhas}</Tabela>;
  }

  function imprimirArtistas() {
    const artistas = pesquisa.resultados.artists.items;
    const linhas = artistas.map((item, index) => (
      <tr key={index}>
        <td>
          <a href="#">{item.name}</a>
        </td>
      </tr>
    ));

    return <Tabela>{linhas}</Tabela>;
  }

  return (
    <>
      <h2 className="title">Pesquisando "{pesquisa.termo}"</h2>
      <div className="columns">
        <div className="column is-three-fifths">
          <h3 className="subtitle">Músicas</h3>
          {imprimirMusicas()}
        </div>
        <div className="column">
          <h3 className="subtitle">Artistas</h3>
          {imprimirArtistas()}
        </div>
      </div>
    </>
  );
}

export default PaginaPesquisa;
