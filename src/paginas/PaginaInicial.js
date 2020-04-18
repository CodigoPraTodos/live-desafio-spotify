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
