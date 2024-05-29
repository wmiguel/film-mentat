import axios from "axios";
const OMDB_API = process.env.REACT_APP_OMDB_APIKEY;
const tmdb_apiKey = process.env.REACT_APP_TMDB_APIKEY;
const apiUrl = `https://www.omdbapi.com/?apikey=${OMDB_API}`;
const tmdb_url = `https://api.themoviedb.org/3/search/movie?api_key=${tmdb_apiKey}`;
const tmdb_NowPlaying = `https://api.themoviedb.org/3/movie/now_playing?api_key=${tmdb_apiKey}`;
const zeitgeistsAuth = process.env.REACT_APP_ZEITGEISTS_AUTHORIZATION;

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

/** get Now Playing
/* @param {number} params.page
*/
export async function requestNowPlaying(params) {
  const { page, region } = params;
  try {
    const response = await axios.get(tmdb_NowPlaying, {
      params: {
        language: "en-US",
        page: page,
        region: region,
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

export async function getFilmData(params) {
  const filmID = params;
  const url = `https://api.themoviedb.org/3/movie/${filmID}?api_key=${tmdb_apiKey}&append_to_response=release_dates,credits,watch/providers`;
  try {
    const response = await fetch(url);
    const responseJson = await response.json();
    return responseJson;
  } catch (err) {
    return err.response;
  }
}

export async function zeitgeists() {
  let page = 1;
  const allResults = [];
  const pageSize = 100;
  let hasMorePages = true;

  while (hasMorePages) {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://zeitgeists.org/api/v1/listings?type=Screening&page=${page}`,
      headers: {
        Authorization: zeitgeistsAuth,
      }
    };
    try {
      const response = await axios.request(config);
      const results = response.data.data.listings;
      allResults.push(...results);
      hasMorePages = results.length === pageSize;
      page += 1;
    } catch (error) {
      console.log(error);
      hasMorePages = false;
    }
  }
  return allResults;
}