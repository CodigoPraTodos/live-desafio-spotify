import React from "react";

import { getMe, getSearch } from "./api/spotify";

import Menu from "./Menu";
import PaginaInicial from "./paginas/PaginaInicial";
import PaginaAutenticado from "./paginas/PaginaAutenticado";
import PaginaPesquisa from "./paginas/PaginaPesquisa";

const SESSION_TOKEN = "token";

function App() {
  const tokenState = React.useState("");
  const [token, setToken] = tokenState;
  const [profile, setProfile] = React.useState(null);
  const [erroLogin, setErroLogin] = React.useState("");
  const [pagina, setPagina] = React.useState("");
  const [pesquisa, setPesquisa] = React.useState(null);

  React.useEffect(function () {
    async function verificarSessao() {
      const sessionToken = sessionStorage.getItem(SESSION_TOKEN);
      if (sessionToken) {
        const profile = await getMe(sessionToken);
        if (profile && profile.id) {
          setToken(sessionToken);
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
    const profile = await getMe(token);
    if (profile && profile.id) {
      console.info("usuario autenticado", profile);
      setProfile(profile);
      setPagina("autenticado");
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

  async function pesquisar(termoDaPesquisa) {
    const resultados = await getSearch(token, termoDaPesquisa);
    if (resultados && (resultados.artists || resultados.tracks)) {
      setPesquisa({ termo: termoDaPesquisa, resultados });
      setPagina("pesquisa");
    } else {
      console.error("falha na pesquisa >>>", resultados);
    }
  }

  function exibirPagina() {
    switch (pagina) {
      case "autenticado":
        return <PaginaAutenticado />;
      case "pesquisa":
        return <PaginaPesquisa pesquisa={pesquisa} />;
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
