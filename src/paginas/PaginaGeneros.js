import React from "react";
import { getRecommendationsByGenres } from "../api/spotify";
import ListaMusicasArtistas from "../componentes/ListaMusicasArtistas";

const TAMANHO_PAGINA = 20;

function PaginaGeneros({ generos, token, selecionarArtista }) {
  const [musicas, setMusicas] = React.useState([]);
  const [status, setStatus] = React.useState("");
  const [itensExibidos, setItensExibidos] = React.useState(0);

  React.useEffect(
    function () {
      if (token && generos) {
        setStatus("carregando...");
        carregarGeneros();
      }
    },
    [generos, token]
  );

  React.useEffect(
    function () {
      if (itensExibidos === 0 && musicas.length) {
        const itensAExibir =
          musicas.length > TAMANHO_PAGINA ? TAMANHO_PAGINA : musicas.length;
        setItensExibidos(itensAExibir);
      }
    },
    [musicas]
  );

  async function carregarGeneros() {
    const generosSemEspaco = generos.split(", ").slice(0, 5).join(",");
    const resultados = await getRecommendationsByGenres(
      token,
      generosSemEspaco
    );
    console.info(resultados);
    if (resultados && resultados.tracks) {
      setMusicas(resultados.tracks);
      setStatus("");
    } else {
      console.error("falha ao carregar generos >>>", resultados);
      setStatus("falha ao carregar generos");
    }
  }

  function exibirMaisMusicas() {
    const restante = musicas.length - itensExibidos;
    const novosItens = restante > TAMANHO_PAGINA ? TAMANHO_PAGINA : restante;
    const itensAExibir = itensExibidos + novosItens;
    setItensExibidos(itensAExibir);
  }

  return (
    <>
      <h2 className="title is-size-4">explorando {generos}</h2>
      {status || (
        <ListaMusicasArtistas
          musicas={musicas.slice(0, itensExibidos)}
          selecionarArtista={selecionarArtista}
        />
      )}
      {itensExibidos < musicas.length && (
        <a onClick={exibirMaisMusicas}>Ver Mais</a>
      )}
    </>
  );
}

export default PaginaGeneros;
