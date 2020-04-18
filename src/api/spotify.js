export async function getMe(token) {
  const url = "https://api.spotify.com/v1/me";
  const authorization = `Bearer ${token}`;
  const headers = { Authorization: authorization };
  const resposta = await fetch(url, { headers });
  const respostaJson = await resposta.json();
  return respostaJson;
}
