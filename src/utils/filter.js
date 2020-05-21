import {FilterType} from "../const";

export const getHistoryFilms = (films) => {
  return films.filter((film) => film.isWached);
};

export const getWachlistFilms = (films) => {
  return films.filter((film) => film.isWatchlist);
};

export const getFavotitesFilms = (films) => {
  return films.filter((film) => film.isFavorite);
};

export const getFilmsByFilter = (films, filterType) => {
  switch (filterType) {
    case FilterType.ALL:
      return films;
    case FilterType.WATCHLIST:
      return getWachlistFilms(films);
    case FilterType.HISTORY:
      return getHistoryFilms(films);
    case FilterType.FAVORITES:
      return getFavotitesFilms(films);
  }
  return films;
};
