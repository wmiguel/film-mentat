import axios from "axios";
const tmdbKEY = process.env.REACT_APP_TMDB_APIKEY;
const tmdbMOV = `https://api.themoviedb.org/3/movie/`;
const tmdbSRC = `https://api.themoviedb.org/3/search/movie?api_key=${tmdbKEY}`;
const tmdbADD = `?api_key=${tmdbKEY}&append_to_response=release_dates,credits`;
const zeitKEY = process.env.REACT_APP_ZEITGEISTS_AUTHORIZATION;
const zeitURL = `https://zeitgeists.org/api/v1/listings?type=ScreeningEvent&page=`;

export async function fetchMovieSearch(params) {
  const { page, searchValue } = params;
  try {
    const response = await axios.get(tmdbSRC, {
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

export async function fetchMovieDetails(params) {
  const id = params;
  const url = tmdbMOV + id + tmdbADD;
  try {
    const response = await fetch(url);
    const responseJson = await response.json();
    return responseJson;
  } catch (err) {
    return err.response;
  }
}

export async function fetchScreenings() {
  const allResults = [];
  const pageSize = 100;
  let hasMorePages = true;
  let page = 1;
  while (hasMorePages) {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: zeitURL + page,
      headers: {
        Authorization: zeitKEY,
      },
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