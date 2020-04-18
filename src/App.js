import React from "react";

import { getMe, getSearch } from "./api/spotify";

import Menu from "./Menu";
import PaginaInicial from "./paginas/PaginaInicial";
import PaginaPesquisa from "./paginas/PaginaPesquisa";
import PaginaArtista from "./paginas/PaginaArtista";

const SESSION_TOKEN = "token";
const PAGINA_PESQUISA = "pesquisa";
const PAGINA_ARTISTA = "artista";

function App() {
  const tokenState = React.useState("");
  const [token, setToken] = tokenState;
  const [profile, setProfile] = React.useState(null);
  const [erroLogin, setErroLogin] = React.useState("");
  const [pagina, setPagina] = React.useState("");
  const [termoPesquisado, setTermoPesquisado] = React.useState("");
  const [artista, setArtista] = React.useState(null);

  React.useEffect(function () {
    async function verificarSessao() {
      const sessionToken = sessionStorage.getItem(SESSION_TOKEN);
      if (sessionToken) {
        const profile = await getMe(sessionToken);
        if (profile && profile.id) {
          setToken(sessionToken);
          setProfile(profile);
          setPagina(PAGINA_PESQUISA);
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
    const profile = await getMe(token);
    if (profile && profile.id) {
      console.info("usuario autenticado", profile);
      setProfile(profile);
      setPagina(PAGINA_PESQUISA);
      sessionStorage.setItem(SESSION_TOKEN, token);
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

  function selecionarArtista(artista) {
    setArtista(artista);
    setPagina(PAGINA_ARTISTA);
  }

  function pesquisar(termo) {
    setTermoPesquisado(termo);
    setPagina(PAGINA_PESQUISA);
  }

  function exibirPagina() {
    switch (pagina) {
      case PAGINA_PESQUISA:
        return (
          <PaginaPesquisa
            token={token}
            termoPesquisado={termoPesquisado}
            selecionarArtista={selecionarArtista}
          />
        );
      case PAGINA_ARTISTA:
        return <PaginaArtista artista={artista} />;
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
      <Menu profile={profile} fazerLogout={fazerLogout} pesquisar={pesquisar} />
      {exibirPagina()}
    </div>
  );
}

export default App;
