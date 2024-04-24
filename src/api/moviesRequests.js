import axios from "axios";
const OMDB_API = process.env.REACT_APP_OMDB_APIKEY;
const tmdb_apiKey = "276c1cf8bcdd1f7d884c8fecfa7c3e8d";
// const tmdb_token =
//   "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzZjMWNmOGJjZGQxZjdkODg0YzhmZWNmYTdjM2U4ZCIsInN1YiI6IjVlYzBkOTUyOGUyZTAwMDAxZjE0Yjg5OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.s-LztF6Zww_tOjSBv9YXZSAXZIaVLHPWFry8Er-1WqU";
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
        // type: "movie",
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
