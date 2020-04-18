import React from "react";
import ListaMusicasArtistas from "../componentes/ListaMusicasArtistas";

function PaginaArtista({ artista, selecionarArtista }) {
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
      <ListaMusicasArtistas
        musicas={[]}
        artistas={[]}
        selecionarArtista={selecionarArtista}
      />
    </>
  );
}

export default PaginaArtista;
