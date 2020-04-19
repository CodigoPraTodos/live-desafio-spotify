import React from "react";

import { getSearch, SEARCH_LIMIT } from "../api/spotify";
import ListaMusicasArtistas from "../componentes/ListaMusicasArtistas";

function PaginaPesquisa({ termoPesquisado, token, selecionarArtista }) {
  const [pesquisa, setPesquisa] = React.useState(null);
  const [status, setStatus] = React.useState("");
  const [offset, setOffset] = React.useState(0);
  const [final, setFinal] = React.useState(false);

  React.useEffect(
    function () {
      if (token && termoPesquisado) {
        setStatus("pesquisando...");
        pesquisar(0);
      }
    },
    [termoPesquisado, token]
  );

  async function pesquisar(offset) {
    const resultados = await getSearch(token, termoPesquisado, offset);
    console.info(resultados);
    if (resultados && (resultados.artists || resultados.tracks)) {
      let artistas = resultados.artists.items || [];
      let musicas = resultados.tracks.items || [];

      if (artistas.length === 0 && musicas.length === 0) {
        setFinal(true);
      }

      if (offset > 0) {
        artistas = pesquisa.artistas.concat(artistas);
        musicas = pesquisa.musicas.concat(musicas);
      }

      setPesquisa({ termo: termoPesquisado, resultados, artistas, musicas });
      setOffset(offset);
    } else {
      console.error("falha na pesquisa >>>", resultados);
      setStatus("falha na pesquisa");
    }
  }

  function pesquisarMais() {
    pesquisar(offset + SEARCH_LIMIT);
  }

  function imprimirInstrucoes() {
    return (
      <p className="has-text-centered">
        Utilize o campo acima para pesquisar artistas e/ou músicas.
      </p>
    );
  }

  function imprimirPesquisa() {
    if (!pesquisa) {
      return <p>{status}</p>;
    }

    return (
      <>
        <h2 className="title">Pesquisando "{pesquisa.termo}"</h2>
        <ListaMusicasArtistas
          musicas={pesquisa.musicas}
          artistas={pesquisa.artistas}
          selecionarArtista={selecionarArtista}
        />
        {!final && <a onClick={pesquisarMais}>Ver Mais...</a>}
      </>
    );
  }

  return termoPesquisado ? imprimirPesquisa() : imprimirInstrucoes();
}

export default PaginaPesquisa;
