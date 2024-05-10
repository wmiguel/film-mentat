import axios from "axios";
const OMDB_API = process.env.REACT_APP_OMDB_APIKEY;
const tmdb_apiKey = process.env.REACT_APP_TMDB_APIKEY;
const apiUrl = `https://www.omdbapi.com/?apikey=${OMDB_API}`;
const tmdb_url = `https://api.themoviedb.org/3/search/movie?api_key=${tmdb_apiKey}`;

/**
 * get movies by title
 * @param {object} params Search params
 * @param {number} params.page Page to display
 * @param {searchValue} params.searchValue Searched string
 */
export async function requestFetchMovies(params) {
  const { page, searchValue } = params;

  try {
    const response = await axios.get(tmdb_url, {
      params: {
        query: searchValue,
        page: page,
      },
    });
    return response;
  } catch (err) {
    return err.response;
  }
}

/**
 * get movie by Id
 * @param {string} tmdbID Movie id to fetch
 */
export async function requestFetchMovie(params) {
  const { tmdbID } = params;
  try {
    const response = await axios.get(apiUrl, {
      params: {
        movie_id: tmdbID,
      },
    });

    return response;
  } catch (err) {
    return err.response;
  }
}