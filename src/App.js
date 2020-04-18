import React from "react";

import logo from "./logo-spotify.png";
import { getMe } from "./api/spotify";

import Menu from "./Menu";
import PaginaInicial from "./paginas/PaginaInicial";
import PaginaAutenticado from "./paginas/PaginaAutenticado";

const SESSION_TOKEN = "token";

function App() {
  const tokenState = React.useState("");
  const [profile, setProfile] = React.useState(null);
  const [erroLogin, setErroLogin] = React.useState("");
  const [pagina, setPagina] = React.useState("");

  React.useEffect(function () {
    async function verificarSessao() {
      const token = sessionStorage.getItem(SESSION_TOKEN);
      if (token) {
        const profile = await getMe(token);
        if (profile && profile.id) {
          setProfile(profile);
          setPagina("autenticado");
        } else {
          console.error("erro de autenticacao da sessao", profile);
          sessionStorage.removeItem(SESSION_TOKEN);
        }
      }
    }
    verificarSessao();
  }, []);

  async function fazerLogin(event) {
    event.preventDefault();
    const profile = await getMe(tokenState[0]);
    if (profile && profile.id) {
      console.info("usuario autenticado", profile);
      setProfile(profile);
      setPagina("autenticado");
      sessionStorage.setItem(SESSION_TOKEN, tokenState[0]);
    } else {
      console.error("erro de autenticacao", profile);
      setErroLogin(
        "Ooops... Ocorreu um erro de autenticação! Por favor, reverifique seu token."
      );
    }
  }

  function fazerLogout() {
    sessionStorage.removeItem(SESSION_TOKEN);
    setProfile(null);
    setPagina("");
  }

  function exibirPagina() {
    switch (pagina) {
      case "autenticado":
        return <PaginaAutenticado />;
      default:
        return (
          <PaginaInicial
            tokenState={tokenState}
            erroLogin={erroLogin}
            fazerLogin={fazerLogin}
          />
        );
    }
  }

  return (
    <div className="container">
      <nav className="level topo">
        <div className="level-left">
          <div className="level-item">
            <img src={logo} alt="Spotify Explorer" className="logotipo" />
          </div>
          <div className="level-item">
            <p className="logotipo-texto">Explorer</p>
          </div>
        </div>
        <Menu profile={profile} fazerLogout={fazerLogout} />
      </nav>
      {exibirPagina()}
    </div>
  );
}

export default App;
