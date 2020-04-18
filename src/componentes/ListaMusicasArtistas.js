import React from "react";

import Tabela from "./Tabela";

function ListaMusicasArtistas({ musicas, artistas, selecionarArtista }) {
  function imprimirMusicas() {
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
    const linhas = artistas.map((item, index) => (
      <tr key={index}>
        <td>
          <a href="#" onClick={() => selecionarArtista(item)}>
            {item.name}
          </a>
        </td>
      </tr>
    ));

    return <Tabela>{linhas}</Tabela>;
  }

  return (
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
  );
}

export default ListaMusicasArtistas;
