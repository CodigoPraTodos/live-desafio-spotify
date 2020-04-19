import React from "react";
import { getRecommendationsByGenres } from "../api/spotify";
import ListaMusicasArtistas from "../componentes/ListaMusicasArtistas";

function PaginaGeneros({ generos, token, selecionarArtista }) {
  const [musicas, setMusicas] = React.useState([]);
  const [status, setStatus] = React.useState("");

  React.useEffect(
    function () {
      if (token && generos) {
        setStatus("carregando...");
        carregarGeneros();
      }
    },
    [generos, token]
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

  return (
    <>
      <h2 className="title is-size-4">explorando {generos}</h2>
      {status || (
        <ListaMusicasArtistas
          musicas={musicas}
          selecionarArtista={selecionarArtista}
        />
      )}
    </>
  );
}

export default PaginaGeneros;
