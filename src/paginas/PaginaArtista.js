import React from "react";
import ListaMusicasArtistas from "../componentes/ListaMusicasArtistas";
import { getArtistTop, getRelatedArtists, getArtist } from "../api/spotify";

const MAX_TOP = 10;
const MAX_RELACIONADOS = 10;

function PaginaArtista({
  token,
  artistaSelecionado,
  selecionarArtista,
  selecionarGeneros,
}) {
  const [topMusicas, setTopMusicas] = React.useState([]);
  const [artista, setArtista] = React.useState(artistaSelecionado);
  const [relacionados, setRelacionados] = React.useState([]);
  const [status, setStatus] = React.useState("");

  React.useEffect(
    function () {
      if (token && artista) {
        setStatus("carregando...");
        setRelacionados([]);
        setTopMusicas([]);
        carregarDadosDoArtista();
      }
    },
    [artistaSelecionado, token]
  );

  async function carregarDadosDoArtista() {
    const reqTop = getArtistTop(token, artistaSelecionado.id);
    const reqRelacionados = getRelatedArtists(token, artistaSelecionado.id);
    const reqArtistaCompleto = artistaSelecionado.images
      ? Promise.resolve(artistaSelecionado)
      : getArtist(token, artistaSelecionado.id);
    try {
      const res = await Promise.all([
        reqTop,
        reqRelacionados,
        reqArtistaCompleto,
      ]);
      const [resTop, resRelacionados, resArtista] = res;
      if (resTop && resTop.tracks) {
        setTopMusicas(resTop.tracks.slice(0, MAX_TOP));
      }
      if (resRelacionados && resRelacionados.artists) {
        setRelacionados(resRelacionados.artists.slice(0, MAX_RELACIONADOS));
      }
      if (resArtista) {
        setArtista(resArtista);
      }
      setStatus("");
    } catch (erro) {
      console.error("falha na requisicao de dados do artista", erro);
    }
  }

  function imprimirGeneros() {
    if (artista.genres && artista.genres.length) {
      const generos = artista.genres.join(", ");
      return (
        <>
          <a href={`#${generos}`} onClick={() => selecionarGeneros(generos)}>
            {generos}
          </a>
          <br />
        </>
      );
    }
    return "";
  }

  const imagem =
    artista.images && artista.images.length ? artista.images[0].url : "";

  return (
    <>
      <header className="media">
        <figure className="media-left">
          <p className="image is-square is-128x128">
            <img alt={`Foto de ${artista.name}`} src={imagem} />
          </p>
        </figure>
        <div className="media-content">
          <div className="content">
            <h2 className="is-title artista-title">{artista.name}</h2>
            <p>
              {imprimirGeneros()}
              {artista.followers
                ? `${artista.followers.total} seguidores`
                : `Nenhum seguidor`}
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
