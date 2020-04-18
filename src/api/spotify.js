const SEARCH_LIMIT = 20;

async function requestSpotify(token, url) {
  const authorization = `Bearer ${token}`;
  const headers = { Authorization: authorization };
  const resposta = await fetch(url, { headers });
  const respostaJson = await resposta.json();
  return respostaJson;
}

export async function getMe(token) {
  const url = "https://api.spotify.com/v1/me";
  return requestSpotify(token, url);
}

export async function getSearch(token, termoDePesquisa) {
  const url = `https://api.spotify.com/v1/search?q=${termoDePesquisa}&type=track,artist&limit=${SEARCH_LIMIT}`;
  return requestSpotify(token, url);
}

export async function getArtistTop(token, idArtista, country = "BR") {
  const url = `https://api.spotify.com/v1/artists/${idArtista}/top-tracks?country=${country}`;
  return requestSpotify(token, url);
}

export async function getRelatedArtists(token, idArtista) {
  const url = `https://api.spotify.com/v1/artists/${idArtista}/related-artists`;
  return requestSpotify(token, url);
}
