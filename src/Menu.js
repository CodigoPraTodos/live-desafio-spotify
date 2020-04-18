import React from "react";

import logo from "./logo-spotify.png";

function Menu({ profile, fazerLogout, pesquisar }) {
  const [termoDaPesquisa, setTermoDaPesquisa] = React.useState("");

  function atualizarTermo(event) {
    setTermoDaPesquisa(event.target.value);
  }

  function submitPesquisa(event) {
    event.preventDefault();
    pesquisar(termoDaPesquisa);
  }

  function enderecoDaImagem() {
    return profile.images.length ? profile.images[0].url : "";
  }

  return (
    <nav className="level topo">
      <div className="level-left">
        <div className="level-item">
          <img src={logo} alt="Spotify Explorer" className="logotipo" />
        </div>
        <div className="level-item">
          <p className="logotipo-texto">Explorer</p>
        </div>
      </div>
      {profile && (
        <div className="level-right">
          <div className="level-item">
            <form className="field has-addons" onSubmit={submitPesquisa}>
              <p className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="pesquisar artista/música"
                  value={termoDaPesquisa}
                  onChange={atualizarTermo}
                  required
                />
              </p>
              <p className="control">
                <button type="submit" className="button">
                  Pesquisar
                </button>
              </p>
            </form>
          </div>
          <p className="level-item">
            <a href="#" onClick={fazerLogout}>
              Sair
            </a>
          </p>
          <p className="level-item">
            <img
              className="profile-img"
              src={enderecoDaImagem()}
              alt={profile.display_name}
            />
          </p>
        </div>
      )}
    </nav>
  );
}

export default Menu;
