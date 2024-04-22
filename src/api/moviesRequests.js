import axios from "axios";
const OMDB_API = process.env.REACT_APP_OMDB_APIKEY;
const apiUrl = `https://www.omdbapi.com/?apikey=${OMDB_API}`;

/**
 * get movies by title
 * @param {object} params Search params
 * @param {number} params.page Page to display
 * @param {searchValue} params.searchValue Searched string
 */
export async function requestFetchMovies(params) {
  const { page, searchValue } = params;

  try {
    const response = await axios.get(apiUrl, {
      params: {
        s: searchValue,
        type: "movie",
        page,
      },
    });
    return response;
  } catch (err) {
    return err.response;
  }
}

/**
 * get movie by Id
 * @param {string} imdbID Movie id to fetch
 */
export async function requestFetchMovie(params) {
  const { imdbID } = params;
  try {
    const response = await axios.get(apiUrl, {
      params: {
        i: imdbID,
      },
    });

    return response;
  } catch (err) {
    return err.response;
  }
}
