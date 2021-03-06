const SPOTIFY_URL_BASE = "https://api.spotify.com/v1";
export const SEARCH_LIMIT = 20;

async function requestSpotify(token, endpoint) {
  const authorization = `Bearer ${token}`;
  const headers = { Authorization: authorization };
  const url = SPOTIFY_URL_BASE + endpoint;
  const resposta = await fetch(url, { headers });
  const respostaJson = await resposta.json();
  return respostaJson;
}

export async function getMe(token) {
  const url = "/me";
  return requestSpotify(token, url);
}

export async function getSearch(token, termoDePesquisa, offset = 0) {
  const url = `/search?q=${termoDePesquisa}&type=track,artist&limit=${SEARCH_LIMIT}&offset=${offset}`;
  return requestSpotify(token, url);
}

export async function getArtist(token, idArtista) {
  const url = `/artists/${idArtista}`;
  return requestSpotify(token, url);
}

// todo: ajustar país dinamicamente
export async function getArtistTop(token, idArtista, country = "BR") {
  const url = `/artists/${idArtista}/top-tracks?country=${country}`;
  return requestSpotify(token, url);
}

export async function getRelatedArtists(token, idArtista) {
  const url = `/artists/${idArtista}/related-artists`;
  return requestSpotify(token, url);
}

export async function getRecommendationsByGenres(token, generos) {
  const url = `/recommendations?seed_genres=${generos}&min_popularity=20&limit=100`;
  return requestSpotify(token, url);
}
