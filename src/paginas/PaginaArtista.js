import React from "react";
import ListaMusicasArtistas from "../componentes/ListaMusicasArtistas";
import { getArtistTop, getRelatedArtists } from "../api/spotify";

const MAX_TOP = 10;
const MAX_RELACIONADOS = 10;

function PaginaArtista({ token, artista, selecionarArtista }) {
  const [topMusicas, setTopMusicas] = React.useState([]);
  const [relacionados, setRelacionados] = React.useState([]);
  const [status, setStatus] = React.useState("");

  React.useEffect(
    function () {
      if (token && artista) {
        async function carregarDadosDoArtista() {
          const reqTop = getArtistTop(token, artista.id);
          const reqRelacionados = getRelatedArtists(token, artista.id);
          try {
            const res = await Promise.all([reqTop, reqRelacionados]);
            const [resTop, resRelacionados] = res;
            if (resTop && resTop.tracks) {
              setTopMusicas(resTop.tracks.slice(0, MAX_TOP));
            }
            if (resRelacionados && resRelacionados.artists) {
              setRelacionados(
                resRelacionados.artists.slice(0, MAX_RELACIONADOS)
              );
            }
            setStatus("");
          } catch (erro) {
            console.error("falha na requisicao de dados do artista", erro);
          }
        }
        setStatus("carregando...");
        setRelacionados([]);
        setTopMusicas([]);
        carregarDadosDoArtista();
      }
    },
    [artista]
  );

  function imprimirGeneros() {
    if (artista.genres.length) {
      const generos = artista.genres.join(", ");
      return (
        <>
          <a href="#">{generos}</a>
          <br />
        </>
      );
    }
    return "";
  }

  const imagem = artista.images.length ? artista.images[0].url : "";

  return (
    <>
      <header className="media">
        <figure className="media-left">
          <p className="image is-square is-128x128">
            <img src={imagem} />
          </p>
        </figure>
        <div className="media-content">
          <div className="content">
            <h2 className="is-title artista-title">{artista.name}</h2>
            <p>
              {imprimirGeneros()}
              {artista.followers.total} seguidores
            </p>
          </div>
        </div>
      </header>
      {status}
      <ListaMusicasArtistas
        musicas={topMusicas}
        artistas={relacionados}
        selecionarArtista={selecionarArtista}
      />
    </>
  );
}

export default PaginaArtista;
