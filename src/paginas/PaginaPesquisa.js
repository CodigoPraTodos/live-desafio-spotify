import React from "react";

import { getSearch } from "../api/spotify";
import ListaMusicasArtistas from "../componentes/ListaMusicasArtistas";

function PaginaPesquisa({ termoPesquisado, token, selecionarArtista }) {
  const [pesquisa, setPesquisa] = React.useState(null);
  const [status, setStatus] = React.useState("");
  console.info(pesquisa);

  React.useEffect(
    function () {
      if (token && termoPesquisado) {
        async function pesquisar() {
          const resultados = await getSearch(token, termoPesquisado);
          if (resultados && (resultados.artists || resultados.tracks)) {
            setPesquisa({ termo: termoPesquisado, resultados });
          } else {
            console.error("falha na pesquisa >>>", resultados);
            setStatus("falha na pesquisa");
          }
        }
        setStatus("pesquisando...");
        setPesquisa(null);
        pesquisar();
      }
    },
    [termoPesquisado, token]
  );

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

  return termoPesquisado ? imprimirPesquisa() : imprimirInstrucoes();
}

export default PaginaPesquisa;
