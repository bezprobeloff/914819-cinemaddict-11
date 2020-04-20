import AbstractComponent from "../components/abstract-component";

const createMainNavigationTemplate = (films) => {
  const watchlistFilms = [];
  const historyFilms = [];
  const favoritesFilms = [];
  for (const film of films) {
    if (film.isWached) {
      watchlistFilms.push(film);
    }
    if (film.isHistory) {
      historyFilms.push(film);
    }
    if (film.isFavorite) {
      favoritesFilms.push(film);
    }
  }
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchlistFilms.length}</span></a>
        <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${historyFilms.length}</span></a>
        <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favoritesFilms.length}</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class MainNavigate extends AbstractComponent {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return createMainNavigationTemplate(this._films);
  }
}
