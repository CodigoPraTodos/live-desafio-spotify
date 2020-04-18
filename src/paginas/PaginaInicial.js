import React from "react";

function PaginaInicial({ tokenState, erroLogin, fazerLogin }) {
  const [token, setToken] = tokenState;

  function atualizarToken(event) {
    setToken(event.target.value);
  }

  return (
    <div className="content">
      <p>Olá, seja bem vindo ao Spotify Explorer!</p>
      <p>
        Para iniciar, faça o login inserindo seu Token de Acesso Spotify abaixo:
      </p>
      <ol>
        <li>
          Acesse o site{" "}
          <a
            href="https://developer.spotify.com/console/get-search-item/"
            target="_blank"
          >
            https://developer.spotify.com/console/get-search-item/
          </a>
        </li>
        <li>
          Va até o final da página e aperte <strong>Get Token</strong>
        </li>
        <li>
          Não precisa selecionar nada, apenas confirme apertando{" "}
          <strong>Request Token</strong>, você será redirecionado ao console
          novamente
        </li>
        <li>
          Vá até o final da página de novo e copie o Token de Acesso que foi
          gerado do lado do botão Get Token!
        </li>
        <li>
          Copie e cole seu token abaixo e aperte Login para entrar no Explorer
        </li>
      </ol>
      <form
        className="login"
        onSubmit={fazerLogin}
        onChange={atualizarToken}
        value={token}
      >
        <input
          className="input"
          type="text"
          placeholder="Token de Acesso Spotify"
          required
        />
        {erroLogin && <p className="has-text-danger">{erroLogin}</p>}
        <button className="button is-success">Login</button>
      </form>
    </div>
  );
}

export default PaginaInicial;
